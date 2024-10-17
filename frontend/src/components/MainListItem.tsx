import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';

import DetailIcon from '@assets/icon_details.svg';
import styles from '../styles/MainListItem';

export default function MainListItem({
  navigation,
}: NavigationProp): React.JSX.Element {
  const navigateToStore = () => {
    navigation.navigate('Store');
  };
  return (
    <View>
      <View style={styles.bottomSheetDateWrapper}>
        <Text>8.15(월)</Text>
        <Text> • 픽업완료</Text>
      </View>
      <View style={styles.historyContainer}>
        {/* left */}
        <View style={styles.storeImg}></View>
        {/* right */}
        <View style={styles.orderContainer}>
          <View style={styles.storeWrapper}>
            <Text style={styles.storeText}>찌개찌개</Text>
            <View style={styles.detailIconBox}>
              <DetailIcon></DetailIcon>
            </View>
          </View>
          <Text style={styles.menuText}>김치찌개 외 1개 28,000원</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={navigateToStore}>
        <Text style={styles.orderText}>같은 메뉴 주문하기</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
    </View>
  );
}
