import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  storeImgContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  backArrowImg: {
    height: '15%',
    width: '15%',
    position: 'absolute',
    top: 10,
    zIndex: 2,
  },
  cartImg: {
    height: '15%',
    width: '15%',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
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
