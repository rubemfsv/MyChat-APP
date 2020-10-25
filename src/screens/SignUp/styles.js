import styled from 'styled-components/native';
import {color} from '../../utils';

export const KeyboardAvoidingContainer = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${color.BLACK};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${color.BLACK};
`;

export const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const LinkText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${color.LIGHT_GREEN};
`;
