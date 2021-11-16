import { MessageType } from 'react-native-flash-message';
import { t } from '../../i18n/i18n';
import codes from '../../i18n/locales/en.json';

export const ERRORS_MAP = {
  CONSTRAINT_VIOLATION: 'constraint-violation',
};

export type CtErrorCode = keyof typeof codes.errors;

export class CtError extends Error {
  code: CtErrorCode;
  type: MessageType;
  cause?: Error;

  constructor(code: CtErrorCode, type: MessageType, cause?: unknown) {
    super(t(code));
    
    this.code = code;
    this.type = type;
    this.cause = (cause && cause instanceof Error) ? cause : new Error('UNKNOWN');
  }
}
