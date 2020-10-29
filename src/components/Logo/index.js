import React from 'react';
import {Container, Text} from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../../utils';

const Logo = () => (
  <Container>
    <SimpleLineIcons name="envelope-letter" size={60} color={color.WHITE} />
    <Text>MC</Text>
  </Container>
);

export default Logo;
