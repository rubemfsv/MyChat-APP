import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import globalStyle from '../../utils/styleHelper/globalStyle';
import {color} from '../../utils';
import Input from '../../components/Input';
import RoundCornerButton from '../../components/Buttons/RoundCornerButton';
import {Store} from '../../contexts/store';
import {LOADING_START, LOADING_STOP} from '../../contexts/actions/type';

import {setUniqueValue} from '../../utils/constants';
import {setAsyncStorage, keys} from '../../asyncStorage';
import SignUpRequest from '../../network/signUp';
import {AddUser} from '../../network/user';
import firebase from '../../firebase/config';

const SignUp = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {name, email, password, confirmPassword} = credentials;

  const handleOnChange = useCallback(
    (name, value) => {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    },
    [credentials],
  );

  const onLoginPress = useCallback(() => {
    if (!name) {
      Alert.alert('Name is required!');
    } else if (!email) {
      Alert.alert('Email is required!');
    } else if (!password) {
      Alert.alert('Password is required!');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then(() => {
          let uid = firebase.auth().currentUser.uid;
          let profileImg = '';
          AddUser(name, email, uid, profileImg)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              navigation.replace('Dashboard');
            })
            .catch((err) => {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(err);
            });
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  }, [
    name,
    email,
    password,
    confirmPassword,
    dispatchLoaderAction,
    navigation,
  ]);

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      <View style={[globalStyle.containerCentered]}>
        <Text
          style={{
            color: color.WHITE,
            fontSize: 50,
            marginTop: 60,
            fontWeight: 'bold',
          }}>
          My Chat
        </Text>
        <Text
          style={{
            color: color.WHITE,
            fontSize: 35,
            marginTop: 40,
            fontWeight: 'bold',
          }}>
          Sign Up
        </Text>
      </View>
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <Input
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => handleOnChange('name', text)}
        />
        <Input
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => handleOnChange('email', text)}
        />
        <Input
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => handleOnChange('password', text)}
        />
        <Input
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => handleOnChange('confirmPassword', text)}
        />
        <RoundCornerButton title="Sign Up" onPress={() => onLoginPress()} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: color.LIGHT_GREEN,
          }}
          onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
