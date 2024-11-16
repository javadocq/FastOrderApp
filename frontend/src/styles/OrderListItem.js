import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14.44,
  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  closeIcon: {
    height: 15,
    justifyContent: 'center',
  },
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
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  orderLeftWrapper: {
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
  likeIconBox: {
    paddingTop: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  closeIcon: {
    display: 'none',
  },
  orderButton: {
    marginTop: 9,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    height: 43,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 18,
    color: '#484747',
  },
  divider: {
    marginTop: 15.44,
    height: 3,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
});
export default styles;
