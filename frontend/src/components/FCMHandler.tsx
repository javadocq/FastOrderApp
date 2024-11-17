import React, {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import PushNotificationIOS from '@react-native-community/push-notification-ios'; // iOS에서 사용하는 PushNotificationIOS

let PushNotification; // 타입을 `any`로 설정 (임포트할 때 사용)

if (Platform.OS === 'android') {
  PushNotification = require('react-native-push-notification').default; // 수정된 부분
}

const FCMHandler: React.FC = () => {
  useEffect(() => {
    // PushNotification 설정 (Android에서만 사용)
    if (PushNotification) {
      PushNotification.configure({
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
        },
        requestPermissions: Platform.OS === 'ios',
      });
    }

    // iOS에서 PushNotificationIOS 사용
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('notification', notification => {
        console.log('Received notification in iOS:', notification);
        Alert.alert(notification.getTitle(), notification.getBody());
      });
    }

    // 안드로이드에서만 알림 채널 생성
    if (Platform.OS === 'android' && PushNotification) {
      PushNotification.createChannel(
        {
          channelId: 'default_channel',
          channelName: 'Default Channel',
          channelDescription: 'Default channel for app notifications',
          soundName: 'default',
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }

    // 백그라운드 메시지 핸들러
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      const title = remoteMessage.notification?.title || 'Default Title';
      const body = remoteMessage.notification?.body || 'Default Body';

      // 상태바에 알림 표시 (Android에서만)
      if (Platform.OS === 'android' && PushNotification) {
        PushNotification.localNotification({
          channelId: 'default_channel',
          title: title,
          message: body,
        });
      }

      Alert.alert(title, body);
    });

    // 포그라운드에서 메시지 수신
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title || 'Default Title';
      const body = remoteMessage.notification?.body || 'Default Body';

      // 상태바에 알림 표시 (Android에서만)
      if (Platform.OS === 'android' && PushNotification) {
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
      });

      Alert.alert(title, body);
    });

    // FCM 토큰 가져오기
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    getToken();

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  return <FlashMessage position="top" />;
};

export default FCMHandler;
