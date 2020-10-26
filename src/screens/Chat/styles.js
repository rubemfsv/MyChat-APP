import styled from 'styled-components/native';

import {color, appStyle} from '../../utils';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${color.GREY};
`;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${color.GREY};
`;

export const MessageContainer = styled.View`
  flex-direction: row;
  background-color: ${color.APP_SECOND_COLOR};
  align-items: center;
  align-content: center;
  height: ${appStyle.fieldHeight}px;
  width: 100%;

  border-radius: 20px;
`;

export const InputContainer = styled.View`
  width: 75%;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${color.APP_SECOND_COLOR};
  height: ${appStyle.fieldHeight}px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;
