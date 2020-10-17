import {StyleSheet} from 'react-native';
import {color} from '../../utils';

export default StyleSheet.create({
  chatContainer: {backgroundColor: color.WHITE, borderTopRightRadius: 20},
  chatTxt: {
    color: color.BLACK,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '500',
    padding: 8,
  },
});
