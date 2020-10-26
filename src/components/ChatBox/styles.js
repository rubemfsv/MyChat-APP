import {StyleSheet} from 'react-native';
import {color} from '../../utils';

export default StyleSheet.create({
  chatContainer: {backgroundColor: color.PRIMARY, borderTopRightRadius: 20},
  chatTxt: {
    color: color.WHITE,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '500',
    padding: 8,
  },
});
