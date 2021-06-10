import React, { createContext } from 'react';

import { NotifictionProviderProps } from './notification-types';
import { requestNotificationPermissionHandler } from './notification-handlers';

export const NotificationContext = createContext({});

export const NotificationProvider = ({
  children,
}: NotifictionProviderProps): JSX.Element => {
  return (
    <NotificationContext.Provider
      value={{
        requestNotificationPermission: requestNotificationPermissionHandler,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
