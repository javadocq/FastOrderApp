import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationProp} from '../navigation/NavigationProps';
import axios from 'axios';

/** Style */
import styles from '../styles/Order';
/**Components */
import OrderListItem from '../components/OrderListItem';
import AppbarSmall from '../components/AppbarSmall';
import {ScrollView} from 'react-native-gesture-handler';
import {getToken} from '../components/UserToken';
/** Consts */
import {BASE_URL} from '../consts/Url';

interface Store {
  order_date: string;
  order_status: string;
  is_wished: boolean;
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

export default function Order({navigation}: NavigationProp): React.JSX.Element {
  const [historys, setHistorys] = useState<Store[]>([]);
  const [editButton, setEditButton] = useState(false);
  const [startIndex, setStartIndex] = useState(0); // 현재 인덱스 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useFocusEffect(
    React.useCallback(() => {
      console.log('Orders Page');
      getOrderHistory();

      return () => {
        // 필요한 클린업 작업
      };
    }, []),
  );

  const getOrderHistory = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(
        `${BASE_URL}/orders/history?token=${token}&start_index=${startIndex}&count=6`,
      );
      console.log('Response Data: ', response.data);

      setHistorys(prev => [...prev, ...response.data.order_history]);
      setStartIndex(prev => prev + 6);
    } catch (e) {
      console.log('Search Result Error: ', e);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const isAtBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - 20; // 약간의 여유를 두기 위한 20
    if (isAtBottom) {
      getOrderHistory(); // 바닥에 도달했을 때 추가 데이터 요청
    }
  };

  const toggleEditButton = () => {
    setEditButton(prevEditButton => !prevEditButton);
    console.log('edit button pressed');
  };

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
    <View style={styles.container}>
      <AppbarSmall title="주문내역" navigation={navigation} />
      <View style={[styles.divider, {height: 2}]}></View>
      <View style={styles.editWrapper}>
        <TouchableOpacity style={styles.editButton} onPress={toggleEditButton}>
          <Text style={styles.editText}>{editButton ? '완료' : '편집'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.divider, {height: 1}]}></View>

      <ScrollView
        style={styles.orderListContainer}
        contentContainerStyle={{paddingVertical: 10}}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
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
            <OrderListItem
              navigation={navigation}
              date={history.order_date}
              progress={history.order_status}
              storeName={history.store_name}
              menuName={menuName.toString()}
              editButtonClicked={editButton}
              updateWishStatus={updateWishStatus}
              store_logo={history.store_logo}
              is_wished={history.is_wished}
              storeId={history.store_id}
              costTotal={history.cost_total}
              orderId={history.order_id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
