import React from 'react';
import {
  CardList,
  CardContent,
  BodyContainer,
  LeftContainer,
  TouchableOpacity,
  ThumbnailItem,
  ThumbnailName,
  ProfileName,
} from './styles';

const ShowUsers = ({name, img, onImgTap, onNameTap}) => {
  return (
    <CardList>
      <CardContent>
        <LeftContainer>
          <TouchableOpacity onPress={onImgTap}>
            {img ? (
              <ThumbnailItem source={{uri: img}} resizeMode="cover" />
            ) : (
              <ThumbnailName>{name.charAt(0)}</ThumbnailName>
            )}
          </TouchableOpacity>

          <BodyContainer>
            <ProfileName onPress={onNameTap}>{name}</ProfileName>
          </BodyContainer>
        </LeftContainer>
      </CardContent>
    </CardList>
  );
};

export default ShowUsers;
