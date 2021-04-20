import React from 'react';
import { t } from '../../i18n/i18n';

import { Badge } from '../badge/badge';

import {
  TEXT_KEY_FOR_BREAK_TYPE,
  BADGE_CONTAINER_STYLE,
  BADGE_TEXT_STYLE,
} from './break-type-badge.presets';
import { BreakTypeBadgeProps } from './break-type-badge.props';

export const BreakTypeBadge = ({
  breakType = '',
  ...badgeProps
}: BreakTypeBadgeProps) => (
  <Badge
    {...badgeProps}
    text={t(TEXT_KEY_FOR_BREAK_TYPE[breakType])}
    containerStyle={BADGE_CONTAINER_STYLE}
    textStyle={BADGE_TEXT_STYLE}
  />
);
