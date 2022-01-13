import { MessageType, showMessage } from 'react-native-flash-message';
import { CtError, CtErrorCode } from './error';

export const displayError = (
  message: string,
  type: MessageType = 'default',
): void => {
  showMessage({
    message,
    type,
    hideOnPress: true,
    autoHide: true, // automatically dismiss message after 10 secs
    duration: 10000, // ms
  });
};

export const getFirebaseErrorCode = (error: unknown): CtErrorCode => {
  return isHttpsError(error)
    ? ((error as any).details.ct_error_code as CtErrorCode)
    : 'generic';

  function isHttpsError(error: unknown): Boolean {
    return 'details' in (error as any);
  }
};

export const handleError = (error: CtError): string => {
  const message = error.message || 'An error has occurred';
  console.error(
    'Error: ' + message,
    `\nCaused by:  ${error.cause?.name}\n`,
    error.cause?.stack,
  );
  // re-use 'none' MessageType to prevent display
  if (error.type !== 'none') displayError(message, error.type);
  return message;
};

export * from './error-selectors';
export * from './error';
