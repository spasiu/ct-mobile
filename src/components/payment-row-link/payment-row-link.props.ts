import { CardTypes } from '../../common/payment';

import { RowLinkProps } from '../row-link';

export enum PaymentMethods {
  apple = 'apple',
  google = 'google',
  card = 'card',
}

export type PaymentRowCardInfo = {
  lastDigits: string;
  cardType: keyof typeof CardTypes;
};

export interface PaymentRowLinkProps extends RowLinkProps {
  paymentMethod: keyof typeof PaymentMethods;
  cardInfo?: PaymentRowCardInfo;
}
