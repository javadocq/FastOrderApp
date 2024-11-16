import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
import {BASE_URL} from '../consts/Url';
import {getToken} from '../components/UserToken';
import DetailIcon from '@assets/icon_details.svg';
import EmptyLikeIcon from '@assets/icon_empty_like.svg';
import FullLikeIcon from '@assets/icon_full_like.svg';
import styles from '../styles/MainListItem';
import MainModal from './MainModal';

interface MainListProp {
  date: string;
  progress: string;
  storeName: string;
  menuName: string;
  store_logo: string;
  is_wished: boolean;
  storeId: number;
  updateWishStatus: (storeId: number, newStatus: boolean) => void; // 상태 업데이트 함수 타입 정의
}

interface CombinedInterface extends NavigationProp, MainListProp {}

export default function MainListItem({
  navigation,
  date,
  progress,
  storeName,
  menuName,
  store_logo,
  is_wished,
  storeId,
  updateWishStatus,
}: CombinedInterface): React.JSX.Element {
  const [likeChecked, setLikeChecked] = useState<boolean>(is_wished);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setLikeChecked(is_wished);
  }, [is_wished]);

  const navigateToPay = () => {
    navigation.navigate('Pay');
  };

  const navigateToStore = () => {
    console.log('store id ', storeId);
    navigation.navigate('Store', {storeId});
  };

  const handleLikePress = () => {
    if (likeChecked) {
      setModalVisible(true);
    } else {
      setLikeChecked(true);
      updateWishStatus(storeId, true);
      postLikes();
    }
  };

  const confirmLike = () => {
    setLikeChecked(false);
    updateWishStatus(storeId, false);
    setModalVisible(false);
  };

  const cancelLike = () => {
    setModalVisible(false);
    setLikeChecked(is_wished);
  };

  const postLikes = async () => {
    try {
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/user/wish`, {
        token: token,
        type: 'store',
        store_id: storeId,
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error during Main List Like', error);
    }
  };

  return (
    <View>
      <View style={styles.sheetDateContainer}>
        <View style={styles.sheetDateLeftWrapper}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.progress}> • {progress}</Text>
        </View>
        <View style={styles.likeIconBox}>
          <TouchableOpacity onPress={handleLikePress}>
            {likeChecked ? <FullLikeIcon /> : <EmptyLikeIcon />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.historyContainer}>
        <Image source={{uri: `${store_logo}`}} style={styles.storeImg} />
        <View style={styles.orderContainer}>
          <TouchableOpacity
            style={styles.storeWrapper}
            onPress={navigateToStore}>
            <Text style={styles.storeText}>{storeName}</Text>
            <View style={styles.detailIconBox}>
              <DetailIcon />
            </View>
          </TouchableOpacity>
          <Text style={styles.menuText}>{menuName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={navigateToPay}>
        <Text style={styles.orderText}>같은 메뉴 주문하기</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <MainModal
        visible={modalVisible}
        onClose={cancelLike}
        onConfirm={confirmLike}
      />
    </View>
  );
}
