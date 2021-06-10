import { ImageStyle } from 'react-native';

import { IconButtonProps } from '../icon-button';

export enum FilterItemTypes {
  pill_default = 'pill_default',
  pill_alt = 'pill_alt',
  circle = 'circle',
}

export enum FilterItemStatusTypes {
  default = 'default',
  selected = 'selected',
}

export interface FilterItemProps extends IconButtonProps {
  type?: keyof typeof FilterItemTypes;
  status?: keyof typeof FilterItemStatusTypes;
  style?: ImageStyle[];
  text?: string;
}
