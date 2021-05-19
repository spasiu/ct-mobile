import React from 'react';
import { Image } from 'react-native';

import { ActionButton, ActionButtonTypes } from '../action-button';
import { t } from '../../i18n/i18n';

import {
  buttonStyle,
  textStyle,
  imageStyle,
  appleLogo,
} from './buy-button.presets';
import { BuyButtonProps } from './buy-button.props';

export const BuyButton = ({
  containerStyle = [],
  ...actionButtonProps
}: BuyButtonProps) => (
  <ActionButton
    buttonType={ActionButtonTypes.primary}
    text={t('buttons.buy')}
    {...actionButtonProps}
    style={[...buttonStyle, ...containerStyle]}
    textStyle={textStyle}>
    <Image style={imageStyle} source={appleLogo} />
  </ActionButton>
);
