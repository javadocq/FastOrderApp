import { storeToken, getToken } from '../components/UserToken';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import UnCheckedBox from '../assets/icon_unchecked_box.svg';
import { BASE_URL } from '../consts/Url';
import CheckedBox from '../assets/icon_checked_box.svg';
import TradeMark from '../assets/icon_trademark.svg';
import styles from '../styles/Login';
import axios from 'axios';

interface LoginProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}


export default function Login({navigation}: LoginProps): React.JSX.Element {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false); //로그인 상태 유지

  const getFetchLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        {
          text_id: id,
          pw: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      const token = response.data.token; // 서버에서 반환하는 토큰
      storeToken(token);
      const userToken = await getToken();
      console.log(userToken);
      navigation.navigate('BottomNavigation'); // 성공적으로 가입한 후 메인 페이지로 이동
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  function InputIdHandler(Id: string) {
    setId(Id);
  }

  function InputPWHandler(Password: string) {
    setPassword(Password);
  }

  const handleLogin = () => {
    console.log('아이디:', id);
    console.log('비밀번호:', password);
    getFetchLogin();
  };

  function handleSignup() {
    navigation.navigate('SignUp');
  }

  function handleSearchId() {
    Alert.alert('ID찾기');
  }

  function handleSearchPW() {
    Alert.alert('PW찾기');
  }

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
        onChangeText={InputIdHandler}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#AAA"
        onChangeText={InputPWHandler}
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