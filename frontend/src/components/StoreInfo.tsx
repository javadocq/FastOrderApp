import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

/** Consts */
import {BASE_URL} from '../consts/Url';
/** Components */
import {getToken} from '../components/UserToken';

import styles from '../styles/StoreInfo';
import {NavigationProp} from '../navigation/NavigationProps';

interface Store {
  no: number;
  store_name: string;
  latitude: string;
  longitude: string;
  store_type: string;
  store_status: string;
  seating_available: boolean;
  logo: string;
}

interface CombinedProp extends NavigationProp {
  storeId: number | null;
}

export default function OrderHistory({
  navigation,
  storeId,
}: CombinedProp): React.JSX.Element {
  const [store, setStore] = useState<Store | null>(null);

  const navigateToStore = () => {
    navigation.navigate('Store', {storeId});
  };

  const getStoresByType = async (storeId: number) => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/stores/mini/id/${storeId}`);

      setStore(response.data.store_data);
      console.log(response.data.store_data);
    } catch (error) {
      console.error(`Error during getStores of type ${storeId}:`, error);
    }
  };

  useEffect(() => {
    if (storeId) {
      getStoresByType(storeId);
    }
  }, [storeId]); // storeId가 변경될 때마다 실행

  return (
    <View style={styles.container}>
      {store ? (
        <View>
          <TouchableOpacity
            style={styles.storeNameWrapper}
            onPress={navigateToStore}>
            <Text style={styles.storeName}>{store.store_name}</Text>
            <Text style={styles.storeType}>{store.store_type}</Text>
          </TouchableOpacity>

          <View style={styles.statusWrapper}>
            <Text style={styles.businessStatus}>
              {store.store_status == 'Open' ? '영업중' : '영업전'}
            </Text>
            <Text style={styles.orderStatus}>
              {' '}
              •{' '}
              {store.seating_available
                ? '패스트 오더 가능'
                : '패스트 오더 불가'}
            </Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.imgScrollView}
            showsHorizontalScrollIndicator={false}>
            <Image source={{uri: `${store.logo}`}} style={styles.menuImg} />
          </ScrollView>
        </View>
      ) : (
        <Text>가게 정보 불러오는 중</Text>
      )}
    </View>
  );
}
