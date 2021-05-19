import { BadgeProps } from '../badge';

import { StatusBadgeTypes } from './status-badge.presets';

export interface StatusBadgeProps extends BadgeProps {
  status: StatusBadgeTypes;
  text?: string;
}
