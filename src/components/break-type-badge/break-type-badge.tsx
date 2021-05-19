import React from 'react';
import { t } from '../../i18n/i18n';

import { Badge } from '../badge';

import {
  textKeyForBreakType,
  badgeContainerStyle,
  badgeTextStyle,
} from './break-type-badge.presets';
import { BreakTypeBadgeProps } from './break-type-badge.props';

export const BreakTypeBadge = ({
  breakType,
  ...badgeProps
}: BreakTypeBadgeProps) => (
  <Badge
    {...badgeProps}
    text={t(textKeyForBreakType[breakType])}
    containerStyle={badgeContainerStyle}
    textStyle={badgeTextStyle}
  />
);
