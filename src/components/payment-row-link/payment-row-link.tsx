import React from 'react';

import { RowLink } from '../row-link';

import { PaymentRowLinkProps } from './payment-row-link.props';
import {
  getRowIcon,
  getRowText,
  hasValidPayment,
} from './payment-row-link.utils';
import { warningTextStyle } from './payment-row-link.presets';

export const PaymentRowLink = ({
  paymentMethod,
  cardInfo,
  ...rowLinkProps
}: PaymentRowLinkProps): JSX.Element => (
  <RowLink
    {...rowLinkProps}
    textStyle={hasValidPayment(paymentMethod, cardInfo) ? [] : warningTextStyle}
    icon={getRowIcon(paymentMethod, cardInfo)}
    text={getRowText(paymentMethod, cardInfo)}
  />
);
