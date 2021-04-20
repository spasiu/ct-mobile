import React from 'react';

import { t } from '../../i18n/i18n';
import { RowLink } from '../row-link/row-link';
import { RowLinkProps } from '../row-link/row-link.props';

const appleLogo = require('../../assets/apple-logo.png');

export const PaymentRowLink = (rowLinkProps: RowLinkProps) => (
  <RowLink {...rowLinkProps} icon={appleLogo} text={t('payment.apple')} />
);
