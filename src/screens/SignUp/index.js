import React from 'react';
import {SafeAreaView, Text} from 'react-native';

// import { Container } from './styles';

const SignUp = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('Dashboard')}>SignUp</Text>
    </SafeAreaView>
  );
};

export default SignUp;
