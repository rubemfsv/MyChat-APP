import React, {useCallback, useContext, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';
('react-native-keyboard-aware-scroll-view');
import {InputField, Button, Logo} from '../../components';
import {Store} from '../../contexts/store';
import {LOADING_START, LOADING_STOP} from '../../contexts/actions/type';
import {setAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue, keyboardVerticalOffset} from '../../utils/constants';
import {LoginRequest} from '../../network';

import {
  KeyboardAvoidingContainer,
  Container,
  LogoContainer,
  FormContainer,
  LinkText,
} from './styles';

export default ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });
  const [logo, toggleLogo] = useState(true);
  const {email, password} = credential;

  const setInitialState = useCallback(() => {
    setCredential({email: '', password: ''});
  }, []);

  const handleOnChange = useCallback(
    (name, value) => {
      setCredential({
        ...credential,
        [name]: value,
      });
    },
    [credential],
  );

  const onLoginPress = useCallback(() => {
    Keyboard.dismiss();
    if (!email) {
      alert('Email is required');
    } else if (!password) {
      alert('Password is required');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          setInitialState();
          navigation.navigate('Dashboard');
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  }, [dispatchLoaderAction, email, navigation, setInitialState, password]);

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
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => handleOnChange('email', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => handleOnChange('password', text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <Button title="Login" onPress={() => onLoginPress()} />
            <LinkText
              onPress={() => {
                setInitialState();
                navigation.navigate('SignUp');
              }}>
              Sign Up
            </LinkText>
          </FormContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingContainer>
  );
};
