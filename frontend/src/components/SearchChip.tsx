import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
/** Styles */
import styles from '../styles/SearchChip';
import { getSearch } from './SearchStorage';

interface SearchChipProps {
  setSearchText: (text: string) => void;
}

export default function SearchChip({ setSearchText }: SearchChipProps) {
    const [searches, setSearches] = useState<string[]>([]); 

    useEffect(() => {
        const fetchSearches = async () => {
            try { 
                const result = await getSearch(); // 검색어 배열 가져오기
                setSearches(result); // 검색어 배열 설정
            } catch (error) {
                console.error("Failed to fetch search data:", error);
            } 
        };
        fetchSearches();
    }, []);

    return (
        <View style={styles.container}>
            {searches.length > 0 ? (
                searches.map((search, index) => (
                    <TouchableOpacity key={index} style={styles.chipBox} onPress={() => setSearchText(search)}>
                        <Text>{search}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text>No recent searches</Text> // 검색어가 없을 때 메시지 표시
            )}
        </View>
    );
}
