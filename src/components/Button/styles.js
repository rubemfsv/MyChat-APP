import styled from 'styled-components/native';
import {appStyle} from '../../utils';

export const Container = styled.TouchableOpacity`
  background-color: ${appStyle.fieldBgColor};
  width: 90%;
  height: ${appStyle.btnHeight}px;
  border-radius: ${appStyle.btnBorderRadius}px;
  align-items: center;
  justify-content: center;
  margin: ${appStyle.btnMarginVertical}px ${appStyle.btnMarginVertical}px;
`;

export const Text = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${appStyle.fieldTextColor};
`;
