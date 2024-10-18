import { View, TouchableOpacity } from 'react-native';
import Cart from '../assets/icon_cart.svg';
import BackArrow from '../assets/icon_back_arrow.svg';
import styles from '../styles/StoreImg';

interface StoreImgProps {
  onBack: () => void;
  onShopping: () => void;
}

export default function StoreImg({ onBack, onShopping}: StoreImgProps): React.JSX.Element {
    
    return (
      <View style={styles.storeImgContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backArrowImg}>
        <BackArrow width={'12%'} height={'24%'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onShopping} style={styles.cartImg}>
        <Cart width={'12%'} height={'20%'}/>
      </TouchableOpacity>
    </View>
    )
}