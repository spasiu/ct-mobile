import React from 'react';

import { t } from '../../i18n/i18n';
import { Badge } from '../badge';

import {
  badgeContainerPresets,
  badgeTextPresets,
  liveIcon,
} from './status-badge.presets';
import { StatusBadgeProps, StatusBadgeTypes } from './status-badge.props';
import { isStatusLive, isStatusScheduled } from './status-badge.utils';

export const StatusBadge = ({
  status = StatusBadgeTypes.live,
  text,
  ...badgeProps
}: StatusBadgeProps): JSX.Element | null => {
  const isLive = isStatusLive(status);
  const isScheduled = isStatusScheduled(status);
  return (
    <Badge
      {...badgeProps}
      containerStyle={badgeContainerPresets[status]}
      image={isLive && liveIcon}
      text={(isScheduled && text) || t(badgeTextPresets[status])}
    />
  );
};
