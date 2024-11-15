import styles from '../styles/LikesStoreHeader';
import CloseIcon from '@assets/icon_close.svg';

import {View, Text, TouchableOpacity} from 'react-native';
interface LikesStoreHeaderProp {
  storeName: string;
  storeDescription: string | null;
  onRemoveStore: () => void;
}

export default function LikesStoreHeader({
  storeName,
  storeDescription,
  onRemoveStore,
}: LikesStoreHeaderProp): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={[styles.divider, {height: 6}]}></View>
      <View style={styles.wrapper}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.storeCategory}>{storeDescription}</Text>
        <TouchableOpacity style={styles.cancelIcon} onPress={onRemoveStore}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}