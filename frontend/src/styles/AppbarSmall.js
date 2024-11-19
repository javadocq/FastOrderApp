import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // borderWidth: 1,
    backgroundColor: 'white',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#484747',
    marginTop: 11.7,
    marginBottom: 17,
    fontWeight: '600',
  },
  rightContainer: {
    position: 'absolute',
    right: 35,
    top: 4,
  },
  cartIconBox: {
    height: 32,
    width: 33,
    // borderWidth: 1,
  },
});

export default styles;
