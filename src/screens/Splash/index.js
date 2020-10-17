import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {color} from '../../utils';
import {getAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utils/constants';

export default ({navigation}) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace('Dashboard');
          } else {
            navigation.replace('Login');
          }
        })
        .catch((err) => {
          console.log(err);
          navigation.replace('Login');
        });
    }, 4000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View
      style={[
        {
          backgroundColor: color.BLACK,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
      ]}>
      <Text
        style={{
          color: color.WHITE,
          fontSize: 50,
          marginTop: 60,
          fontWeight: 'bold',
        }}>
        My Chat
      </Text>
    </View>
  );
};
