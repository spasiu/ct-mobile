import React from 'react';
import { Text } from 'react-native';
import { sizes } from 'react-native-style-tachyons';
import RNTooltip from 'rn-tooltip';

import { tooltipBackgroundColor, textStyle } from './tooltip.presets';
import { TooltipProps } from './tooltip.props';

export const Tooltip = ({
  children = null,
  text = '',
  enabled = true,
}: TooltipProps): JSX.Element => {
  return (
    <RNTooltip
      height={sizes.h4}
      width={sizes.w4 + sizes.w4}
      backgroundColor={tooltipBackgroundColor}
      actionType={enabled ? 'press' : 'none'}
      withOverlay={false}
      popover={<Text style={textStyle}>{text}</Text>}>
      {children}
    </RNTooltip>
  );
};
