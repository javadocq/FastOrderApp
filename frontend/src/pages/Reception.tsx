import React, { useState, useEffect } from "react";
import { 
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import styles from "../styles/Reception";
import { BASE_URL } from "../consts/Url";
import { NavigationProp, RouteProp } from '../navigation/NavigationProps';
import TopTitle from "../components/TopTitle";
import ProgressBar from "../components/Progress";
import BottomButton from "../components/BottomButton";
import axios from "axios";
import { getToken } from "../components/UserToken";
import { Alert } from "react-native";

interface Option {
    Cost: number;
    Title: string;
    OptionNo: number;
}

interface Menu {
    no: number;
    Price: number;
    Title: string;
}

interface Item {
    Menu: Menu;
    Count: number;
    Price: number;
    Option: Option[];
    store_id: number;
}

interface OrderItem {
    message: string;
    order_status: string;
    items: Item[];
    order_notes: string;
    menu_numbers: number[];
    images: string[];
    order_id: number;
    ready_time_at: string;
    user_name : string;
    store_name : string;
}

type ReceptionProps = NavigationProp & RouteProp;

export default function Reception({ navigation, route }: ReceptionProps): React.JSX.Element {
    const { orderId } = route.params; // 객체 구조 분해 할당
    const steps = ['접수확인', '조리 중', '조리 완료'];
    const [currentStep, setCurrentStep] = useState<string>(""); 
    const [orderMenu, setOrderMenu] = useState<OrderItem | null>(null);
    const [cancel, setCancel] = useState<string>("");

    function handleMoveMain() {
        navigation.navigate('BottomNavigation');
    }
    
    function handleBack() {
        navigation.goBack();
    }
    const formatPrice = (price:number) => {
        return new Intl.NumberFormat("ko-KR").format(price);
    };


    function handleCancel() {
        Alert.alert(
            '주문취소',
            '정말로 취소하시겠습니까?',
            [
              {text: '아니오', onPress: () => {}, style: 'cancel'},
              {
                text: '예',
                onPress: () => {
                  setCancel("Cancelled")
                },
                style: 'destructive',
              },
            ],
            {
              cancelable: true,
              onDismiss: () => {},
            },
          );
    };

    useEffect(() => {
        const fetchCurrentStep = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(`${BASE_URL}/user/oneOrderHistory?token=${token}&order_id=${orderId}`); // orderId 사용
                console.log(JSON.stringify(response.data));
                const { order_status } = response.data;
                setCancel(order_status);
                
                if (cancel === "Cancelled" || cancel === "Rejected") {
                    navigation.navigate('BottomNavigation');  // BottomNavigation으로 이동
                } else {
                    setCurrentStep(order_status);
                    setOrderMenu(response.data);
                }
            } catch (error) {
                console.error('Error fetching current step:', error);
            }
            
        };
        fetchCurrentStep();
    }, [cancel])


    

    // useEffect(() => {
    //     fetchCurrentStep(); // 컴포넌트 마운트 시 한 번 호출

    //     const interval = setInterval(() => {
    //         fetchCurrentStep(); // 주기적으로 호출
    //     }, 5000); // 5초마다 호출

    //     return () => clearInterval(interval); // 클린업
    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.wrap}>
                    <TopTitle name="접수내역" onPress={handleBack} />

                    <View style={styles.padding}></View>

                    <View>
                        <ProgressBar steps={steps} currentStep={
                            currentStep === "Pending" ? 
                            0 : currentStep === "Confirmed" ? 1 : currentStep === "Completed" ? 2 : 
                            -1
                        }/>
                    </View>
                    {
                        currentStep !== "Pending" ? (     
                            <View style={{width : '85%'}}>
                                <Text style={styles.lableText}>{`${orderMenu?.user_name}님의 주문이 준비중이예요`}</Text>
                                <View style={styles.inputBox}>
                                <Text style={styles.inputText}>{`${orderMenu?.ready_time_at.toString().slice(11,16)} 완료 예정`}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{width : '85%', marginTop : '5%'}}>
                                <View style={styles.inputBox}>
                                    <Text style={styles.cancelInfoText}>접수 확인 전 까지만 주문 취소가 가능해요</Text>
                                    <TouchableOpacity style={styles.cancelBox} onPress={handleCancel}>
                                        <Text style={styles.cancelText}>주문취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> 
                        )
                    }
                    <View style={{width : '85%'}}>
                        <Text style={styles.lableText}>{orderMenu?.store_name}</Text>
                        <View style={styles.menuBox}>
                            {orderMenu && orderMenu.items ? ( // orderMenu가 null이 아니고 items가 존재하는지 확인
                                orderMenu.items.map((item, index) => (
                                    <View 
                                        key={index} 
                                        style={[
                                            styles.orderMenu, 
                                            index < orderMenu.items.length - 1 ? styles.withSeparator : styles.withoutSeparator
                                        ]}
                                    >
                                        <View>
                                            <Text style={styles.menuName}>{item.Menu.Title}</Text>
                                            <Text style={styles.menuDetails}>{`가격 : 1인분 (${formatPrice(item.Menu.Price)}원)`}</Text>
                                            <Text style={styles.menuPrice}>{`${formatPrice(item.Price)}원`}</Text>
                                        </View>
                                        <View style={styles.menuImg}>
                                            <Image source={{uri : orderMenu.images[index]}} style={{height :'100%', width : '100%'}}/>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.inputText}>주문 정보가 없습니다.</Text> // 주문 정보가 없을 때 메시지
                            )}
                        </View>
                    </View>

                    <View style={{width : '85%'}}>
                        <Text style={styles.lableText}>가게 요청사항</Text>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputText}>{orderMenu?.order_notes}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomButton name="홈으로 돌아가기" onPress={handleMoveMain} checked={true} color="#EC424C"/>
        </SafeAreaView>
    )
}
