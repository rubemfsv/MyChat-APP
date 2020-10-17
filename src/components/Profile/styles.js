import {StyleSheet} from 'react-native';
import {color} from '../../utils';

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  imgContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: color.WHITE,
  },
  img: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  editImgContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: color.SEMI_TRANSPARENT,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  name: {
    color: color.WHITE,
    fontSize: 50,
    fontWeight: 'bold',
  },
  welcome: {
    color: color.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
});
