import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 42,
    backgroundColor: '#E0E0E0',
  },
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingTop: 5.7,
    paddingHorizontal: 25,
    paddingBottom: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  buttonGroup: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 44,
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  iconBox: {
    width: 16,
    height: 16,
    backgroundColor: '#9A9A9A',
  },
});

export default styles;
