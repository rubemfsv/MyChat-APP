import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {SafeAreaView, Alert, Text, View, FlatList} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import Profile from '../../components/Profile';
import ShowUsers from '../../components/ShowUsers';
import firebase from '../../firebase/config';
import {color, globalStyle} from '../../utils';
import {uuid, smallDeviceHeight} from '../../utils/constants';
import {clearAsyncStorage} from '../../asyncStorage';
import {UpdateUser, LogOutUser} from '../../network';

const Dashboard = ({navigation}) => {
  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });

  const {name, profileImg} = userDetail;
  const [allUsers, setAllUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcons
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
                  onPress: () => LogOut(),
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
  }, [navigation, LogOut]);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('users')
        .on('value', (dataSnapShot) => {
          let users = [];
          let currentUser = {
            id: '',
            name: '',
            profileImg: '',
          };
          dataSnapShot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const LogOut = useCallback(() => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.replace('SignIn');
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  }, []);

  const nameTap = useCallback((profileImg, name, guestUserId) => {
    if (!profileImg) {
      navigation.navigate('Chat', {
        name,
        imgText: name.charAt(0),
        guestUserId,
        currentUserId: uuid,
      });
    } else {
      navigation.navigate('Chat', {
        name,
        img: profileImg,
        guestUserId,
        currentUserId: uuid,
      });
    }
  }, []);

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<Profile img={profileImg} name={name} />}
        renderItem={({item}) => (
          <ShowUsers
            name={item.name}
            img={item.profileImg}
            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
