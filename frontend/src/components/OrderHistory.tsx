import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
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
  order_id: number;
  store_name: string;
  store_logo: string;
  menus: Menu[];
  store_id: number;
  cost_total: number;
  order_id: number;
}

interface Menu {
  menu_name: string;
}

export default function OrderHistory({
  navigation,
}: NavigationProp): React.JSX.Element {
  const [historys, setHistorys] = useState<Store[]>([]);
  const [userName, setUserName] = useState<string>();

  useFocusEffect(
    React.useCallback(() => {
      const getOrderHistory = async () => {
        try {
          const token = await getToken();
          const response = await axios.get(
            `${BASE_URL}/orders/history?token=${token}`,
          );

          setHistorys(response.data.order_history);
          setUserName(response.data.user_name);
        } catch (e) {
          console.log('Search Result Error: ', e);
        }
      };
      getOrderHistory();
    }, []),
  );

  const updateWishStatus = (storeId: number, newStatus: boolean) => {
    setHistorys(prevHistory =>
      prevHistory.map(history =>
        history.store_id === storeId
          ? {...history, is_wished: newStatus}
          : history,
      ),
    );
  };

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
          const menuCost = history.cost_total.toLocaleString();
          const menuName =
            menuCount === 1
              ? `${history.menus[0].menu_name} ${menuCost}원`
              : `${history.menus[0].menu_name} 외 ${
                  menuCount - 1
                }개 ${menuCost}원`;

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
              storeId={history.store_id}
              orderId={history.order_id}
              updateWishStatus={updateWishStatus} // 상태 업데이트 함수 전달
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
