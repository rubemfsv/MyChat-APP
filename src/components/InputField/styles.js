import styled from 'styled-components/native';

import {appStyle} from '../../utils';

export const TextInput = styled.TextInput`
  padding-left: 16px;
  background-color: ${appStyle.fieldBgColor};
  border-radius: 8px;
  width: 90%;
  color: ${appStyle.fieldTextColor};
  height: ${appStyle.fieldHeight}px;
  align-self: center;
  margin: ${appStyle.fieldMarginVertical}px ${appStyle.fieldMarginVertical}px;
  font-size: 16px;
`;
