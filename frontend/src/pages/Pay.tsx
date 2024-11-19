import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { NavigationProp, RouteProp } from '../navigation/NavigationProps';
import { BASE_URL } from '../consts/Url';
import NextArrow from '../assets/icon_next_arrow.svg';
import CheckedEclips from '../assets/icon_checked_eclips.svg';
import UnCheckedBox from '../assets/icon_unchecked_box.svg';
import CheckedBox from '../assets/icon_checked_box.svg';
import Eclips from '../assets/icon_eclips.svg';
import Plus from '../assets/icon_plus.svg';
import Minus from '../assets/icon_minus.svg';
import styles from "../styles/Pay";
import BottomButton from "../components/BottomButton";
import TopTitle from "../components/TopTitle";
import { setItem, getItem } from "../components/Cart";
import { getToken } from "../components/UserToken";


interface Option {
    Cost: number;
    Title: string;
    OptionNo : number;
}

interface Menu {
    Price: number;
    Title: string;
}

interface CartItem {
    Menu: Menu;
    Count: number;
    Price: number;
    Option: Option[];
    store_id: number // Optional field since it's only present in some items
}

type PayProps = NavigationProp & RouteProp;

export default function Pay({ navigation, route }: PayProps):React.JSX.Element {
    const orderId = route.params.orderId;
    const [storeId, setStoreId] = useState<number>(0);
    const [peopleModalVisible, setPeopleModalVisible] = useState<boolean>(false);
    const [requestText, setRequestText] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false); //다음에도 사용
    const [couponCount ,setCouponCount] = useState<number>(0);
    const [count, setCount] = useState<number>(1); //식사 인원 카운트 수
    const [selectedCount, setSelectedCount] = useState<number>(0); //확정된 식사 인원 카운트 수 
    const [storeChecked, setStoreChecked] = useState<boolean>(false); //매장 식사 체크
    const [pickupChecked, setPickupChecked] = useState<boolean>(false); //픽업 체크
    const [orderMenu, setOrderMenu] = useState<CartItem[]>([]);
    const [userPoint, setUserPoint] = useState<number>(0);

    
 
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartItems = await getItem('cartItems');
                if (cartItems) {
                    setOrderMenu(JSON.parse(cartItems));
                    console.log(JSON.parse(cartItems)[0].store_id);
                    setStoreId(JSON.parse(cartItems)[0].store_id);
                }

            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };
        if(orderId) {
            fetchOrderDetails(route.params.orderId);
        } else {
            fetchCartItems();
        }
    }, []);

    const fetchOrderDetails = async (order_id: number) => {
        try {
            const token = await getToken();
            const response = await axios.get(`${BASE_URL}/user/oneOrderHistory`, {
                params: {
                    token: token,
                    order_id: order_id
                }
            });

            const order_data  = await response.data.items;
            console.log(order_data);
            setOrderMenu(order_data);
            setStoreId(order_data[0].store_id);
        } catch (error) {
            console.error("주문 정보 가져오기 실패:", error);
        }
    };


    const postFetchAll = async () => {
        const token = await getToken();
        const orderPayload = {
            store_id: storeId,
            token: token, //여기서 처리
            order_type: storeChecked ? "매장식사" : "픽업", //여기서 처리
            people_count: selectedCount, //여기서 처리
            order_items: JSON.stringify(orderMenu),
            order_notes: requestText, //여기서 처리;
            cost_total: totalPrice,
            cost_coupon: 0, //여기서 처리
        };
        console.log(orderPayload);
        try {
            const response = await axios.post(`${BASE_URL}/orders/new-order`, orderPayload);
            const newOrderId = response.data.order_id; // 새로운 orderId 저장
            await setItem('cartItems', JSON.stringify([])); // 빈 배열로 초기화
            // navigation.navigate에서 newOrderId 사용
            console.log('삭제완료');
            navigation.navigate('Reception', { orderId: newOrderId });
        } catch (error) {
            console.error("Error posting order:", error);
        }
    };

    useEffect(() => {
        const getFetchUserPoint = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(`${BASE_URL}/user/getpoints?token=${token}`);
                setUserPoint(response.data.current_point);
            } catch (error) {
                console.error("Error fetching menu info:", error);
            }
        };
        getFetchUserPoint();
    }, []);

    const totalPrice = orderMenu.reduce((total, item) => total + item.Price, 0);

    function handleBack() {
        navigation.goBack();
    }
    function handlePeoplePopUP() {
        setPeopleModalVisible(true);
        setStoreChecked(true);
        setPickupChecked(false);
    }
    function handlePickup() {
        setPickupChecked(true);
        setStoreChecked(false);
    }
    function handlePeopleCountInitial() {
        setCount(0);
        setSelectedCount(0);
        setStoreChecked(false);
        setPickupChecked(false);
    }

    function handleMoveReception() {
        postFetchAll();
    }
    function handlePlus() {
        setCount(count+1);
    }
    function handleMinus() {
        if(count > 0) {
            setCount(count-1);
        }
    }
    function handleCancelPeoplePopUP() {
        setSelectedCount(count);
        setPeopleModalVisible(false);
    }
    const formatPrice = (price:number) => {
        return new Intl.NumberFormat("ko-KR").format(price);
    };

    return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.wrap}>
                <TopTitle name="주문하기" onPress={handleBack} />

                <View style={styles.padding}></View>

                <View style={{width : '85%'}}>
                    <Text style={styles.labelText}>가게 요청사항</Text>
                    <TextInput 
                        placeholder="요청 입력"
                        placeholderTextColor="#484747"
                        value={requestText}
                        onChangeText={setRequestText}
                        style={styles.inputBox}
                    />
                    <View style={styles.checkWrap}>
                        <TouchableOpacity onPress={() => setChecked(!checked)}>
                            {
                            checked ? <CheckedBox/> : <UnCheckedBox/>
                            }
                        </TouchableOpacity>
                        <Text style={styles.checkboxText}>다음에도 사용</Text>
                    </View>
                    {selectedCount > 0 && (
                    <View style={styles.inputBox}>
                        <TouchableOpacity style={styles.temporal} onPress={handlePeoplePopUP}>
                            {
                            storeChecked ? 
                            <CheckedEclips /> : <Eclips />
                            }
                            <Text style={styles.mealType}>매장식사 • {selectedCount}명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextArrow} onPress={handlePeopleCountInitial}>
                            <Text style={styles.changePeopleCount}>변경하기</Text>
                            <NextArrow/>
                        </TouchableOpacity>
                    </View>
                    )}
                    {selectedCount == 0 && (
                        <View style={styles.inputBox}>
                            <TouchableOpacity style={styles.temporal} onPress={handlePeoplePopUP}>
                                <Eclips />
                                <Text style={styles.mealType}>매장식사</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.temporal} onPress={handlePickup}>
                                {
                                pickupChecked ? 
                                <CheckedEclips /> : <Eclips />
                                }
                                <Text style={styles.mealType}>픽업</Text>
                            </TouchableOpacity> 
                        </View>
                    )}
                </View>
                <TouchableOpacity style={{width :'85%'}}>
                    <Text style={styles.labelText}>할인쿠폰</Text>
                    <View style={styles.inputBox}>
                        <Text style={couponCount == 0 ? {color : '#A1A1A1'} : {color : '#1B1B1B'}}>{couponCount == 0 ? '사용 가능 0장' :`사용 가능 ${couponCount}장`}</Text>
                        <TouchableOpacity style={styles.nextArrow}>
                            <NextArrow/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={{width : '85%', height : '100%'}}>
                    <Text style={styles.labelText}>결제하기</Text>
                    <View style={styles.payInfo}>
                            <View style={styles.whiteBox}>
                                <Text style={styles.papaPoint}>패패오더 포인트</Text>
                                <View style={styles.textBox}>
                                    <Text style={styles.myPoint}>총 보유 포인트</Text>
                                    <Text style={styles.myPoint}>{`${formatPrice(userPoint)}P`}</Text>
                                </View>
                            </View>
                            <View style={styles.grayBox}>
                                <View style={styles.textBox}>
                                    <Text style={styles.payPoint}>결제예정 포인트</Text>
                                    <Text style={styles.payPoint}>{`${formatPrice(totalPrice)}P`}</Text>
                                </View>
                                <View style={styles.textBox}>
                                    <Text style={styles.remainPointText}>예상 포인트 잔액</Text>
                                    <Text style={styles.remainPoint}>{`${formatPrice(userPoint-totalPrice)}P`}</Text>
                                </View>
                            </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        <BottomButton name="결제하기" onPress={handleMoveReception} checked = {pickupChecked || (storeChecked && selectedCount > 0)} color="#1B1B1B"/>

        {/* 식사 인원 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={peopleModalVisible}
                onRequestClose={() => {
                    setPeopleModalVisible(!peopleModalVisible);
                }}>
                <View style={styles.peopleModalBackground}>
                    <View style={styles.peopleModalView}>
                        <View style={styles.peopleModalTopBox}>
                            <Text style={styles.peopleModalText}>매장 식사 인원 수</Text>
                            <View style={styles.count}>
                                <TouchableOpacity style={styles.countIcon} onPress={handleMinus}>
                                    <Minus />
                                </TouchableOpacity>
                                <Text style={styles.countText}>{count}</Text>
                                <TouchableOpacity style={styles.countIcon} onPress={handlePlus}>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.line}></View>
                        <TouchableOpacity style = {styles.peopleCountButton} onPress={handleCancelPeoplePopUP}>
                            <Text style={styles.peopleCountButtonText}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
    )
}   