import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Cart from '../assets/icon_cart_white.svg';
import BackArrow from '../assets/icon_back_arrow.svg';
import ShoppingCartIcon from "../components/ShoppingCartIcon";
import styles from '../styles/StoreImg';

interface StoreImgProps {
  onBack: () => void;
  onShopping: () => void;
  img: string | undefined;  // 문자열 경로를 받을 수 있도록 설정
}

export default function StoreImg({ onBack, onShopping, img }: StoreImgProps): React.JSX.Element {
    
    return (
      <View style={styles.storeImgContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backArrowImg}>
          <BackArrow width={'100%'} height={'100%'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShopping} style={styles.cartImg}>
          <ShoppingCartIcon color='White'/>
        </TouchableOpacity>
        {img !== undefined ? (
        <Image source={{uri: img}} style={styles.img}/>
        ) : <View></View>
        }
      </View>
    );
}
