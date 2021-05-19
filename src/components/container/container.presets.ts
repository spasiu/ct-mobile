import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Edge } from 'react-native-safe-area-context';

import { ContainerTypes } from './container.props';

export const backgroundColorPreset = s.bg_black_5;

export const stylePresets = {
  [ContainerTypes.scroll]: {
    safeAreaStyle: [s.jcfs, s.ais] as ViewStyle[],
    containerStyle: [s.h_100] as ViewStyle[],
    insetStyle: [s.mh4] as ViewStyle[],
  },
  [ContainerTypes.fixed]: {
    safeAreaStyle: [s.jcfs, s.ais, s.w_100, s.h_100] as ViewStyle[],
    containerStyle: [s.flx_i, s.h_100] as ViewStyle[],
    insetStyle: [s.mh4] as ViewStyle[],
  },
};

export const DEFAULT_SAFE_AREA_EDGES = [
  'top',
  'right',
  'bottom',
  'left',
] as Edge[];
