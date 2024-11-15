import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 26,
    paddingLeft: 24,
  },
  recentTitle: {
    fontSize: 16,
    fontColor: '#222222',
    fontWeight: '500',
  },
  chipGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
  },
});

export default styles;
