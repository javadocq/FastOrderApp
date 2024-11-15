import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationProp, RouteProp } from '../navigation/NavigationProps'; 
import { BASE_URL } from '../consts/Url';
import { getToken } from '../components/UserToken';
import EmptyLike from '../assets/icon_empty_like.svg';
import FullLike from '../assets/icon_full_like.svg';
import Location from '../assets/icon_location.svg';
import Clock from '../assets/icon_clock.svg';
import Phone from '../assets/icon_phone.svg';
import StoreImg from '../components/StoreImg';

import styles from '../styles/Store';

interface MenuItem {
  no: number;
  name: string;
  image: string
  price: number;
  description: string;
  min_quantity: number;
  max_quantity: number;
  is_soldout: number;
  store: number;
}

interface StoreInfo {
  business_days: string | null; // 영업일, null일 수 있음
  business_hours: string | null; // 영업시간, null일 수 있음
  description: string | null; // 설명, null일 수 있음
  location: string; // 위치
  logo: string 
  no: number; // 가게 번호
  phone_number: string | null; // 전화번호, null일 수 있음
  ready_time12: string | null; // 1인분 준비 시간, null일 수 있음
  ready_time34: string | null; // 2인분-3인분 준비 시간, null일 수 있음
  seating_available: boolean | null; // 좌석 가능 여부, null일 수 있음
  store_name: string; // 가게 이름
  store_status: string | null; // 가게 상태, null일 수 있음
  store_type: string; // 가게 타입
}

type StoreProps = NavigationProp & RouteProp;


export default function Store({ navigation, route }: StoreProps): React.JSX.Element {
  const { storeId } = route.params;
  const [likeChecked, setLikeChecked] = useState<boolean>(false);
  const [store, setStore] = useState<StoreInfo | null>(null); // StoreInfo 객체로 초기화
  const [menu, setMenu] = useState<MenuItem[]>([]);
  useEffect(() => {
        const getFetchStoreMenu = async () => {
            try {
              const token = await getToken();
              const response = await axios.get(`${BASE_URL}/stores/id/${storeId}?token=${token}`);
              const formattedMenu = await response.data.menu_data;
              setLikeChecked(response.data.is_wished);
              setMenu(formattedMenu);
              setStore(response.data.store_data);
              console.log(JSON.stringify(response.data, null, 2));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        getFetchStoreMenu();
    }, [])
    
  const formatPrice = (price:number) => {
      return new Intl.NumberFormat("ko-KR").format(price);
  };

  function handleMenuInfo(number : number) {
    navigation.navigate("MenuInfo", { menuId: number });
  }

  function handleBack() {
    navigation.goBack();
  }
  function handleMoveShopping() {
    navigation.navigate('Shopping')
  }
  function handleLike() {
    setLikeChecked(!likeChecked);
    const postFetchStoreLike = async () => {  //가게 아이디 넘겨줄 겁니다.
          try {
            const token = await getToken();
            const response = await axios.post(`${BASE_URL}/user/wish`, {
              token : token,
              type : "store",
              store_id : storeId,
            });
            console.log(response.data);
          } catch (error) {
            console.log("Error during Store Like");
          }
    }
    postFetchStoreLike();
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.wrap}>
          <StoreImg onBack={handleBack} onShopping={handleMoveShopping} img={store?.logo}/>
          <View style={styles.infoBox}>

            <View style={styles.infoTopText}>
              <View style={{flexDirection : 'row'}}>
                <Text style={styles.storeName}>{store?.store_name}</Text>
                <Text style={styles.storeMainMenu}>{store?.description}</Text>
              </View>
              <TouchableOpacity style={styles.likeImg} onPress={handleLike}>
                { likeChecked ?  <FullLike /> : <EmptyLike /> }
              </TouchableOpacity>
            </View>

            <View style={styles.infoText}>
              <View style={styles.locationImg}>
              <Location />
              </View>
              <Text style={styles.storeAddress}>{store?.location}</Text>
            </View>

            <View style={styles.infoText}>
              <View style={styles.clockImg}>
              <Clock />
              </View>
              <Text style={styles.storeOpen}>{store?.store_status === "Open" ? "영업중" : "영업전"}</Text>
              <Text style={styles.storeFastOrder}>{store?.seating_available ? ' • 패스트 오더 가능' : ' • 패스트 오더 불가능'}</Text>
            </View>
            <View style={styles.infoWaitTime}>
              <Text style={styles.minTime}>{`12시 기준   1인분-2인분${store?.ready_time12}분`}</Text>
              <View>
                <Text style={styles.maxTime}>{`2인분-3인분 ${store?.ready_time34}분`}</Text>
              </View>
            </View>
            <View style={styles.infoText}>
              <View style={styles.phoneImg}>
              <Phone />
              </View>
              <Text style={styles.storePhoneNumber}>{store?.phone_number}</Text>
            </View>
          </View>

          <View style={styles.padding}></View>

          <View style={styles.menuWrap}>
            {menu.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menu} onPress={() => handleMenuInfo(item.no)}>
                <View style={styles.menuBox}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>{`${formatPrice(item.price)}원`}</Text>
                </View>
                <View style={styles.menuImg}>
                  <Image source={{uri : item.image}} style={{height : '100%', width : '100%'}}/>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}