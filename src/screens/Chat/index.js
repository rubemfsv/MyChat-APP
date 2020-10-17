import React, {useLayoutEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList} from 'react-native-gesture-handler';
import {globalStyle, color} from '../../utils';
import Input from '../../components/Input';
import styles from './styles';

const Chat = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText, guestUserId, currentUserId} = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation, name]);

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      <FlatList
        inverted
        data={[1, 2, 3]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={{color: color.WHITE}}>{name}</Text>
        )}
      />
      <View style={styles.sendMessageContainer}>
        <Input
          placeholder="Type Here"
          numberOfLines={10}
          inputStyle={styles.input}
        />
        <View style={styles.sendBtnContainer}>
          <MaterialCommunityIcons name="camera" color={color.WHITE} size={45} />
          <MaterialCommunityIcons
            name="send-circle"
            color={color.WHITE}
            size={45}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
