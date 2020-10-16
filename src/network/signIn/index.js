import firebase from '../../firebase/config';

const SignInRequest = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

export default SignInRequest;
