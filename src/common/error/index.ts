import { MessageType, showMessage } from 'react-native-flash-message';
import { t } from '../../i18n/i18n';

export * from './error-selectors';
export * from './error';

const classifyError = (
  error: unknown,
): { message: string; type: MessageType } => {
  const ctErrorCode =
    'details' in (error as any)
      ? (error as any).details.ct_error_code
      : undefined;

  if (ctErrorCode === 'purchase_no_longer_available') {
    return {
      message: t('errors.purchase_no_longer_available'),
      type: 'danger' as MessageType,
    };
  }

  // default
  return {
    message: t('errors.generic') || 'An error occured.',
    type: 'danger' as MessageType,
  };
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
  error: unknown,
  message: string | undefined = undefined,
  type: MessageType | undefined = undefined,
  showError = true,
): string => {
  const details = classifyError(error);
  message = message || details?.message;
  type = type || details?.type;
  console.error(error, (error as Error).stack); // log
  if (showError) displayError(message, type); // display to user
  return message;
};

export const handleErrorNoDisplay = (
  error: Error,
  message = undefined,
  type = undefined,
): string => handleError(error, message, type, false);
