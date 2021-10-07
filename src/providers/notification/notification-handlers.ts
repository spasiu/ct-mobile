import { Notifications } from 'react-native-notifications';

export const requestNotificationPermissionHandler = (): void => {
  Notifications.registerRemoteNotifications();
};

export const checkPermissionsHandler = async (
  setPermission: (hasPermission: boolean) => void,
): Promise<void> => {
  const hasPermission = await Notifications.isRegisteredForRemoteNotifications();
  setPermission(hasPermission);
};
