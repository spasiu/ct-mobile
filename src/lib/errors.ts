import { MessageType, showMessage } from 'react-native-flash-message';
import { t } from '../i18n/i18n';

const classifyError = (
  error: Error,
): { message: string; type: MessageType } => {
  switch (error) {
    // add more cases
    default:
      return {
        message: t('errors.generic') || 'An error occured.',
        type: 'danger' as MessageType,
      };
  }
};

const displayError = (message: string, type: MessageType) => {
  showMessage({
    message,
    type,
    hideOnPress: true,
    autoHide: true, // automatically dismiss message after 10 secs
    duration: 10000, // ms
  });
};

export const handleError = (
  error: Error,
  message: string | undefined = undefined,
  type: MessageType | undefined = undefined,
) => {
  const details = classifyError(error);
  message = message || details?.message;
  type = type || details?.type;
  displayError(message, type);
  console.error(error, JSON.stringify(Object.keys(error), null, 4));
};
