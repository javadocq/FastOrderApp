import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationProp, RouteProp } from '../navigation/NavigationProps';
import { useNavigation } from '@react-navigation/native';  // react-navigation hook
import FlashMessage, {showMessage} from 'react-native-flash-message';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

const FCMHandler: React.FC = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();  // 네비게이션 객체 가져오기

  useEffect(() => {
    // FCM 권한 요청 (iOS에서만)
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestPermission();

    // PushNotification 설정 (Android에서만 사용)
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // iOS에서 PushNotificationIOS 사용
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener(
        'notification',
        (notification: any) => {
          console.log('Received notification in iOS:', notification);
          Alert.alert(notification.getTitle(), notification.getBody());
        },
      );
    }

    // 안드로이드에서만 알림 채널 생성
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default_channel',
          channelName: 'Default Channel',
          channelDescription: 'Default channel for app notifications',
          soundName: 'default',
          vibrate: true,
        },
        (created: boolean) =>
          console.log(`createChannel returned '${created}'`),
      );
    }

    // 백그라운드 메시지 핸들러
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      
      const title = remoteMessage.notification?.title || 'Default Title';
      const body = remoteMessage.notification?.body || 'Default Body';

      // 상태바에 알림 표시 (Android에서만)
      if (Platform.OS === 'android') {
        PushNotification.localNotification({
          channelId: 'default_channel',
          title: title,
          message: body,
        });
      }
      console.log(remoteMessage);
      // 백그라운드에서는 Alert로만 표시 (FlashMessage는 포그라운드에서만 사용 가능)
      Alert.alert(title, body, [
        {
          text: 'OK',
          onPress: () => {
            // 알림 클릭 시 Reception 페이지로 이동
            if (remoteMessage.data && remoteMessage.data.order_no) {
              navigation.navigate('Reception', { orderId: Number(remoteMessage.data.order_no) });
            }
          }
        }
      ]);
    });

    // 포그라운드에서 메시지 수신
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title || 'Default Title';
      const body = remoteMessage.notification?.body || 'Default Body';

      // 상태바에 알림 표시 (Android에서만)
      if (Platform.OS === 'android') {
        PushNotification.localNotification({
          channelId: 'default_channel',
          title: title,
          message: body,
        });
      }
          
      showMessage({
        message: title,
        description: body,
        type: 'info',
        duration: 4000,
        onPress: () => {
          // FlashMessage 클릭 시 Reception 페이지로 이동
          if (remoteMessage.data && remoteMessage.data.order_no) {
            navigation.navigate('Reception', { orderId: Number(remoteMessage.data.order_no) });
          }
        }
      });

      // Alert.alert(title, body);
    });

    const getToken = async () => {
      console.log('Attempting to get FCM token...');
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    getToken();

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [navigation]);

  return <FlashMessage position="top" />;
};

export default FCMHandler;
