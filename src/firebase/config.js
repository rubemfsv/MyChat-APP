import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDRNjYXahDgYK6lIBagVHwdZADo8ehfxbA',
  databaseURL: 'https://mychat-9552d.firebaseio.com/',
  projectId: 'mychat-9552d',
  appId: '1:1096955254404:android:51a390eb39a4daea7a14d1',
};

export default Firebase.initializeApp(firebaseConfig);
