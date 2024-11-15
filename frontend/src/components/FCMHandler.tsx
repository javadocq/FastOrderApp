import React, {useEffect} from 'react';
import {Alert, Platform, NativeModules} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import FlashMessage, {showMessage} from 'react-native-flash-message';
const {ScreenControl} = NativeModules;

const FCMHandler: React.FC = () => {
  useEffect(() => {
    // PushNotification 설정
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: 'default_channel',
        channelName: 'default channel',
        channelDescription: 'channel for app notifications',
        soundName: 'default',
        vibrate: true,
        importance: 4,
      },
      created => console.log(`createChannel returned '${created}'`),
    );

    // 화면을 켜는 함수 호출
    ScreenControl.turnScreenOn();

    // 백그라운드 메시지 핸들러
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      const title = remoteMessage.notification?.title || 'Default Title';
      const body = remoteMessage.notification?.body || 'Default Body';

      // 백그라운드에서 알림 표시
      PushNotification.localNotification({
        channelId: 'default_channel',
        title: title,
        message: body,
        priority: 'max', // 중요도 높은 알림
        importance: 'max', // 잠금화면에서 보이도록
        visibility: 'public', // 공용 (잠금화면에 보여짐)
        soundName: 'default',
        vibrate: true,
      });

      // FlashMessage는 포그라운드에서만 표시 가능하므로, Alert로 대체
      Alert.alert(title, body);
    });

    // 포그라운드에서 메시지 수신
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);

      const title = remoteMessage.notification?.title || 'Default Title';
      const body = remoteMessage.notification?.body || 'Default Body';

      // 상태바에 알림 표시
      PushNotification.localNotification({
        channelId: 'default_channel',
        title: title,
        message: body,
        priority: 'high', // 중요도 높은 알림
        importance: 'high', // 잠금화면에서 보이도록
        visibility: 'public', // 공용 (잠금화면에 보여짐)
        soundName: 'default',
        vibrate: true,
      });

      // FlashMessage로 알림 표시
      showMessage({
        message: title,
        description: body,
        type: 'info',
        duration: 4000,
      });

      // 필요시 Alert도 유지
      Alert.alert(title, body);
    });

    // FCM 토큰 가져오기
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    getToken();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      // 필요할 때 웨이크락 해제
      ScreenControl.releaseWakeLock();
      unsubscribe();
    };
  }, []);

  return <FlashMessage position="top" />;
};

export default FCMHandler;
