import { ImageSourcePropType } from 'react-native';

import { CardTypes } from '../../common/payment';
import { t } from '../../i18n/i18n';

import {
  appleLogo,
  paymentIcon,
  masterIcon,
  visaIcon,
  googleLogo,
} from './payment-row-link.presets';
import { PaymentRowCardInfo, PaymentMethods } from './payment-row-link.props';

export const getRowIcon = (
  paymentMethod: keyof typeof PaymentMethods,
  cardInfo: PaymentRowCardInfo | undefined,
): ImageSourcePropType => {
  if (!hasValidPayment(paymentMethod, cardInfo)) {
    return paymentIcon;
  }

  if (paymentMethod === PaymentMethods.card) {
    const cardDetails = cardInfo as PaymentRowCardInfo;
    if (cardDetails.cardType === CardTypes.AM) {
      return paymentIcon;
    }

    if (cardDetails.cardType === CardTypes.VI) {
      return visaIcon;
    }

    if (cardDetails.cardType === CardTypes.MC) {
      return masterIcon;
    }
  }

  if (paymentMethod === PaymentMethods.apple) {
    return appleLogo;
  }

  if (paymentMethod === PaymentMethods.google) {
    return googleLogo;
  }

  return paymentIcon;
};

export const getRowText = (
  paymentMethod: keyof typeof PaymentMethods,
  cardInfo: PaymentRowCardInfo | undefined,
): string => {
  if (!hasValidPayment(paymentMethod, cardInfo)) {
    return t('payment.addPaymentDetails');
  }

  if (paymentMethod === PaymentMethods.card) {
    const cardDetails = cardInfo as PaymentRowCardInfo;
    return cardDetails.lastDigits;
  }

  if (paymentMethod === PaymentMethods.apple) {
    return t('payment.apple');
  }

  if (paymentMethod === PaymentMethods.google) {
    return t('payment.google');
  }

  return t('payment.addPaymentDetails');
};

export const hasValidPayment = (
  paymentMethod: keyof typeof PaymentMethods,
  cardInfo: PaymentRowCardInfo | undefined,
): boolean => {
  const invalid =
    !paymentMethod || (paymentMethod === PaymentMethods.card && !cardInfo);
  return !invalid;
};
