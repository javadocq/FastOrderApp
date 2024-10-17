import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Checkbox, Provider as PaperProvider} from 'react-native-paper';
import styles from '../styles/Login';

interface LoginProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function Login({navigation}: LoginProps): React.JSX.Element {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  function InputIdHandler(Id: string) {
    setId(Id);
  }

  function InputPWHandler(Password: string) {
    setPassword(Password);
  }

  const handleLogin = () => {
    console.log('아이디:', id);
    console.log('비밀번호:', password);
    navigation.navigate('Main');
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
      <View style={styles.img}></View>

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
        <TouchableOpacity
          style={styles.CheckBox}
          onPress={() => setChecked(!checked)}>
          {checked && (
            <View style={styles.customCheckBox}>
              <View style={styles.checkMark} />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>로그인 상태 유지</Text>
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
