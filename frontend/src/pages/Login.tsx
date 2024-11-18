import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import UnCheckedBox from '../assets/icon_unchecked_box.svg';
import { BASE_URL } from '../consts/Url';
import CheckedBox from '../assets/icon_checked_box.svg';
import TradeMark from '../assets/icon_trademark.svg';
import styles from '../styles/Login';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken, getToken } from '../components/UserToken';

interface LoginProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function Login({ navigation }: LoginProps): React.JSX.Element {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false); // 로그인 상태 유지
  const [FcmToken, setFcmToken] = useState<string>('');

  // FCM 토큰 가져오기
  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        setFcmToken(token);
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };

    fetchFcmToken();
  }, []);

  // 앱 실행 시 자동 로그인 상태 복원
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedId = await AsyncStorage.getItem('userId');
        const storedPassword = await AsyncStorage.getItem('userPassword');
        if (storedId && storedPassword) {
          setId(storedId);
          setPassword(storedPassword);
          setChecked(true); // 자동 로그인 상태로 설정
        }
      } catch (error) {
        console.error('Error loading credentials', error);
      }
    };

    loadCredentials();
  }, []);

  // 로그인 API 호출
  const getFetchLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        {
          text_id: id,
          pw: password,
          device_token: FcmToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      const token = response.data.token; // 서버에서 반환하는 토큰
      setToken(token); // 토큰 저장

      // 자동 로그인 활성화 시, 아이디와 비밀번호 저장
      if (checked) {
        await AsyncStorage.setItem('userId', id);
        await AsyncStorage.setItem('userPassword', password);
      }

      const userToken = await getToken(); // 토큰 확인
      console.log(userToken);

      navigation.navigate('BottomNavigation'); // 로그인 성공 후 메인 페이지로 이동
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogin = () => {
    console.log('아이디:', id);
    console.log('비밀번호:', password);
    getFetchLogin();
  };

  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  const handleSearchId = () => {
    Alert.alert('ID찾기');
  };

  const handleSearchPW = () => {
    Alert.alert('PW찾기');
  };

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <TradeMark />
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>패패오더</Text>
        <Text style={styles.semiTitle}>패스트 주문, 패스트 식사</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#AAA"
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#AAA"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!isPasswordVisible}
      />

      <View style={styles.checkWrap}>
        <TouchableOpacity onPress={() => setChecked(!checked)}>
          {checked ? <CheckedBox /> : <UnCheckedBox />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>자동 로그인</Text>
      </View>
      <TouchableOpacity style={styles.buttonBox} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextWrap}>
        <Text style={styles.bottomText} onPress={handleSearchId}>
          아이디 찾기
        </Text>
        <Text style={styles.bottomText}>|</Text>
        <Text style={styles.bottomText} onPress={handleSearchPW}>
          비밀번호 찾기
        </Text>
        <Text style={styles.bottomText}>|</Text>
        <Text style={styles.bottomTextSign} onPress={handleSignup}>
          회원가입
        </Text>
      </View>
    </View>
  );
}
