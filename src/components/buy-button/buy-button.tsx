import React from 'react';
import { Image } from 'react-native';

import { ActionButton, ActionButtonTypes } from '../action-button';
import { t } from '../../i18n/i18n';

import { BUTTON_STYLE, TEXT_STYLE, IMAGE_STYLE } from './buy-button.presets';
import { BuyButtonProps } from './buy-button.props';

const appleLogo = require('../../assets/apple-logo.png');

export const BuyButton = ({
  containerStyle = [],
  ...actionButtonProps
}: BuyButtonProps) => (
  <ActionButton
    buttonType={ActionButtonTypes.primary}
    text={t('buttons.buy')}
    {...actionButtonProps}
    style={[...BUTTON_STYLE, ...containerStyle]}
    textStyle={TEXT_STYLE}>
    <Image style={IMAGE_STYLE} source={appleLogo} />
  </ActionButton>
);
