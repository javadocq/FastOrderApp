import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
}

interface Menu {
  menu_name: string;
}

export default function Order({navigation}: NavigationProp): React.JSX.Element {
  const [historys, setHistorys] = useState<Store[]>([]);
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${BASE_URL}/orders/history?token=${token}`,
        );

        setHistorys(response.data.order_history);
      } catch (e) {
        console.log('Search Result Error: ', e);
      }
    };
    getSearchResult();
  }, []);

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
        contentContainerStyle={{paddingVertical: 10}}>
        {historys.map((history, index) => {
          const menuCount = history.menus.length;
          const menuName =
            menuCount === 1
              ? history.menus[0].menu_name
              : `${history.menus[0].menu_name} 외 ${menuCount - 1}개`;
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
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
