import { ViewStyle, ImageStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

const CARD_SIZES = {
  micro: {
    height: sizes.h4,
    width: sizes.w3 + sizes.w2,
  },
  small: {
    height: sizes.h4 + sizes.h3,
    width: sizes.w4 + sizes.w1,
  },
  medium: {
    height: sizes.h5 + sizes.h2,
    width: sizes.w3 + sizes.w4 + sizes.w1,
  },
  large: {
    height: sizes.h5 + sizes.h4 + sizes.h2,
    width: sizes.w5 + sizes.w2,
  },
};

export const SHADOW_CONTAINER_PRESET = [s.shadow_m];

export const CONTAINER_PRESET = {
  micro: [CARD_SIZES.micro, s.br4, s.no_overflow] as ViewStyle[],
  small: [CARD_SIZES.small, s.br4, s.no_overflow] as ViewStyle[],
  medium: [CARD_SIZES.medium, s.br4, s.no_overflow] as ViewStyle[],
  large: [CARD_SIZES.large, s.br4, s.no_overflow] as ViewStyle[],
};

export const IMAGE_BACKGROUND_PRESET = [s.flx_i] as ImageStyle[];

export type ImageCardSizeTypes = keyof typeof CARD_SIZES;
