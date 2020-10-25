import React, {useLayoutEffect} from 'react';
import {Image, Text} from 'react-native';
import {globalStyle} from '../../utils';

import {Container, ImageText} from './styles';

const ShowFullImg = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText} = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation, name]);

  return (
    <>
      {img ? (
        <Image
          source={{uri: img}}
          style={[globalStyle.flex1]}
          resizeMode="cover"
        />
      ) : (
        <Container>
          <ImageText>{imgText}</ImageText>
        </Container>
      )}
    </>
  );
};

export default ShowFullImg;
