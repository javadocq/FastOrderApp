import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sheetDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
  },
  sheetDateLeftWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: '#222222',
    fontWeight: '400',
    fontSize: 16,
  },
  progress: {
    color: '#22222280',
    fontSize: 16,
  },
  likeIconBox: {},
  historyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8.56,
  },
  storeImg: {
    width: 71,
    height: 71,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
  orderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
    maxHeight: 71,
    gap: 5,
  },
  storeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14,
  },
  storeText: {
    color: '#484747',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    padding: 0,
    display: 'flex',
    padding: 0,
  },
  detailIconBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuText: {
    color: '#484747',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  orderButton: {
    marginTop: 9,
    backgroundColor: '#F55442',
    borderRadius: 5,
    height: 43,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  divider: {
    marginTop: 15.44,
    height: 3,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
});
export default styles;
