import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import {
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from '../../firebase/config';
import {senderMsg, recieverMsg} from '../../network';

import {InputField, ChatBox} from '../../components';

import {deviceHeight} from '../../utils/styleHelper/appStyle';
import {smallDeviceHeight} from '../../utils/constants';
import {color, appStyle} from '../../utils';

import {
  Container,
  KeyboardAvoiding,
  MessageContainer,
  InputContainer,
  ButtonContainer,
} from './styles';

const Chat = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText, guestUserId, currentUserId} = params;
  const [msgValue, setMsgValue] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation, name]);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('messages')
        .child(currentUserId)
        .child(guestUserId)
        .on('value', (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            msgs.push({
              sendBy: child.val().message.sender,
              recievedBy: child.val().message.reciever,
              msg: child.val().message.msg,
              img: child.val().message.img,
            });
          });
          setMessages(msgs.reverse());
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleSendMessageText = useCallback(() => {
    setMsgValue('');
    if (msgValue) {
      senderMsg(msgValue, currentUserId, guestUserId, '')
        .then(() => {})
        .catch((err) => alert(err));

      // * guest user

      recieverMsg(msgValue, currentUserId, guestUserId, '')
        .then(() => {})
        .catch((err) => alert(err));
    }
  }, [msgValue, currentUserId, guestUserId]);

  const handleSendImage = useCallback(() => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(option, (response) => {
      if (response.didCancel) {
        console.log('User cancel image picker');
      } else if (response.error) {
        console.log(' image picker error', response.error);
      } else {
        // Base 64
        let source = 'data:image/jpeg;base64,' + response.data;

        senderMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));

        // * guest user

        recieverMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));
      }
    });
  }, [msgValue, currentUserId, guestUserId]);

  const handleOnChange = useCallback((text) => {
    setMsgValue(text);
  }, []);

  const onImageTap = useCallback(
    (chatImg) => {
      navigation.navigate('ShowFullImg', {name, img: chatImg});
    },
    [navigation, name],
  );

  return (
    <Container>
      <KeyboardAvoiding
        keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              inverted
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <ChatBox
                  msg={item.msg}
                  userId={item.sendBy}
                  img={item.img}
                  onImgTap={() => onImageTap(item.img)}
                />
              )}
            />

            <MessageContainer>
              <InputContainer>
                <InputField
                  placeholder="Type Here"
                  numberOfLines={10}
                  value={msgValue}
                  onChangeText={(text) => handleOnChange(text)}
                />
              </InputContainer>
              <ButtonContainer>
                <MaterialCommunityIcons
                  name="camera"
                  color={color.WHITE}
                  size={appStyle.fieldHeight - 5}
                  onPress={() => handleSendImage()}
                />
                <MaterialCommunityIcons
                  name="send-circle"
                  color={color.WHITE}
                  size={appStyle.fieldHeight - 5}
                  onPress={() => handleSendMessageText()}
                />
              </ButtonContainer>
            </MessageContainer>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoiding>
    </Container>
  );
};

export default Chat;
