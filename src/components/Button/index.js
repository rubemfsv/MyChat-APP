import React from 'react';
import {Container, Text} from './styles';

const Button = ({title, onPress}) => (
  <Container onPress={onPress}>
    <Text>{title}</Text>
  </Container>
);

export default Button;
