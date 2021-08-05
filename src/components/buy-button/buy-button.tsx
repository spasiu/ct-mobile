import React from 'react';

import { ActionButton, ActionButtonTypes } from '../action-button';
import { t } from '../../i18n/i18n';

import { buttonStyle, textStyle } from './buy-button.presets';
import { BuyButtonProps } from './buy-button.props';

export const BuyButton = ({
  containerStyle = [],
  disabled = false,
  ...actionButtonProps
}: BuyButtonProps): JSX.Element => (
  <ActionButton
    buttonType={
      disabled ? ActionButtonTypes.disabled : ActionButtonTypes.primary
    }
    text={disabled ? t('buttons.soldOut') : t('buttons.buy')}
    {...actionButtonProps}
    style={[...buttonStyle, ...containerStyle]}
    textStyle={textStyle}
  />
);
