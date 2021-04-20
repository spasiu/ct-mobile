import { ImageSourcePropType } from 'react-native';

import { OverScreenModalProps } from '../../components';

export interface PaymentModalProps extends OverScreenModalProps {
  productImage: ImageSourcePropType;
  productTitle?: string;
  productDescription?: string;
  price?: string;
}
