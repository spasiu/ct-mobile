import React from 'react';

import { t } from '../../i18n/i18n';
import { RowLink, RowLinkProps } from '../row-link';

import { appleLogo } from './payment-row-link.presets';

export const PaymentRowLink = (rowLinkProps: RowLinkProps): JSX.Element => (
  <RowLink {...rowLinkProps} icon={appleLogo} text={t('payment.apple')} />
);
