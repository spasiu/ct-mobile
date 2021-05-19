import React from 'react';
import { Badge } from '../badge';

import { LiveCountBadgeProps } from './live-count-badge.props';

const eyeIcon = require('../../assets/eye-icon.png');

export const LiveCountBadge = ({
  count,
  ...badgeProps
}: LiveCountBadgeProps) => (
  <Badge image={eyeIcon} text={count} {...badgeProps} />
);
