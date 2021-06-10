export interface NotifictionProviderProps {
  children: React.ReactNode;
}

export type NotificationContextType = {
  requestNotificationPermission: () => Promise<boolean>;
};
