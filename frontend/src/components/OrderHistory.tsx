import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

import {NavigationProp} from '../navigation/NavigationProps';
/** Consts */
import {BASE_URL} from '../consts/Url';
/** Components */
import MainListItem from '../components/MainListItem';
import {getToken} from '../components/UserToken';

/** Styles */
import styles from '../styles/OrderHistory';

interface Store {
  order_date: string;
  order_status: string;
  is_wished: boolean;
  store_name: string;
  store_logo: string;
  menus: Menu[];
  store_id: number;
}

interface User {
  user_name: string;
}

interface Menu {
  menu_name: string;
}

export default function OrderHistory({
  navigation,
}: NavigationProp): React.JSX.Element {
  const [historys, setHistorys] = useState<Store[]>([]);
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const token = await getToken();
        console.log('token ', token);

        const response = await axios.get(
          `${BASE_URL}/orders/history?token=${token}`,
        );

        console.log('data  ', response.data);

        setHistorys(response.data.order_history);
        setUserName(response.data.user_name);
        console.log('order history ', historys);
        console.log('user name ', userName);
      } catch (e) {
        console.log('Search Result Error: ', e);
      }
    };
    getSearchResult(); // 함수 호출
  }, []);

  return (
    <View>
      <Text style={styles.bottomSheetTitle}>
        {userName}님의 최근 주문내역이에요!
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 68}}>
        {historys.map((history, index) => {
          const menuCount = history.menus.length;
          const menuName =
            menuCount === 1
              ? history.menus[0].menu_name
              : `${history.menus[0].menu_name} 외 ${menuCount - 1}개`;

          console.log('menuName ', menuName);

          return (
            <MainListItem
              key={index}
              navigation={navigation}
              date={history.order_date}
              progress={history.order_status}
              storeName={history.store_name}
              menuName={menuName.toString()}
              store_logo={history.store_logo}
              is_wished={history.is_wished}
              store_id={history.store_id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
