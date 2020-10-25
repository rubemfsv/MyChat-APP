import React from 'react';
import {color} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  Container,
  ImageContainer,
  Image,
  NoImage,
  TextNoImage,
  EditContainer,
  WelcomeText,
} from './styles';

export default ({img, name, onImgTap, onEditImgTap}) => (
  <Container>
    <ImageContainer>
      <TouchableOpacity onPress={onImgTap} activeOpacity={0.8}>
        {img ? (
          <Image source={{uri: img}} resizeMode="cover" />
        ) : (
          <NoImage>
            <TextNoImage>{name.charAt(0)}</TextNoImage>
          </NoImage>
        )}
      </TouchableOpacity>
      <EditContainer>
        <SimpleLineIcons
          name="wrench"
          size={20}
          style={{alignSelf: 'center', marginTop: 10}}
          onPress={onEditImgTap}
          color={color.WHITE}
        />
      </EditContainer>
    </ImageContainer>
    <WelcomeText>{name}</WelcomeText>
  </Container>
);
