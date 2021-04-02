import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { isIos } from '../../utils/platform';

export const backgroundColorPreset = s.bg_mercury;

export const viewPreset = {
  style: [s.flx_i, s.h_100] as ViewStyle[],
  insetStyle: [s.mh4] as ViewStyle[],
};

export const safeAreaPreset = {
  scroll: {
    style: [s.jcfs, s.ais] as ViewStyle[],
  },
  fixed: {
    style: [s.jcfs, s.ais, s.w_100, s.h_100] as ViewStyle[],
  },
};

export const keyboardAvoidingViewBehaviour = isIos ? 'position' : 'height';

export type ContainerTypes = keyof typeof safeAreaPreset;

export const DEFAULT_CONTAINER_TYPE = 'scroll';

export const isFixed = (type: ContainerTypes) => {
  return type === 'fixed';
};
