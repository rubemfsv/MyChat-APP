import {StyleSheet} from 'react-native';
import {color} from '../../../utils';

export default StyleSheet.create({
  btn: {
    backgroundColor: color.DARK_GRAY,
    width: '90%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {fontSize: 26, fontWeight: 'bold', color: color.WHITE},
});
