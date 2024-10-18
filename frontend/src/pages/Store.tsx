import React, { useState } from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import { NavigationProp } from '../navigation/NavigationProps'; // 인터페이스 import
import Like from '../assets/icon_like.svg';
import Location from '../assets/icon_location.svg';
import Clock from '../assets/icon_clock.svg';
import Phone from '../assets/icon_phone.svg';

import StoreImg from '../components/StoreImg';

import styles from '../styles/Store';

export default function Store({ navigation }: NavigationProp): React.JSX.Element {
  const [isFastOrderOn, setIsFastOrderOn] = useState(true);
  const menu = [
    { name: '제육볶음', price: '7,000원', img: '' },
    { name: '김치찌개', price: '6,500원', img: '' },
    { name: '된장찌개', price: '6,000원', img: '' },
    { name: '갈비탕', price: '8,000원', img: '' },
    { name: '비빔밥', price: '7,500원', img: '' },
    { name: '떡볶이', price: '5,500원', img: '' },
  ];


  function handleMenuInfo() {
    navigation.navigate('MenuInfo');
  }

  function handleMoveMain() {
    navigation.navigate('Main')
  }
  function handleMoveShopping() {
    navigation.navigate('Shopping')
}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.imgBox}>
          <StoreImg onBack={handleMoveMain} onShopping={handleMoveShopping} />
        </View>
        <View style={styles.infoBox}>

          <View style={styles.infoText}>
            <Text style={styles.storeName}>찌개찌개</Text>
            <Text style={styles.storeMainMenu}>찌개, 전골</Text>
            <View style={styles.likeImg}>
              <Like />
            </View>
          </View>

          <View style={styles.infoText}>
            <View style={styles.locationImg}>
             <Location />
            </View>
            <Text style={styles.storeAddress}>경기 안산시 상록구 한양대학로 60</Text>
          </View>

          <View style={styles.infoText}>
            <View style={styles.clockImg}>
             <Clock />
            </View>
            <Text style={styles.storeOpen}>영업중</Text>
            <Text style={styles.storeFastOrder}>{isFastOrderOn ? ' • 패스트 오더 가능' : ' • 패스트 오더 불가능'}</Text>
          </View>
          <View style={styles.infoWaitTime}>
            <Text style={styles.minTime}>12시 기준   1인분-2인분 15분</Text>
            <View>
              <Text style={styles.maxTime}>2인분-3인분 30분</Text>
            </View>
          </View>
          <View style={styles.infoText}>
            <View style={styles.phoneImg}>
             <Phone />
            </View>
            <Text style={styles.storePhoneNumber}>010-7686-8560</Text>
          </View>

        </View>

        <View style={styles.padding}></View>

        <View style={styles.wrapper}>
          {menu.map((item, index) => (
            <View key={index} style={styles.menu}>
              <View style={styles.menuBox}>
                <Text style={styles.menuName} onPress={handleMenuInfo}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price}</Text>
              </View>
              <View style={styles.menuImg}></View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

