import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {globalStyle, color} from '../../utils';
import Input from '../../components/Input';
import ChatBox from '../../components/ChatBox';
import {senderMessage, receiverMessage} from '../../network';
import firebase from '../../firebase/config';
import styles from './styles';

const Chat = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText, guestUserId, currentUserId} = params;
  const [messageValue, setMessageValue] = useState('');
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
        .on('value', (dataSnapShot) => {
          let msgs = [];
          dataSnapShot.forEach((child) => {
            msgs.push({
              sendBy: child.val().message.sender,
              receivedBy: child.val().message.receiver,
              msg: child.val().message.msg,
              img: child.val().message.img,
            });
          });
          setMessages(msgs.reverse());
        });
    } catch (error) {
      alert(error);
    }
  }, [currentUserId, guestUserId]);

  const handleOnChange = useCallback((text) => {
    setMessageValue(text);
  }, []);

  const handleCamera = useCallback(() => {
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

        senderMessage(messageValue, currentUserId, guestUserId, source)
          .then(() => {})
          .catch((err) => alert(err));

        // * guest user
        receiverMessage(messageValue, currentUserId, guestUserId, '')
          .then(() => {})
          .catch((err) => alert(err));
      }
    });
  }, [messageValue, currentUserId, guestUserId]);

  const handleSend = useCallback(() => {
    if (messageValue) {
      senderMessage(messageValue, currentUserId, guestUserId, '')
        .then(() => {})
        .catch((err) => alert(err));

      receiverMessage(messageValue, currentUserId, guestUserId, '')
        .then(() => {})
        .catch((err) => alert(err));
    }
    setMessageValue('');
  }, [messageValue, currentUserId, guestUserId]);

  const imgTap = useCallback(
    (chatImg) => {
      navigation.navigate('ShowFullImg', {name, img: chatImg});
    },
    [navigation, name],
  );

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      {/* <KeyboardAvoidingView
        keyboardVerticalOffset={85}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
        <TouchableWithoutFeedback></TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
      <FlatList
        inverted
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <ChatBox
            mssage={item.msg}
            userId={item.sendBy}
            img={item.img}
            onImgTap={() => imgTap(item.img)}
          />
        )}
      />
      <View style={styles.sendMessageContainer}>
        <Input
          placeholder="Type Here"
          numberOfLines={10}
          inputStyle={styles.input}
          value={messageValue}
          onChangeText={(text) => handleOnChange(text)}
        />
        <View style={styles.sendBtnContainer}>
          <MaterialCommunityIcons
            name="camera"
            color={color.WHITE}
            size={45}
            onPress={() => handleCamera()}
          />
          <MaterialCommunityIcons
            name="send-circle"
            color={color.WHITE}
            size={45}
            onPress={() => handleSend()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
