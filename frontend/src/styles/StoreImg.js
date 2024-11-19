import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  storeImgContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  backArrowImg: {
    height: '12%',
    width: '12%',
    position: 'absolute',
    top: 10,
    zIndex: 3,
  },
  cartImg: {
    height: '12%',
    width: '12%',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 3,
  },
  imgContainer: {
    position: 'relative',
    height: '100%',
  },
  img: {
    zIndex: 1,
    height: '100%',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    zIndex: 2,
  },
});
export default styles;
