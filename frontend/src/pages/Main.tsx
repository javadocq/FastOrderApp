import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from '../styles/Main';
/** Icons */
import HomeIcon from '@assets/icon_home.svg';
import ListIcon from '@assets/icon_order_list.svg';
import LikeIcon from '@assets/icon_like.svg';
import MyIcon from '@assets/icon_my.svg';

import BottomSheet from '../components/BottomSheet';

const Tab = createBottomTabNavigator();

export default function Main({navigation}: NavigationProp): React.JSX.Element {
  const [selectedButtons, setSelectedButtons] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const foodTypes = ['한식', '일식', '중식', '양식', '카페'];

  const handlePress = (index: number) => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = !newSelectedButtons[index];
    setSelectedButtons(newSelectedButtons);
    console.log('Pressed', index);
  };

  const MainScreen = () => (
    <View style={styles.wrap}>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.input} placeholder="검색" />
        <View style={styles.buttonGroup}>
          {foodTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              style={[
                styles.chip,
                {
                  backgroundColor: selectedButtons[index]
                    ? '#9A9A9A'
                    : '#E0E0E0',
                },
              ]}>
              <View style={styles.chipContainer}>
                <View style={styles.iconBox}></View>
                <Text style={{fontSize: 14, color: '#3D3D3D'}}>{type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <BottomSheet navigation={navigation} />
    </View>
  );

  const OrderListScreen = () => (
    <View style={styles.container}>
      <Text>주문 목록</Text>
    </View>
  );

  const LikesScreen = () => (
    <View style={styles.container}>
      <Text>찜</Text>
    </View>
  );

  const MyScreen = () => (
    <View style={styles.container}>
      <Text>마이페이지</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let IconComponent;

            if (route.name === 'Main') {
              IconComponent = HomeIcon;
            } else if (route.name === 'OrderList') {
              IconComponent = ListIcon;
            } else if (route.name === 'Likes') {
              IconComponent = LikeIcon;
            } else {
              IconComponent = MyIcon;
            }

            return (
              <View>
                <IconComponent width={24} height={24} />
              </View>
            );
          },

          tabBarLabelStyle: {
            padding: 0,
            margin: 0,
            // borderWidth: 1,
          },
          tabBarStyle: {
            height: 74,
            paddingBottom: 0,
          },
          tabBarItemStyle: {
            padding: 0,
            // borderWidth: 1,
            // height:74
          },
        })}>
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{tabBarLabel: '홈'}}
        />
        <Tab.Screen
          name="OrderList"
          component={OrderListScreen}
          options={{tabBarLabel: '주문 목록'}}
        />
        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{tabBarLabel: '찜 목록'}}
        />
        <Tab.Screen
          name="My"
          component={MyScreen}
          options={{tabBarLabel: '내 정보'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
