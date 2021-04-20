import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { t } from '../../i18n/i18n';
import { RowLink } from '../row-link/row-link';

import { AddressRowLinkProps } from './address-row-link.props';

const addressIcon = require('../../assets/address-icon.png');

export const AddressRowLink = ({
  address,
  ...rowLinkProps
}: AddressRowLinkProps) => (
  <RowLink
    {...rowLinkProps}
    icon={addressIcon}
    text={address ? address : t('profile.addAddress')}
    textStyle={address ? [] : [s.negative]}
  />
);
