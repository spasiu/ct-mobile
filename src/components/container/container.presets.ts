import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { isIos } from '../../utils/platform';

export const backgroundColorPreset = s.bg_black_10;

export const stylePresets = {
  scroll: {
    safeAreaStyle: [s.jcfs, s.ais] as ViewStyle[],
    containerStyle: [s.h_100] as ViewStyle[],
    insetStyle: [s.mh4] as ViewStyle[],
  },
  fixed: {
    safeAreaStyle: [s.jcfs, s.ais, s.w_100, s.h_100] as ViewStyle[],
    containerStyle: [s.flx_i, s.h_100] as ViewStyle[],
    insetStyle: [s.mh4] as ViewStyle[],
  },
};

export const keyboardAvoidingViewBehaviour = isIos ? 'padding' : 'height';

export type ContainerTypes = keyof typeof stylePresets;

export const DEFAULT_CONTAINER_TYPE = 'scroll';

export const isFixed = (type: ContainerTypes) => {
  return type === 'fixed';
};
