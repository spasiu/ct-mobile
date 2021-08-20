import messaging from '@react-native-firebase/messaging';

export const requestNotificationPermissionHandler = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  } catch (e) {
    return false;
  }
};
