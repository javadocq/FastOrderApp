import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
/** Styles */
import styles from '../styles/SearchChip';

export default function SearchChip() {
  return (
    <TouchableOpacity style={styles.chipBox}>
      <Text>마라미방</Text>
    </TouchableOpacity>
  );
}
