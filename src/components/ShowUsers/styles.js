import styled from 'styled-components/native';
import {Card, CardItem, Left, Body, Thumbnail} from 'native-base';
import {color} from '../../utils';

export const CardList = styled(Card)`
  background-color: ${color.SEMI_TRANSPARENT};
  border-bottom-width: 1px;
  border-radius: 15px;
  border-color: ${color.SILVER};
  margin-bottom: -3px;
`;

export const CardContent = styled(CardItem)`
  background-color: #3e3b47;
  border-radius: 15px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-color: ${color.SILVER};
  border-width: 2px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${color.APP_MAIN_COLOR};
`;

export const LeftContainer = styled(Left)``;

export const BodyContainer = styled(Body)``;

export const ThumbnailItem = styled(Thumbnail)``;

export const ThumbnailName = styled.Text`
  font-size: 30px;
  color: ${color.WHITE};
  font-weight: bold;
`;

export const ProfileName = styled.Text`
  font-size: 20px;
  color: ${color.WHITE};
  font-weight: bold;
`;
