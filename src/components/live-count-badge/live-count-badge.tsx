import React from 'react';

import { Badge } from '../badge';

import { LiveCountBadgeProps } from './live-count-badge.props';
import { eyeIcon } from './live-count-badge.presets';

export const LiveCountBadge = ({
  count,
  ...badgeProps
}: LiveCountBadgeProps): JSX.Element => (
  <Badge image={eyeIcon} text={count} {...badgeProps} />
);
