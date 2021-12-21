import React, { createContext, useEffect, useState } from 'react';
import { Notifications, Registered } from 'react-native-notifications';
import Intercom from '@intercom/intercom-react-native';

import { NotifictionProviderProps } from './notification-types';
import {
  requestNotificationPermissionHandler,
  checkPermissionsHandler,
} from './notification-handlers';

export const NotificationContext = createContext({});

export const NotificationProvider = ({
  children,
}: NotifictionProviderProps): JSX.Element => {
  const [registeredInIntercom, setRegisteredInIntercom] = useState(false);
  const [notificationToken, setNotificationToken] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    checkPermissionsHandler(setNotificationsEnabled);
  }, []);

  useEffect(() => {
    if (notificationsEnabled) {
      requestNotificationPermissionHandler();
      const subscription =
        Notifications.events().registerRemoteNotificationsRegistered(
          ({ deviceToken }: Registered) => {
            setNotificationToken(deviceToken);
            if (registeredInIntercom) {
              Intercom.sendTokenToIntercom(notificationToken);
            }
          },
        );

      return () => {
        subscription.remove();
      };
    } else {
      setNotificationToken('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsEnabled, registeredInIntercom]);

  return (
    <NotificationContext.Provider
      value={{
        notificationToken,
        notificationsEnabled,
        setNotificationsEnabled,
        setRegisteredInIntercom,
        requestNotificationPermission: requestNotificationPermissionHandler,
        cleanNotificationData: () => {
          setRegisteredInIntercom(false);
          setNotificationToken('');
          setNotificationsEnabled(false);
        },
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
