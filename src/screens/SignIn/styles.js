import styled from 'styled-components/native';
import {color} from '../../utils';

export const KeyboardAvoidingContainer = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${color.APP_MAIN_COLOR};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${color.APP_MAIN_COLOR};
`;

export const LogoContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

export const LinkText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${color.LIGHT_GREEN};
`;
