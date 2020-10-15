import React from 'react';
import {SafeAreaView, Text} from 'react-native';

// import { Container } from './styles';

const SignIn = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('SignUp')}>SignIn</Text>
    </SafeAreaView>
  );
};

export default SignIn;
