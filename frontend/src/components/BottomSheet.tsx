import React, {useState} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
/** Components */
import OrderHistory from '../components/OrderHistory';
import StoreInfo from '../components/StoreInfo';
import {useFocusEffect} from '@react-navigation/native';

import {NavigationProp} from '../navigation/NavigationProps';
import styles from '../styles/BottomSheet';
import {HOME} from '../consts/BottomSheetConsts';

const LIST_ITEM_HEIGHT = HOME.LIST_ITEM_HEIGHT;
const HANDLE_HEIGHT = HOME.HANDLE_HEIGHT;

interface CombinedInterface extends NavigationProp {
  storeId: number | null;
}

export default function BottomSheet({
  navigation,
  storeId: parentStoreId,
}: CombinedInterface): React.JSX.Element {
  const MAX_HEIGHT = LIST_ITEM_HEIGHT * 2.4; // 최상단 높이
  const MID_HEIGHT = LIST_ITEM_HEIGHT; // 중간 높이
  const MIN_HEIGHT = HANDLE_HEIGHT; // 최하단 높이

  const heightValue = useSharedValue(MID_HEIGHT); // 초기 높이 설정
  const [storeId, setStoreId] = useState<number | null>(null); // 내부 storeId 상태

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightValue.value,
    };
  });

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const translationY = event.nativeEvent.translationY;
    const dragFactor = 0.2; // 드래그 반응 비율 조정
    const newHeight = heightValue.value - translationY * dragFactor;

    if (newHeight > MAX_HEIGHT) {
      heightValue.value = MAX_HEIGHT;
    } else if (newHeight < MIN_HEIGHT) {
      heightValue.value = MIN_HEIGHT;
    } else {
      heightValue.value = newHeight; // 높이 업데이트
    }
  };

  const handleGestureEnd = () => {
    if (heightValue.value > MAX_HEIGHT - 100) {
      heightValue.value = withTiming(MAX_HEIGHT, {duration: 100});
    } else if (heightValue.value > MID_HEIGHT - 150) {
      heightValue.value = withTiming(MID_HEIGHT, {duration: 100});
    } else {
      heightValue.value = withTiming(MIN_HEIGHT, {duration: 100});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // 화면이 포커스를 받을 때 storeId를 0으로 설정
      setStoreId(0);
    }, []),
  );

  // 부모 컴포넌트에서 storeId가 변경될 때마다 상태 업데이트
  React.useEffect(() => {
    if (parentStoreId) {
      setStoreId(parentStoreId);
    }
  }, [parentStoreId]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sheet, animatedStyle]}>
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onEnded={handleGestureEnd}>
          <View style={styles.handleBox}>
            <View style={styles.handle} />
          </View>
        </PanGestureHandler>
        {storeId === 0 ? (
          <OrderHistory navigation={navigation} />
        ) : (
          <StoreInfo navigation={navigation} storeId={storeId} />
        )}
      </Animated.View>
    </View>
  );
}
