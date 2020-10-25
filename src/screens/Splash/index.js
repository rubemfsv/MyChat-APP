import React, {useEffect} from 'react';
import {getAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utils/constants';
import {Logo} from '../../components';

import {Container} from './styles';

export default ({navigation}) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace('Dashboard');
          } else {
            navigation.replace('SignIn');
          }
        })
        .catch((err) => {
          console.log(err);
          navigation.replace('SignIn');
        });
    }, 4000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <Container>
      <Logo />
    </Container>
  );
};
