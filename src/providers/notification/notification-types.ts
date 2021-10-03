export interface NotifictionProviderProps {
  children: React.ReactNode;
}

export type NotificationContextType = {
  notificationToken: string;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setRegisteredInIntercom: (registed: boolean) => void;
  requestNotificationPermission: () => void;
  cleanNotificationData: () => void;
};
