import {StyleSheet} from 'react-native';
import {color} from '../../utils';

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    height: 55,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: '70%',
  },

  sendBtnContainer: {
    height: 55,
    backgroundColor: color.DARK_GRAY,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '29%',
  },
});
