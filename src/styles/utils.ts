import { PixelRatio } from 'react-native';

export const getRootRem = (): number => {
  const ratio: number = PixelRatio.get();

  if (ratio === 3) {
    return 15;
  }

  if (ratio >= 3.5) {
    return 16;
  }

  return 14;
};
