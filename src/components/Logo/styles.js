import styled from 'styled-components/native';

 import {color, appStyle} from '../../utils';
import {smallDeviceHeight} from '../../utils/constants';

const getDimensions = () => {
  if (appStyle.deviceHeight > smallDeviceHeight) {
    return {
      height: 150,
      width: 220,
      borderRadius: 50,
      logoFontSize: 90,
    };
  } else {
    return {
      height: 120,
      width: 120,
      borderRadius: 40,
      logoFontSize: 70,
    };
  }
};

export const Container = styled.View`
  margin-top: 100px;
  height: ${getDimensions().height}px;
  width: ${getDimensions().width}px;
  border-radius: ${getDimensions().borderRadius}px;
  background-color: ${color.DARK_GRAY};
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${getDimensions().logoFontSize}px;
  font-weight: 900;
  color: ${color.WHITE};
`;