import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import axios from 'axios';

/** Icons */
import DetailIcon from '@assets/icon_details.svg';
import EmptyLikeIcon from '@assets/icon_empty_like.svg';
import FullLikeIcon from '@assets/icon_full_like.svg';
import CloseIcon from '@assets/icon_cancel.svg';
/** Components */
import {getToken} from '../components/UserToken';
/** Const */
import {BASE_URL} from '../consts/Url';
/** Styles */
import styles from '../styles/OrderListItem';
/** Props */
import {NavigationProp} from '../navigation/NavigationProps';

interface OrderListProp {
  date: string;
  progress: string;
  storeName: string;
  menuName: string;
  editButtonClicked: boolean;
}

interface CombinedInterface extends NavigationProp, OrderListProp {}

export default function OrderListItem({
  navigation,
  date,
  progress,
  storeName,
  menuName,
  editButtonClicked,
}: CombinedInterface): React.JSX.Element {
  const [likeChecked, setLikeChecked] = useState<boolean>(false);

  const postStoreLike = async (token: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/wish`,
        {
          token,
          type: 'store',
          store_id: 1002,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('like post data', response.data);
    } catch (error) {
      console.error('Error posting like', error);
    }
  };

  useEffect(() => {
    const handleLike = async () => {
      if (likeChecked) {
        console.log('Like 버튼이 체크되었습니다.');
        const userToken = await getToken(); // await 사용
        console.log('token', userToken);
        if (userToken) {
          await postStoreLike(userToken); // await 사용
        }
      }
    };

    handleLike();
  }, [likeChecked]); // likeChecked가 변경될 때마다 실행

  const navigateToPay = () => {
    navigation.navigate('Pay');
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
                <DetailIcon />
              </View>
            </View>
            <Text style={styles.menuText}>{menuName}</Text>
          </View>
          <View style={styles.likeIconBox}>
            <View style={{display: editButtonClicked ? 'none' : 'flex'}}>
              {likeChecked ? (
                <TouchableOpacity onPress={() => setLikeChecked(false)}>
                  <FullLikeIcon />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setLikeChecked(true)}>
                  <EmptyLikeIcon />
                </TouchableOpacity>
              )}
            </View>
            <CloseIcon
              style={[
                styles.closeIcon,
                {display: editButtonClicked ? 'flex' : 'none'},
              ]}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={navigateToPay}>
        <Text style={styles.orderText}>같은 메뉴 주문하기</Text>
      </TouchableOpacity>
    </View>
  );
}
