import React, { createContext, useEffect, useState } from 'react';
import { Notifications, Registered } from 'react-native-notifications';
import Intercom from '@intercom/intercom-react-native';
import { NotifictionProviderProps } from './notification-types';

export const NotificationContext = createContext({});

export const NotificationProvider = ({
  children,
}: NotifictionProviderProps): JSX.Element => {
  const [registeredInIntercom, setRegisteredInIntercom] = useState(false);

  const requestNotificationPermission = (): void => {
    Notifications.registerRemoteNotifications();
  };

  useEffect(() => {
    const subscription =
        Notifications.events().registerRemoteNotificationsRegistered(
          ({ deviceToken }: Registered) => {
            if (registeredInIntercom) {
              Intercom.sendTokenToIntercom(deviceToken);
            }
          }
        );
      
    return () => subscription.remove();
  }, [registeredInIntercom]);

  useEffect(() => {
    Notifications.isRegisteredForRemoteNotifications()
      .then((isRegistered:boolean) => {
        if (isRegistered) Notifications.registerRemoteNotifications()
      });
  }, [registeredInIntercom]);

  return (
    <NotificationContext.Provider
      value={{
        setRegisteredInIntercom,
        requestNotificationPermission: requestNotificationPermission,
        cleanNotificationData: () => {
          setRegisteredInIntercom(false);
        },
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
