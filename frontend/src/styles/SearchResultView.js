import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  divider: {
    height: 8,
    backgroundColor: 'rgba(243, 244, 246, 0.03)',
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  leftWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
  },
  img: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignSelf: 'center',
    borderWidth: 15,
  },
  storeNameWrapper: {
    display: 'flex',
  },
  storeName: {
    color: '#2A2A2C',
    fontSize: 14,
    fontWeight: '500',
  },
  storeType: {
    color: '#909090',
    fontSize: 12,
    fontWeight: '400',
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default styles;
