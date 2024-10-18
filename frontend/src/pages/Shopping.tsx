import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { NavigationProp } from '../navigation/NavigationProps';
import styles from "../styles/Shopping";
import BackArrow from '../assets/icon_back_arrow.svg';
import BottomButton from "../components/BottomButton";

export default function Shopping({ navigation }: NavigationProp): React.JSX.Element {
    const [count, setCount] = useState(0);
    const orderMenu = [
        { name: '제육볶음', price: '7,000원', img: ''},
        { name: '김치찌개', price: '6,500원', img: ''},
        { name: '된장찌개', price: '6,000원', img: ''}
    ];

    function handleMinus() {
        if (count > 0) {
            setCount(count - 1);
        }
    }
    
    function handlePlus() {
        setCount(count + 1);
    }

    function handlePayPage() {
        navigation.navigate('Pay');
    }

    function handleBack() {
        navigation.navigate('Store');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.wrap}>
                    <View style = {styles.wrapper}>
                        <TouchableOpacity onPress={handleBack}>
                            <BackArrow />
                        </TouchableOpacity>
                        <Text style={styles.mainText}>장바구니</Text>
                    </View>
                    <View style={styles.padding}></View>
                    <Text style={styles.storeName}>찌개찌개 한양대 에리카 점</Text>
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
                                    <Text style={styles.menuName}>{item.name}</Text>
                                    <Text style={styles.menuPrice}>{item.price}</Text>
                                    <View style={styles.count}>
                                        <Text style={styles.countText} onPress={handleMinus}>-</Text>
                                        <Text style={styles.countText}>{count}</Text>
                                        <Text style={styles.countText} onPress={handlePlus}>+</Text>
                                    </View>
                                </View>
                                <View style={styles.menuImg}></View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <BottomButton name="28,000원 주문하기" onPress={handlePayPage}/>
        </SafeAreaView>
    );
}