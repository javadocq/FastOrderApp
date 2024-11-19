import {View, Text, TouchableOpacity} from 'react-native';
/** Components */
import ShoppingCartIcon from '../components/ShoppingCartIcon';
/** Styles */
import styles from '../styles/AppbarSmall';
import {NavigationProp} from '../navigation/NavigationProps';

interface AppbarProp {
  title: string;
}

interface CombinedProps extends NavigationProp, AppbarProp {}

export default function AppbarSmall({
  navigation,
  title,
}: CombinedProps): React.JSX.Element {
  const navigateToShopping = () => {
    navigation.navigate('Shopping');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.cartIconBox}
          onPress={navigateToShopping}>
          <ShoppingCartIcon color="Black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
