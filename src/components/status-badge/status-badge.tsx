import React from 'react';

import { t } from '../../i18n/i18n';
import { Badge } from '../badge/badge';

import {
  BADGE_CONTAINER_PRESETS,
  BADGE_TEXT_PRESETS,
  isStatusLive,
} from './status-badge.presets';
import { StatusBadgeProps } from './status-badge.props';

const liveIcon = require('../../assets/live-icon.png');

export const StatusBadge = ({
  status = 'live',
  text,
  ...badgeProps
}: StatusBadgeProps) => {
  const isLive = isStatusLive(status);
  return (
    <Badge
      {...badgeProps}
      containerStyle={BADGE_CONTAINER_PRESETS[status]}
      image={isLive && liveIcon}
      text={text || t(BADGE_TEXT_PRESETS[status])}
    />
  );
};
