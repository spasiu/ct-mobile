import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { range } from 'ramda';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import { indexedMap } from '../../utils/ramda';

const COLOR_OPTIONS = [
  '#F94144',
  '#F3722C',
  '#F8961E',
  '#F9844A',
  '#F9C74F',
  '#90BE6D',
  '#43AA8B',
  '#4D908E',
  '#577590',
  '#277DA1',
];

const IMAGE_OPTIONS = [
  require('../../assets/baseball-icon.png'),
  require('../../assets/basketball-icon.png'),
  require('../../assets/football-icon.png'),
  require('../../assets/soccer-icon.png'),
  require('../../assets/hockey-icon.png'),
  require('../../assets/baseball-icon.png'),
  require('../../assets/basketball-icon.png'),
  require('../../assets/football-icon.png'),
  require('../../assets/soccer-icon.png'),
  require('../../assets/hockey-icon.png'),
];

const ROWS_NUMBER = 4;
const COLUMNS_NUMBER = 4;
const REELS_REPEAT = 10;

const Symbol = ({ width, height, image }) => {
  return (
    <View style={[{ width, height }, s.bg_transparent, s.jcc, s.aic]}>
      <Image source={image} resizeMode={'contain'} style={[s.flx_i]} />
    </View>
  );
};

const Reel = ({ width, height, index }) => {
  const symbolHeight = height / ROWS_NUMBER;
  const spriteHeight = symbolHeight * COLOR_OPTIONS.length;

  const scrollPosition = useSharedValue(0);
  const translationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withTiming(scrollPosition.value, {
            duration: 500 + index * 100,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          REELS_REPEAT,
        ),
      },
    ],
  }));

  useEffect(() => {
    scrollPosition.value = -1 * symbolHeight * 5;
  });

  return (
    <View style={[s.no_overflow, { width, height }]}>
      <Animated.View
        style={[
          {
            width,
            height: spriteHeight,
          },
          translationStyle,
        ]}>
        {indexedMap((image, index) => {
          return (
            <Symbol
              key={`symbol-${index}`}
              width={width}
              height={symbolHeight}
              image={image}
              index={index}
            />
          );
        }, IMAGE_OPTIONS)}
      </Animated.View>
    </View>
  );
};

const ReelSet = () => {
  const [dimensions, setDimensions] = useState(undefined);
  return (
    <View
      style={[s.flx_i, s.flx_row]}
      onLayout={event =>
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }>
      {dimensions && (
        <>
          {indexedMap((data, index) => {
            return (
              <Reel
                key={`reel-${index}`}
                index={index}
                height={dimensions.height}
                width={dimensions.width / COLUMNS_NUMBER}
              />
            );
          }, range(0, COLUMNS_NUMBER))}
        </>
      )}
    </View>
  );
};

export const SlotMachine = () => {
  return (
    <View style={[s.flx_i, s.w_100]}>
      <ReelSet />
    </View>
  );
};