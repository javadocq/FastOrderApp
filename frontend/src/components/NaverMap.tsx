import React from 'react';
import {StyleSheet, View, Dimensions, SafeAreaView} from 'react-native';
import {
  NaverMapView,
  NaverMapMarkerOverlay,
} from '@mj-studio/react-native-naver-map';
import {NavigationProp} from '../navigation/NavigationProps';
/** Styles */
import styles from '../styles/NaverMap';

interface Coord {
  latitude: number;
  longitude: number;
}

interface Region {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

interface Store {
  no: number;
  store_name: string;
  store_type: string;
  latitude: string;
  longitude: string;
  store_status: string;
}

interface StoreProp {
  stores: Store[]; // stores prop 정의
}

interface CombinedInterface extends NavigationProp, StoreProp {
  onMarkerPress: (storeId: number) => void;
}

/** Markers */
const CafeMarker = require('../assets/marker_cafe.png');
const KoreaMarker = require('../assets/marker_korea.png');
const JapanMarker = require('../assets/marker_japan.png');
const ChinaMarker = require('../assets/marker_china.png');
const WesternMarker = require('../assets/marker_western.png');
const EtcMarker = require('../assets/marker_etc.png');

const GrayCafeMarker = require('../assets/gray_marker_cafe.png');
const GrayKoreaMarker = require('../assets/gray_marker_korea.png');
const GrayJapanMarker = require('../assets/gray_marker_japan.png');
const GrayChinaMarker = require('../assets/gray_marker_china.png');
const GrayWesternMarker = require('../assets/gray_marker_western.png');
const GrayEtcMarker = require('../assets/gray_marker_etc.png');

export default function NaverMap({
  navigation,
  stores,
  onMarkerPress,
}: CombinedInterface): React.JSX.Element {
  const handleStore = () => {
    navigation.navigate('Store');
  };

  const initialRegion: Region = {
    latitude: 37.297509529215484,
    longitude: 126.83672336012268,
    latitudeDelta: 0.004, // 위도 방향
    longitudeDelta: 0.002, // 경도 방향
  };

  const getMarkerImage = (storeType: string) => {
    switch (storeType) {
      case '한식':
        return KoreaMarker;
      case '일식':
        return JapanMarker;
      case '중식':
        return ChinaMarker;
      case '양식':
        return WesternMarker;
      case '카페':
        return CafeMarker;
      default:
        return EtcMarker; // 기본적으로 카페 마커
    }
  };

  const getGrayMarkerImage = (storeType: string) => {
    switch (storeType) {
      case '한식':
        return GrayKoreaMarker;
      case '일식':
        return GrayJapanMarker;
      case '중식':
        return GrayChinaMarker;
      case '양식':
        return GrayWesternMarker;
      case '카페':
        return GrayCafeMarker;
      default:
        return GrayEtcMarker; // 기본적으로 카페 마커
    }
  };

  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.mapContainer}
        isShowLocationButton={true}
        initialRegion={initialRegion}>
        {stores.map(store => (
          <NaverMapMarkerOverlay
            key={store.no}
            latitude={parseFloat(store.latitude)}
            longitude={parseFloat(store.longitude)}
            width={store.store_status === 'Open' ? 44 : 32}
            height={store.store_status === 'Open' ? 48 : 36}
            image={
              store.store_status == 'Open'
                ? getMarkerImage(store.store_type)
                : getGrayMarkerImage(store.store_type)
            }
            onTap={() => onMarkerPress(store.no)}
          />
        ))}
      </NaverMapView>
    </View>
  );
}
