import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
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
  updateWishStatus: (storeId: number, newStatus: boolean) => void; // 상태 업데이트 함수 타입 정의
}

interface CombinedInterface extends NavigationProp, OrderListProp, StoreProp {}

export default function OrderListItem({
  navigation,
  date,
  progress,
  storeName,
  menuName,
  editButtonClicked,
  is_wished,
  storeId,
  updateWishStatus,
}: CombinedInterface): React.JSX.Element {
  const [likeChecked, setLikeChecked] = useState<boolean>(false);
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
      setLikeChecked(true); // 상태를 true로 변경
      updateWishStatus(storeId, true); // 상태 업데이트 호출
      postLikes(); // 서버에 좋아요 추가 요청
    }
  };

  const confirmLike = () => {
    setLikeChecked(false); // 상태를 false로 변경
    updateWishStatus(storeId, false); // 상태 업데이트 호출
    setModalVisible(false);
  };

  const cancelLike = () => {
    setModalVisible(false);
    setLikeChecked(is_wished); // 초기 상태로 복원
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
      <View style={styles.dateContainer}>
        <View style={styles.dateWrapper}>
          <Text>{date}</Text>
          <Text> • {progress}</Text>
        </View>
      </View>
      <View style={styles.historyContainer}>
        {/* left */}
        <View style={styles.storeImg}></View>
        {/* right */}
        <View style={styles.orderContainer}>
          <View style={styles.orderLeftWrapper}>
            <View style={styles.storeWrapper}>
              <Text style={styles.storeText}>{storeName}</Text>
              <View style={styles.detailIconBox}>
                <DetailIcon></DetailIcon>
              </View>
            </View>
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
