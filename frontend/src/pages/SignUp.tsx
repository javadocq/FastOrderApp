import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import {NavigationProp} from '../navigation/NavigationProps';
import styles from "../styles/SignUp";
import { BASE_URL } from '../consts/Url';
import BottomButton from "../components/BottomButton";
import TopTitle from "../components/TopTitle";

export default function SignUp({navigation}: NavigationProp):React.JSX.Element {
    const [id, setID] = useState<string>("");
    const [pw, setPW] = useState<string>("");
    const [secondPW, setSecondPW] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [authenticationNumber, setAuthenticationNumber] = useState<string>("0"); //인증번호 입력 변수 
    const [compareViewAuth, setCompareViewAuth] = useState<boolean>(false);
    const [checkedAuthentication, setCheckedAuthentication] = useState<boolean>(false); //인증번호 맞는지 T/F변수
    const [comparePW, setComparePW] = useState<boolean>(false); //비밀번호 같은지 확인
    const [authenticationId, setAuthenticationId] = useState<boolean>(false); //id 중복확인

    
    const getFetchSignup = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/user/signup`,
            {
              text_id: id,
              pw: pw,
              name : name,
              phone : phone,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log('complete');
          // 회원가입 성공 시 페이지 이동
          setID('');
          setPW('');
          setSecondPW('');
          setPhone('');
          setName('');
          setAuthenticationNumber('0');
          setCheckedAuthentication(false);
          setCompareViewAuth(false);
          navigation.navigate('Login'); // 성공적으로 가입한 후 페이지로 이동
        } catch (error) {
          console.log('hi');
          console.error('Error during signup:', error);
        }
        console.log('finish');
      };
    
    



    function handleBack() {
        navigation.goBack();
    }
    function handleIdInput(id : string) {
        setID(id);
    }

    function handlePwInput(pw : string) {
        setPW(pw);
        if(pw == secondPW) {
            setComparePW(true)
            return comparePW 
        } else {
            setComparePW(false)
            return comparePW
        }
    }

    function handleSecondPW(secondPW: string) {
        setSecondPW(secondPW);
        if(pw == secondPW) {
            setComparePW(true)
            return comparePW 
        } else {
            setComparePW(false)
            return comparePW
        }
    }
    function handleName(name : string) {
        setName(name)
    }
    function handlePhone(phone : string) {
        setPhone(phone);
    }
    function handleAuthentication(authenticationNumber: string) {
        setAuthenticationNumber(authenticationNumber);
    }


    function handleGetAuthentication() {
        if(phone.length === 11) {
            Alert.alert('인증번호를 받았습니다.');
            setCompareViewAuth(true);
        } else {
            Alert.alert('휴대폰 번호 11자리를 입력하세요.');
        }
        
    }
    function handleSetAuthentication() {
        if(authenticationNumber === '123') {
            Alert.alert('인증 성공');
            setCheckedAuthentication(true);
        } else {
            Alert.alert('인증에 실패하셨습니다.');
            setCheckedAuthentication(false);
        }
    }

    function handleDuplicate() {
             const Duplicate = async () => {
                if (id) {
                  try {
                    const response = await axios.get(`${BASE_URL}/check-id?id=${id}`);
                    
                    if(response.data) {
                      setAuthenticationId(response.data);
                    }
                    Alert.alert("사용하셔도 되는 아이디 입니다.")
                  } catch (error) {
                    Alert.alert("중복된 아이디 입니다.")
                  }
                }
              }; 
    }


    function handleLoginPage() {
        if(comparePW && checkedAuthentication && authenticationId) {
            console.log(id);
            console.log(pw);
            console.log(phone);
            console.log(name);
            getFetchSignup();
        }
    }


    return (<SafeAreaView style={styles.container}>
        <View style={styles.signWrap}>
            <TopTitle name="회원가입" onPress={handleBack}/>
            <View style={styles.padding}></View>
        
            <Text style={styles.lableText}>아이디</Text>
            <View style={styles.authBox}>
                <TextInput style={styles.inputButton} placeholder="아이디를 입력하세요" placeholderTextColor="#B5B5B5" onChangeText={handleIdInput}></TextInput>
                <TouchableOpacity style={styles.buttonBox} onPress={handleDuplicate}>
                    <Text style={styles.buttonText}>중복확인</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.lableText}>비밀번호</Text>
            <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#B5B5B5" onChangeText={handlePwInput} secureTextEntry={true}></TextInput>
            <TextInput style={styles.input} placeholder="비밀번호 확인" placeholderTextColor="#B5B5B5" onChangeText={handleSecondPW} secureTextEntry={true}></TextInput>

            <Text style={styles.lableText}>이름</Text>
            <TextInput style={styles.inputName} placeholder="성명을 입력하세요" placeholderTextColor='#B5B5B5' onChangeText={handleName}/>
            <Text style={styles.lableText}>휴대폰 인증</Text>
            <View style={styles.authBox}>
                <TextInput style={styles.inputButton} placeholder="휴대폰 번호 (- 제외하고 입력)" placeholderTextColor="#B5B5B5" onChangeText={handlePhone}></TextInput>
                <TouchableOpacity style={styles.buttonBox} onPress={handleGetAuthentication}>
                    <Text style={styles.buttonText}>인증번호 받기</Text>
                </TouchableOpacity>
            </View>
            {
            !compareViewAuth ? null :
                <View style={styles.authBox}>
                    <TextInput style={styles.inputButton} placeholder="인증 번호" placeholderTextColor="#B5B5B5" onChangeText={handleAuthentication}></TextInput>
                    <TouchableOpacity style={styles.buttonBox} onPress={handleSetAuthentication}>
                        <Text style={styles.buttonText}>인증번호 확인</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
        <TouchableOpacity style= {styles.bottomButtonBox}>
             <BottomButton name="가입하기" onPress={handleLoginPage} checked={comparePW && checkedAuthentication && name !== '' && authenticationId} color="#1B1B1B"/>
        </TouchableOpacity>
    </SafeAreaView>)
}