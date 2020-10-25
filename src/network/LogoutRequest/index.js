import firebase from '../../firebase/config';

const LogoutRequest = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (error) {
    return error;
  }
};

export default LogoutRequest;
