import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

/** Const */
import {BASE_URL} from '../consts/Url';
/** Components */
import {getToken} from '../components/UserToken';
/** Icons */
import DetailIcon from '@assets/icon_my_details.svg';
import DumplingIcon from '@assets/icon_dumpling.svg';
/** Style */
import styles from '../styles/My';
import AppbarDefault from '../components/AppbarDefault';
import {NavigationProp} from '../navigation/NavigationProps';
import CouponItem from '../components/CouponItem';

// mypage/incpoints

export default function My({navigation}: NavigationProp): React.JSX.Element {
  const [point, setPoint] = useState<number>(0);
  const [userName, setUserName] = useState<number>(0);
  const [userToken, setUserToken] = useState<string | undefined>(undefined); // 초기값을 undefined로 설정

  const incPoints = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/mypage/incpoints`, {
        token: userToken,
      });
      setPoint(response.data.current_points);
    } catch (e) {
      console.error('Error increase Points: ', e);
    }
  };

  const handlePress = () => {
    navigation.navigate('MyDetail'); // MyDetail로 이동
  };

  const getUserInfo = async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/mypage?token=${token}`);
      setUserName(response.data.name);
      setPoint(response.data.current_points);
      console.log('getUserInfo', response.data);
    } catch (e) {
      console.error('Error get MyPage: ', e);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userToken = await getToken(); // await 사용
      if (userToken) {
        setUserToken(userToken); // userToken이 유효한 경우에만 설정
        await getUserInfo(userToken);
      } else {
        console.error('유효한 토큰이 없습니다.'); // 토큰이 없을 경우 에러 로그
      }
    };

    fetchUserInfo();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <View style={styles.container}>
      <AppbarDefault title="마이페이지" />
      <View style={styles.divider}></View>
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImg}></View>
          <View style={styles.profileWrapper}>
            <Text style={styles.name}>{userName}</Text>
            <View style={styles.iconBox}>
              <DetailIcon onPress={handlePress} />
            </View>
          </View>
        </View>
        {/* ~님의 포인트 */}
        <View style={styles.pointContainer}>
          <View style={styles.pointWrapper}>
            <Text style={styles.pointText}>{userName}님의 포인트</Text>
            <Text style={styles.pointText}>{point.toLocaleString()}원</Text>
          </View>
          <TouchableOpacity style={styles.chargeButton} onPress={incPoints}>
            <Text style={styles.buttonText}>포인트로 충전하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.couponTitleContainer}>
          <Text style={styles.titleText}>{userName}님의 쿠폰</Text>
          <TouchableOpacity style={styles.couponDetailWrapper}>
            <Text>더보기</Text>
            <View style={styles.couponDetailIconBox}>
              <DetailIcon width={5} height={10} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.couponContainer}>
          <View style={styles.row}>
            <CouponItem />
            <CouponItem />
          </View>
          <View style={styles.row}>
            <CouponItem />
            <CouponItem />
          </View>
        </View>
        {/* 문의 및 알림 */}
        <View style={styles.helpContainer}>
          <View style={styles.helpTitle}>
            <Text style={styles.helpTitleText}>문의 및 알림</Text>
          </View>
          <View style={styles.helpMenuContainer}>
            <View style={styles.helpMenuWrapper}>
              <TouchableOpacity>
                <Text style={styles.helpMenuText}>고객센터</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.helpMenuText}>공지사항</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.helpMenuText}>쿠폰 사용내역</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.helpMenuWrapper}>
              <TouchableOpacity>
                <Text style={styles.helpMenuText}>자주 묻는 질문</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.helpMenuText}>약관 및 정책</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.helpMenuText}>문의 내역</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
