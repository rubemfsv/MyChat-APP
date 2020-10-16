import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import globalStyle from '../../utils/styleHelper/globalStyle';
import {color} from '../../utils';
import Input from '../../components/Input';
import RoundCornerButton from '../../components/Buttons/RoundCornerButton';
import {Store} from '../../contexts/store';
import {LOADING_START, LOADING_STOP} from '../../contexts/actions/type';

import SignInRequest from '../../network/signIn';
import {setAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utils/constants';

const SignIn = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const {email, password} = credentials;

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
    if (!email) {
      Alert.alert('Email is required!');
    } else if (!password) {
      Alert.alert('Password is required!');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignInRequest(email, password)
        .then((res) => {
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
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
    }
  }, [email, password, dispatchLoaderAction]);

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
            marginTop: 60,
            fontWeight: 'bold',
          }}>
          Sign In
        </Text>
      </View>
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
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
        <RoundCornerButton title="Sign In" onPress={() => onLoginPress()} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: color.LIGHT_GREEN,
          }}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
