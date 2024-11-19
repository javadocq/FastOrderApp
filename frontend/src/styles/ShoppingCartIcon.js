import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    position: 'relative',
    paddingTop: 8,
  },
  wrap: {
    backgroundColor: '#EC424C',
    position: 'absolute',
    left: '50%',
    height: 16,
    width: 16,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 8.381,
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
