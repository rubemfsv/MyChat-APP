import styled from 'styled-components/native';
import {appStyle, color} from '../../utils';
import {smallDeviceHeight} from '../../utils/constants';

const getDimensions = (key) => {
  if (appStyle.deviceHeight > smallDeviceHeight) {
    switch (key) {
      case 'imgContainer':
        return {
          height: 154,
          width: 154,
          borderRadius: 77,
          borderWidth: 2,
          borderColor: color.WHITE,
        };
      case 'img':
        return {
          height: 150,
          width: 150,
          borderRadius: 75,
        };
      case 'editImgContainer':
        return {
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: color.SEMI_TRANSPARENT,
          position: 'absolute',
          right: 20,
          bottom: 10,
        };

      default:
        return null;
    }
  } else {
    switch (key) {
      case 'imgContainer':
        return {
          height: 124,
          width: 124,
          borderRadius: 62,
          borderWidth: 2,
          borderColor: color.WHITE,
        };
      case 'img':
        return {
          height: 120,
          width: 120,
          borderRadius: 60,
        };
      case 'editImgContainer':
        return {
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: color.SEMI_TRANSPARENT,
          position: 'absolute',
          right: 10,
          bottom: 10,
        };

      default:
        return null;
    }
  }
};

export const Container = styled.View`
  padding: 10px 10px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  ${getDimensions('imgContainer')}
`;

export const Image = styled.Image`
  ${getDimensions('img')}
`;

export const NoImage = styled.View`
  ${getDimensions('img')}
  justify-content: center;
  align-items: center;
  background-color: ${color.APP_SECOND_COLOR};
`;

export const TextNoImage = styled.Text`
  color: ${appStyle.fieldTextColor};
  font-size: 50px;
  font-weight: bold;
`;

export const EditContainer = styled.View`
  ${getDimensions('editImgContainer')}
`;

export const WelcomeText = styled.Text`
  align-self: center;
  color: ${appStyle.fieldTextColor};
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
`;
