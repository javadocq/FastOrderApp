import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
import axios from 'axios';
/** Consts */
import {BASE_URL} from '../consts/Url';
/** Style */
import styles from '../styles/Main';
/** Icons */
import CartIcon from '@assets/icon_cart.svg';
import KoreanIcon from '@assets/icon_food_korea.svg';
import JapaneseIcon from '@assets/icon_food_japan.svg';
import ChineseIcon from '@assets/icon_food_china.svg';
import WesternIcon from '@assets/icon_food_western.svg';
import CafeIcon from '@assets/icon_food_cafe.svg';
/** Components */
import BottomSheet from '../components/BottomSheet';
import NaverMap from '../components/NaverMap';
import SearchView from '../components/SearchView';
import SearchResultView from '../components/SearchResultView';
import { setSearch } from '../components/SearchStorage';

// 아이콘 매핑 정의
const foodIcons = {
  전체: null,
  한식: <KoreanIcon width={16} height={16} />,
  일식: <JapaneseIcon width={16} height={16} />,
  중식: <ChineseIcon width={16} height={16} />,
  양식: <WesternIcon width={16} height={16} />,
  카페: <CafeIcon width={16} height={16} />,
  기타: null,
} as const;

interface Store {
  no: number;
  store_name: string;
  latitude: string;
  longitude: string;
  store_type: string;
  store_status: string;
}

export default function Main({navigation}: NavigationProp): React.JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null,
  );
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const foodTypes = Object.keys(foodIcons) as (keyof typeof foodIcons)[];
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    setSelectedButtonIndex(0);
    getTotalStores();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        setSearchText(''); // 키보드 숨길 때 검색어 초기화
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePress = async (index: number) => {
    setSelectedButtonIndex(index);
    if (foodTypes[index] === '전체') {
      await getTotalStores();
    } else {
      await getStoresByType(foodTypes[index]);
    }
  };

  const navigateToShopping = () => {
    navigation.navigate('Shopping');
  };

  const getTotalStores = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/stores`);
      setStores(response.data);
    } catch (error) {
      console.error('Error during getStores:', error);
    }
  };

  const getStoresByType = async (type: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/stores/${type}`);
      setStores(response.data);
      console.log(`Stores of type ${type}:`, response.data);
    } catch (error) {
      console.error(`Error during getStores of type ${type}:`, error);
    }
  };

  const filteredStores =
    selectedButtonIndex !== null
      ? foodTypes[selectedButtonIndex] === '전체'
        ? stores
        : stores.filter(
            store => store.store_type === foodTypes[selectedButtonIndex],
          )
      : stores;

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.input}
            placeholder="먹고 싶은 메뉴나 가게를 검색해보세요."
            autoFocus={true}
            onFocus={() => setIsKeyboardVisible(true)}
            onBlur={() => setIsKeyboardVisible(false)}
            onChangeText={setSearchText} // 텍스트 변경 시 상태 업데이트
            value={searchText} // 텍스트 상태 바인딩
            onSubmitEditing={() => setSearch(searchText)}
          />
          <CartIcon onPress={navigateToShopping} />
        </View>
        {/* 키보드가 안 보일 때 칩그룹 숨기기 */}
        {isKeyboardVisible ? (
          <></>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonGroup}>
            {foodTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      selectedButtonIndex === index ? '#F55442' : '#2A2A2C',
                  },
                ]}>
                <View style={styles.chipContainer}>
                  {foodIcons[type] && (
                    <View style={styles.iconBox}>{foodIcons[type]}</View>
                  )}
                  <Text style={styles.chipText}>{type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      {isKeyboardVisible ? (
        searchText.length > 0 ? (
          <SearchResultView navigation={navigation} searchText={searchText}/>
        ) : (
          <SearchView  setSearchText={setSearchText}/>
        )
      ) : (
        <>
          <NaverMap
            navigation={navigation}
            stores={filteredStores}
            onMarkerPress={setSelectedStoreId}
          />
          <BottomSheet navigation={navigation} storeId={selectedStoreId} />
        </>
      )}
    </KeyboardAvoidingView>
  );
}
