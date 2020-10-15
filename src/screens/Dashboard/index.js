import React, {useLayoutEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../../utils';

// import { Container } from './styles';

const Dashboard = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcon
          name="logout"
          size={26}
          color={color.WHITE}
          style={{right: 10}}
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are you sure to log out?',
              [
                {
                  text: 'Yes',
                  onPress: () => Alert.alert('logged out'),
                },
                {
                  text: 'No',
                },
              ],
              {
                cancelable: false,
              },
            )
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text onPress={() => navigation.navigate('SignIn')}>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
