import AsyncStorage from '@react-native-async-storage/async-storage';

// ID 토큰 저장
export const setToken = async (token:string) => {
    try {
        await AsyncStorage.setItem('idToken', token);
    } catch (e) {
        console.error("Failed to save token:", e);
    }
};

// ID 토큰 가져오기
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('idToken');
        return token;
    } catch (e) {
        console.error("Failed to fetch token:", e);
    }
};
