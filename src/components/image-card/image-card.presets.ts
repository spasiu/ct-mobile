import { ViewStyle, ImageStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { ImageCardSizeTypes } from './image-card.props';

const CARD_SIZES = {
  [ImageCardSizeTypes.micro]: {
    height: sizes.h4,
    width: sizes.w3 + sizes.w2,
  },
  [ImageCardSizeTypes.small]: {
    height: sizes.h4 + sizes.h3,
    width: sizes.w4 + sizes.w1,
  },
  [ImageCardSizeTypes.medium]: {
    height: sizes.h5 + sizes.h2,
    width: sizes.w3 + sizes.w4 + sizes.w1,
  },
  [ImageCardSizeTypes.large]: {
    height: sizes.h5 + sizes.h4 + sizes.h2,
    width: sizes.w5 + sizes.w2,
  },
};

export const shadowContainerPreset = [s.shadow_m];

export const containerPreset = {
  [ImageCardSizeTypes.micro]: [
    CARD_SIZES.micro,
    s.br4,
    s.no_overflow,
  ] as ViewStyle[],
  [ImageCardSizeTypes.small]: [
    CARD_SIZES.small,
    s.br4,
    s.no_overflow,
  ] as ViewStyle[],
  [ImageCardSizeTypes.medium]: [
    CARD_SIZES.medium,
    s.br4,
    s.no_overflow,
  ] as ViewStyle[],
  [ImageCardSizeTypes.large]: [
    CARD_SIZES.large,
    s.br4,
    s.no_overflow,
  ] as ViewStyle[],
};

export const imageBackgroundPreset = [s.flx_i] as ImageStyle[];
