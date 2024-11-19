import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, RouteProp } from '../navigation/NavigationProps';
import Plus from "../assets/icon_menu_plus.svg";
import Minus from "../assets/icon_menu_minus.svg";
import { BASE_URL } from "../consts/Url";
import styles from "../styles/Shopping";
import BottomButton from "../components/BottomButton";
import TopTitle from "../components/TopTitle";
import { setItem, getItem } from "../components/Cart";
import Cancel from "../assets/icon_cancel.svg";
import { getToken } from "../components/UserToken";

interface Option {
    Cost: number;
    Title: string;
}

interface Menu {
    Price: number;
    Title: string;
    image: string;
}

interface CartItem {
    Menu: Menu;
    Count: number;
    Price: number;
    Option: Option[];
    store_id?: number; // Optional field since it's only present in some items
}

type ShoppingProps = NavigationProp & RouteProp;

export default function Shopping({ navigation, route }: ShoppingProps): React.JSX.Element {
    const orderId = route.params?.orderId; 
    const [orderMenu, setOrderMenu] = useState<CartItem[]>([]);
    const [storeTitle, setStoreTitle] = useState<string>('');

    useEffect(() => {
        if (orderMenu.length === 0) {
            setStoreTitle("");
        }
    }, [orderMenu]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartItems = await getItem('cartItems');
                if (cartItems) {
                    setOrderMenu(JSON.parse(cartItems));
                }
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };

        if (route.params?.orderId) {
            // order_id가 있으면 해당 주문 정보를 가져옴
            fetchOrderDetails(route.params.orderId);
            
        } else {
            // order_id가 없으면 장바구니에서 항목을 가져옴
            fetchCartItems();
        }
    }, []);

    useEffect(() => {
        const getFetchMenu = async () => {
            if (orderMenu.length > 0 && orderMenu[0].store_id) {
                try {
                    const token = await getToken();
                    const response = await axios.get(`${BASE_URL}/stores/id/${orderMenu[0].store_id}?token=${token}`);
                    setStoreTitle(response.data.store_data.store_name);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching menu info:", error);
                }
            }
        };
        getFetchMenu();
    }, [orderMenu]); 

    const fetchOrderDetails = async (order_id: number) => {
        console.log(order_id);
        try {
            const token = await getToken();
            const response = await axios.get(`${BASE_URL}/user/oneOrderHistory`, {
                params: {
                    token: token,
                    order_id: order_id
                }
            });

            const  order_data  = response.data.items;

            setOrderMenu(order_data);
            setStoreTitle(response.data.store_name); // 주문의 가게 이름
        } catch (error) {
            console.error("주문 정보 가져오기 실패:", error);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ko-KR").format(price);
    };

    const updateCartItems = async (updatedMenu: CartItem[]) => {
        await setItem('cartItems', JSON.stringify(updatedMenu));
    };

    const deleteCartItems = (index: number) => {
        setOrderMenu(prevMenu => {
            const newMenu = prevMenu.filter((_, i) => i !== index);
            updateCartItems(newMenu);
            return newMenu;
        });
    };

    const totalPrice = orderMenu.reduce((total, item) => {
        const itemPrice = typeof item.Price === 'number' ? item.Price : 0;
        return total + itemPrice;
    }, 0);

    const handleMinus = (index: number) => {
        setOrderMenu(prevMenu => {
            const newMenu = [...prevMenu];
            if (newMenu[index].Count > 1) {
                newMenu[index].Count--;
                newMenu[index].Price = (newMenu[index].Price / (newMenu[index].Count + 1)) * newMenu[index].Count;
            }
            updateCartItems(newMenu);
            return newMenu;
        });
    };

    const handlePlus = (index: number) => {
        setOrderMenu(prevMenu => {
            const newMenu = [...prevMenu];
            newMenu[index].Count++;
            newMenu[index].Price = (newMenu[index].Price / (newMenu[index].Count - 1)) * newMenu[index].Count;
            updateCartItems(newMenu);
            return newMenu;
        });
    };

    const handlePayPage = () => {
        navigation.navigate('Pay', { orderId });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.wrap}>
                    <TopTitle name="장바구니" onPress={handleBack} />
                    <View style={styles.padding}></View>
                    <Text style={styles.storeName}>{storeTitle}</Text>
                    <View style={styles.menuBox}>
                        {orderMenu.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.orderMenu,
                                    index < orderMenu.length - 1 ? styles.withSeparator : styles.withoutSeparator
                                ]}
                            >
                                <View>
                                    <Text style={styles.menuName}>{item.Menu.Title}</Text>
                                    <Text style={styles.menuDetails}>{`가격 : 1인분 (${formatPrice(item.Menu.Price)}원)`}</Text>
                                    <Text style={styles.menuPrice}>{formatPrice(item.Price)}원</Text>
                                    <View style={styles.count}>
                                        <TouchableOpacity style={styles.countIcon} onPress={() => handleMinus(index)}>
                                            <Minus />
                                        </TouchableOpacity>
                                        <Text style={styles.countText}>{item.Count}</Text>
                                        <TouchableOpacity style={styles.countIcon} onPress={() => handlePlus(index)}>
                                            <Plus />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.menuImg}>
                                    <Image source={{ uri: item.Menu.image }} style={{ height: '100%', width: '100%' }} />
                                </View>
                                <TouchableOpacity style={styles.cancel} onPress={() => deleteCartItems(index)}>
                                    <Cancel />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <BottomButton name={`${formatPrice(totalPrice)}원 담기`} onPress={handlePayPage} checked={orderMenu.length > 0} color="#EC424C" />
        </SafeAreaView>
    );
}
