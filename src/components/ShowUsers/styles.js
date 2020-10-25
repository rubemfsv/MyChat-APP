import styled from 'styled-components/native';
import {Card, CardItem, Left, Body, Thumbnail} from 'native-base';
import {color} from '../../utils';

export const CardList = styled(Card)`
  background-color: ${color.SEMI_TRANSPARENT};
  border-bottom-width: 1px;
  border-color: ${color.SILVER};
`;

export const CardContent = styled(CardItem)`
  background-color: ${color.SEMI_TRANSPARENT};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-color: ${color.WHITE};
  border-width: 2px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${color.DARK_GRAY};
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
