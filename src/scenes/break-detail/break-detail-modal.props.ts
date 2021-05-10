import { ImageSourcePropType } from 'react-native';

import { OverScreenModalProps } from '../../components';

export interface BreakDetailModalProps extends OverScreenModalProps {
  productImage: ImageSourcePropType;
  productTitle?: string;
  productDescription?: string;
  price?: string;
}
