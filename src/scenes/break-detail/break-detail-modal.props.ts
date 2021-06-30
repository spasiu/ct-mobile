import { ImageSourcePropType } from 'react-native';

import { OverScreenModalProps } from '../../components';

export interface BreakDetailModalProps extends OverScreenModalProps {
  productImages: ImageSourcePropType[];
  productTitle?: string;
  productDescription?: string;
  price?: string;
}
