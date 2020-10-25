import React, {useState, useContext, useCallback} from 'react';
import {Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';
import firebase from '../../firebase/config';
import {InputField, Button, Logo} from '../../components';
import {Store} from '../../contexts/store';
import {LOADING_START, LOADING_STOP} from '../../contexts/actions/type';
import {setAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue, keyboardVerticalOffset} from '../../utils/constants';
import {SignUpRequest, AddUser} from '../../network';

import {
  KeyboardAvoidingContainer,
  Container,
  LogoContainer,
  FormContainer,
  LinkText,
} from './styles';

const SignUp = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [logo, toggleLogo] = useState(true);
  const {email, password, confirmPassword, name} = credential;

  const setInitialState = useCallback(() => {
    setCredential({email: '', password: '', confirmPassword: ''});
  }, []);

  const onSignUpPress = useCallback(() => {
    Keyboard.dismiss();
    if (!name) {
      alert('Name is required');
    } else if (!email) {
      alert('Email is required');
    } else if (!password) {
      alert('Password is required');
    } else if (password !== confirmPassword) {
      alert('Password did not match');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
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
    dispatchLoaderAction,
    name,
    email,
    password,
    confirmPassword,
    navigation,
  ]);

  const handleOnChange = useCallback(
    (name, value) => {
      setCredential({
        ...credential,
        [name]: value,
      });
    },
    [credential],
  );

  const handleFocus = useCallback(() => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  }, []);

  return (
    <KeyboardAvoidingContainer
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          {logo && (
            <LogoContainer>
              <Logo />
            </LogoContainer>
          )}

          <FormContainer>
            <InputField
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => handleOnChange('name', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => handleOnChange('email', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange('password', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleOnChange('confirmPassword', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <Button title="Sign Up" onPress={() => onSignUpPress()} />
            <LinkText
              onPress={() => {
                setInitialState();
                navigation.navigate('SignIn');
              }}>
              Sign In
            </LinkText>
          </FormContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingContainer>
  );
};

export default SignUp;
