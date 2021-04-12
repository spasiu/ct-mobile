import { ImageStyle } from 'react-native';
import { IconButtonProps } from '../icon-button/icon-button.props';

import { FilterItemTypes, FilterItemStatusTypes } from './filter-item.presets';

export interface FilterItemProps extends IconButtonProps {
  type?: FilterItemTypes;
  status?: FilterItemStatusTypes;
  style?: ImageStyle[];
  text?: string;
}
