import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
/** Consts */
import {BASE_URL} from '../consts/Url';
/** Icons */
import DetailIcon from '@assets/icon_details.svg';
import EmptyLikeIcon from '@assets/icon_empty_like.svg';
import FullLikeIcon from '@assets/icon_full_like.svg';
/** Styles */
import styles from '../styles/MainListItem';
import MainModal from './MainModal';

interface MainListProp {
  date: string;
  progress: string;
  storeName: string;
  menuName: string;
  store_logo: string;
  is_wished: boolean;
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
}: CombinedInterface): React.JSX.Element {
  const [likeChecked, setLikeChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigateToPay = () => {
    navigation.navigate('Pay');
  };

  const handleLikePress = () => {
    if (likeChecked) {
      setModalVisible(true);
    } else {
      setLikeChecked(true);
    }
  };

  const confirmLike = () => {
    setLikeChecked(false);
    setModalVisible(false);
  };

  const cancelLike = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <View style={styles.sheetDateContainer}>
        <View style={styles.sheetDateLeftWrapper}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.progress}> • {progress}</Text>
        </View>
        <View style={styles.likeIconBox}>
          <TouchableOpacity onPress={handleLikePress}>
            {is_wished ? <FullLikeIcon /> : <EmptyLikeIcon />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.historyContainer}>
        {/* left */}
        {/* <View style={styles.storeImg}></View> */}
        <Image
          source={{uri: `${BASE_URL}/media/${store_logo}`}}
          style={styles.storeImg}
        />
        {/* right */}
        <View style={styles.orderContainer}>
          <View style={styles.storeWrapper}>
            <Text style={styles.storeText}>{storeName}</Text>
            <View style={styles.detailIconBox}>
              <DetailIcon></DetailIcon>
            </View>
          </View>
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
