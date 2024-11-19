import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import axios from 'axios';
import {getToken} from '../components/UserToken';
/** Consts */
import {BASE_URL} from '../consts/Url';
/** Components */
import MainModal from './MainModal';

/** Icons */
import DetailIcon from '@assets/icon_details.svg';
import EmptyLikeIcon from '@assets/icon_empty_like.svg';
import FullLikeIcon from '@assets/icon_full_like.svg';
import CloseIcon from '@assets/icon_cancel.svg';
/** Styles */
import styles from '../styles/OrderListItem';
/** Props */
import {NavigationProp} from '../navigation/NavigationProps';

interface OrderListProp {
  editButtonClicked: boolean;
}

interface StoreProp {
  date: string;
  progress: string;
  storeName: string;
  menuName: string;
  store_logo: string;
  is_wished: boolean;
  storeId: number;
  orderId: number;
  costTotal: number;
  updateWishStatus: (storeId: number, newStatus: boolean) => void; // 상태 업데이트 함수 타입 정의
}

interface CombinedInterface extends NavigationProp, OrderListProp, StoreProp {}

export default function OrderListItem({
  navigation,
  date,
  progress,
  storeName,
  menuName,
  store_logo,
  editButtonClicked,
  is_wished,
  storeId,
  orderId,
  costTotal,
  updateWishStatus,
}: CombinedInterface): React.JSX.Element {
  const [likeChecked, setLikeChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setLikeChecked(is_wished);
  }, [is_wished]);

  const navigateToPay = () => {
    navigation.navigate('Shopping', {orderId});
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
    postLikes();
    setModalVisible(false);
  };

  const cancelLike = () => {
    setModalVisible(false);
    setLikeChecked(is_wished); // 초기 상태로 복원
  };

  const postLikes = async () => {
    try {
      console.log('try to post like');
      const token = await getToken();
      const response = await axios.post(`${BASE_URL}/user/wish`, {
        token: token,
        type: 'store',
        store_id: storeId.toString(),
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error during Main List Like', error);
    }
  };

  return (
    <View>
      <View style={styles.dateContainer}>
        <View style={styles.dateWrapper}>
          <Text>{date}</Text>
          <Text> • {progress}</Text>
        </View>
      </View>
      <View style={styles.historyContainer}>
        {/* left */}
        <Image source={{uri: store_logo}} style={styles.storeImg} />
        {/* right */}
        <View style={styles.orderContainer}>
          <View style={styles.orderLeftWrapper}>
            <TouchableOpacity
              style={styles.storeWrapper}
              onPress={navigateToStore}>
              <Text style={styles.storeText}>{storeName}</Text>
              <View style={styles.detailIconBox}>
                <DetailIcon></DetailIcon>
              </View>
            </TouchableOpacity>
            <Text style={styles.menuText}>{menuName}</Text>
          </View>
          <TouchableOpacity
            style={styles.likeIconBox}
            onPress={handleLikePress}>
            <View style={{display: editButtonClicked ? 'none' : 'flex'}}>
              {likeChecked ? <FullLikeIcon /> : <EmptyLikeIcon />}
            </View>
            <CloseIcon
              style={[
                styles.closeIcon,
                {display: editButtonClicked ? 'flex' : 'none'},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={navigateToPay}>
        <Text style={styles.orderText}>같은 메뉴 주문하기</Text>
      </TouchableOpacity>

      <MainModal
        visible={modalVisible}
        onClose={cancelLike}
        onConfirm={confirmLike}
      />
    </View>
  );
}
