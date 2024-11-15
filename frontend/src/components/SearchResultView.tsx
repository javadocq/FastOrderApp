import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';
/** Consts */
import {BASE_URL} from '../consts/Url';
/** Icons */
import DetailIcon from '../assets/icon_details.svg';
/** Styles */
import styles from '../styles/SearchResultView';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp} from '../navigation/NavigationProps';

interface SearchProp {
  searchText: string;
}

interface StoreProp {
  store_name: string;
  type: string;
  logo: string;
  store_id: number;
}

interface CombinedProp extends NavigationProp, SearchProp {}

export default function SearchResultView({
  searchText,
  navigation,
}: CombinedProp) {
  const [stores, setStores] = useState<StoreProp[]>([]);

  const navigateToStore = (store_id: number) => {
    console.log(store_id);
    navigation.navigate('Store', {store_id}); // 수정된 부분: store_id를 직접 전달
  };

  useEffect(() => {
    const getSearchResult = async (keyword: string) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/search?keyword=${keyword}`,
        );
        setStores(response.data);
      } catch (e) {
        console.log('Search Result Error: ', e);
      }
    };

    if (searchText) {
      getSearchResult(searchText);
    } else {
      setStores([]); // 검색어가 비어있으면 스토어 배열 초기화
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>
      <ScrollView style={styles.scrollContainer}>
        {stores.length > 0 ? (
          stores.map((store, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => navigateToStore(store.store_id)}>
              <View style={styles.leftWrapper}>
                <Image
                  source={{uri: `${BASE_URL}/media/${store.logo}`}}
                  style={styles.img}
                />
                <View style={styles.storeNameWrapper}>
                  <Text style={styles.storeName}>{store.store_name}</Text>
                  <Text style={styles.storeType}>{store.type}</Text>
                </View>
              </View>
              <View style={styles.iconBox}>
                <DetailIcon />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No results found.</Text> // 결과가 없을 때 메시지 표시
        )}
      </ScrollView>
    </View>
  );
}
