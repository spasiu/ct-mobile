import { BadgeProps } from '../badge';

export enum StatusBadgeTypes {
  live = 'live',
  upcoming = 'upcoming',
  scheduled = 'scheduled',
  completed = 'completed',
  upNext = 'upNext'
}
export interface StatusBadgeProps extends BadgeProps {
  status: keyof typeof StatusBadgeTypes;
  text?: string;
}
