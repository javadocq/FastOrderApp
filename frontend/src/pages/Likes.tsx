import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
/** Style */
import styles from '../styles/Likes';
/** Components */
import AppbarSmall from '../components/AppbarSmall';
import LikesListItem from '../components/LikesListItem';
/** Packages */
import {ScrollView} from 'react-native-gesture-handler';
import LikesStoreHeader from '../components/LikesStoreHeader';
/** Props */
import {NavigationProp} from '../navigation/NavigationProps';
import axios from 'axios';
import { BASE_URL } from '../consts/Url';
import { getToken } from '../components/UserToken';

interface Menu {
  menu_name: string;
  menu_price: number;
  menu_image_url: string;
  menu_id : string;
}

interface Store {
  user_name : string;
  store_id : string;
  store_name: string;
  store_description: string | null;
  menus: Menu[];
}

export default function Likes({navigation}: NavigationProp): React.JSX.Element {
  const [likesMenu, setLikesMenu] = useState<Store []>([]);
  const [userName, setUserName] = useState<string>("");

  // 찜 목록을 가져오는 함수
  const getFetchLikes = async() => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/user/wishlist?token=${token}`);
      console.log(JSON.stringify(response.data.wishlist));
      setLikesMenu(response.data.wishlist);
      setUserName(response.data.user_name);
    } catch(error) { 
      console.log(error);
    } 
  };

  useFocusEffect(
    React.useCallback(() => {
      getFetchLikes(); // 화면 활성화 시 데이터 가져오기
    }, [])
  );

  const [editButton, setEditButton] = useState(false);

  // 편집 버튼 토글
  const toggleEditButton = () => {
    setEditButton(prevEditButton => !prevEditButton);
    console.log('edit button pressed');
  };

  // 가게 찜 목록에서 제거
  function handleRemoveStore(storeIndex : string) {
    const postFetchStoreLike = async () => {
      try {
        const token = await getToken();
        const response = await axios.post(`${BASE_URL}/user/wish`, {
          token : token,
          type : "store",
          store_id : storeIndex,
        });
        console.log(response.data);
        
        // 상태에서 해당 가게 제거
        setLikesMenu(prevState => prevState.filter(store => store.store_id !== storeIndex));
      } catch (error) {
        console.log("Error during Store Like");
      }
    }
    postFetchStoreLike();
  }

  // 메뉴 찜 목록에서 제거
  function handleRemoveMenu(menuIndex : string) {
    const postFetchStoreLike = async () => {
      try {
        const token = await getToken();
        const response = await axios.post(`${BASE_URL}/user/wish`, {
          token : token,
          type : "menu",
          menu_id : menuIndex, 
        }); 
        console.log(response.data);
        
        // 상태에서 해당 메뉴 제거
        setLikesMenu(prevState => prevState.map(store => {
          if (store.menus.some(menu => menu.menu_id === menuIndex)) {
            return {
              ...store,
              menus: store.menus.filter(menu => menu.menu_id !== menuIndex),
            };
          }
          return store;
        }));
      } catch (error) {
        console.log("Error during Menu Like");
      }
    }
    postFetchStoreLike(); 
  }

  return (
    <View style={styles.container}>
      <AppbarSmall title={`${userName}님의 찜`} navigation={navigation} />
      <View style={[styles.divider, {height: 2}]}></View>
      <View style={styles.editWrapper}>
        <TouchableOpacity style={styles.editButton} onPress={toggleEditButton}>
          <Text style={styles.editText}>{editButton ? '완료' : '편집'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        {likesMenu.map((item, storeIndex) => {
          // 메뉴가 하나라도 있으면 가게 렌더링
          if (item.menus.length > 0) {
            return (
              <View key={storeIndex}>
                <LikesStoreHeader
                  storeName={item.store_name}
                  storeDescription={item.store_description}
                  onRemoveStore={() => handleRemoveStore(item.store_id)}
                />
                {item.menus.map((menu, menuIndex) => (
                  <LikesListItem
                    key={menuIndex}
                    name={menu.menu_name}
                    price={menu.menu_price}
                    img={menu.menu_image_url}
                    editButtonClicked={editButton}
                    onRemoveMenu={() => handleRemoveMenu(menu.menu_id)}
                  />
                ))}
              </View>
            );
          }
          return null; // 메뉴가 없으면 해당 가게는 렌더링하지 않음
        })}
      </ScrollView>
    </View>
  );
}
