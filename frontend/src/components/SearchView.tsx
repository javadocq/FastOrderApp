import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
/** Components */
import SearchChip from '../components/SearchChip';
/** Styles */
import styles from '../styles/SearchView';

interface SearchViewProps {
  setSearchText: (text: string) => void;
}

export default function SearchView({ setSearchText }: SearchViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.recentTitle}>최근 검색어</Text>
      <View style={styles.chipGroup}>
        <SearchChip setSearchText={setSearchText}/>
      </View>
    </View>
  );
}
