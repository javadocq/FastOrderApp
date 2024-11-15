import React, {useEffect, useState} from 'react';
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
}

interface Store {
  user_id : string;
  store_name: string;
  store_description: string | null;
  menus: Menu[];
}

export default function Likes({navigation}: NavigationProp): React.JSX.Element {
  const [likesMenu, setLikesMenu] = useState<Store []>([]);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
      const getFetchLikes = async() => {
        try {
          const token = await getToken();
          const response = await axios.get(`${BASE_URL}/user/wishlist?token=${token}`);
          setLikesMenu(response.data);
          setUserName(response.data[0].user_id);
        } catch(error) {
          console.log(error);
        }
      };
      getFetchLikes();
  }, [])

  const [editButton, setEditButton] = useState(false);

  const toggleEditButton = () => {
    setEditButton(prevEditButton => !prevEditButton);
    console.log('edit button pressed');
  };

  function handleRemoveStore(storeIndex : number) {
    setLikesMenu((prev => {
      const updatedStores = [...prev];
      updatedStores.splice(storeIndex, 1);
      return updatedStores;
    }))
  }

  function handleRemoveMenu(storeIndex : number, menuIndex : number) {
    setLikesMenu((prev) => {
      const updatedStores = [...prev];
      updatedStores[storeIndex].menus.splice(menuIndex, 1);

      if(updatedStores[storeIndex].menus.length === 0) {
        updatedStores.splice(storeIndex,1);
      }

      return updatedStores;
    })
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
        {likesMenu.map((item, storeIndex) => (
          <View key={storeIndex}>
            <LikesStoreHeader
              storeName={item.store_name}
              storeDescription={item.store_description}
              onRemoveStore={() => handleRemoveStore(storeIndex)}
            />
            {item.menus.map((menu, menuIndex) => (
              <LikesListItem
                key={menuIndex}
                name={menu.menu_name}
                price={menu.menu_price}
                img={menu.menu_image_url}
                editButtonClicked={editButton}
                onRemoveMenu={() => handleRemoveMenu(storeIndex, menuIndex)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
