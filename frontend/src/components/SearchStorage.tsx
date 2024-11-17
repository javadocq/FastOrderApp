import AsyncStorage from '@react-native-async-storage/async-storage';

//검색어 저장
export const setSearch = async (newSearch: string) => {
    try {
        // 기존 검색어 가져오기
        const existingSearches = await AsyncStorage.getItem('Search');
        const searches = existingSearches ? JSON.parse(existingSearches) : [];

        // 검색어가 3개 이상이면 가장 오래된 검색어(맨 뒤) 제거
        if (searches.length > 3) {
            searches.shift();
        }
        if(newSearch !== "") {
            searches.push(newSearch); // 배열에 새 검색어 추가
        }

        console.log("Searches Array:", searches); // 배열 상태 확인
        // 배열을 JSON으로 직렬화하여 저장
        await AsyncStorage.setItem('Search', JSON.stringify(searches));
    } catch (e) {
        console.error("Failed to save Search:", e);
    }
};

// 검색어 가져오기
export const getSearch = async (): Promise<string[]> => {
    try {
        const storedSearch = await AsyncStorage.getItem('Search');
        // 저장된 값이 있는 경우 JSON.parse() 시도
        if (storedSearch) {
            try {
                return JSON.parse(storedSearch); // 배열로 반환
            } catch (e) {
                console.error("Failed to parse stored Search:", e);
                return []; // 잘못된 데이터가 있으면 빈 배열 반환
            }
        }
        return []; // 저장된 값이 없으면 빈 배열 반환
    } catch (e) {
        console.error("Failed to fetch Search:", e);
        return []; // 예외 처리로 빈 배열 반환
    }
};
