import React from 'react';

import { t } from '../../i18n/i18n';
import { RowLink } from '../row-link';

import { AddressRowLinkProps } from './address-row-link.props';
import { errorTextStyle, addressIcon } from './address-row-link.presets';

export const AddressRowLink = ({
  address,
  ...rowLinkProps
}: AddressRowLinkProps): JSX.Element => (
  <RowLink
    {...rowLinkProps}
    icon={addressIcon}
    text={address ? address : t('profile.addAddress')}
    textStyle={address ? [] : errorTextStyle}
  />
);
