import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { repeat } from 'ramda';
import { FloatingDiamondsProps } from '../live-screen.props';

interface AnimationProps {
  children: React.ReactNode;
  left: boolean;
  delay: number;
  index?: number;
}

const SlowAnimation = ({
  children,
  left,
  delay,
}: AnimationProps): JSX.Element => {
  const floatingAnim = useSharedValue(0);

  const height = 70;
  useEffect(() => {
    floatingAnim.value = withDelay(
      delay,
      withTiming(1, { duration: 4000, easing: Easing.linear }, () => {
        floatingAnim.value = 0;
      }),
    );
  });

  return (
    <Animated.View
      style={[
        s.tc,
        { position: 'absolute', bottom: 68, right: -7 },
        useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateY: interpolate(
                  floatingAnim.value,
                  [0, 1],
                  [60, -height],
                ),
              },
              {
                translateX: interpolate(
                  floatingAnim.value,
                  [0, 0.5, 1],
                  [0, left ? 15 : -15, left ? -15 : 15],
                ),
              },
              {
                scale: 0.5,
              },
            ],
            opacity: interpolate(
              floatingAnim.value,
              [0, 0.1, 0.7, 1],
              [0, 0.8, 0.3, 0],
            ),
          };
        }),
      ]}>
      {children}
    </Animated.View>
  );
};

const FastAnimation = ({
  children,
  left,
  delay,
}: AnimationProps): JSX.Element => {
  const floatingAnim = useSharedValue(0);

  const height = 70;
  useEffect(() => {
    floatingAnim.value = withDelay(
      delay,
      withTiming(
        1,
        { duration: 1000, easing: Easing.bezier(0, 0, 0.58, 1) },
        () => {
          floatingAnim.value = 0;
        },
      ),
    );
  });

  const random = Math.floor(Math.random() * 30);

  return (
    <Animated.View
      style={[
        s.tc,
        { position: 'absolute', bottom: 68, right: -7 },
        useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateY: interpolate(
                  floatingAnim.value,
                  [0, 1],
                  [60, -height],
                ),
              },
              {
                translateX: interpolate(
                  floatingAnim.value,
                  [0, 1],
                  [0, left ? -random : random],
                ),
              },
              {
                scale: 0.3,
              },
            ],
            opacity: interpolate(
              floatingAnim.value,
              [0, 0.1, 0.7, 1],
              [0, 0.8, 0.7, 0],
            ),
          };
        }),
      ]}>
      {children}
    </Animated.View>
  );
};

export const FloatingDiamonds = ({
  large = 0,
  small = 0,
  _reanimate
}: FloatingDiamondsProps): JSX.Element => {
  const getDiamonds = (count: number) => {
    return repeat('r', count).map((_, index) => {
      return {
        left: index % 2 == 0,
      };
    });
  };

  return (
    <View
      style={{
        width: 34,
        height: 28,
        position: 'relative',
      }}>
      {getDiamonds(large).map((diamond, index) => {
        return (
          <SlowAnimation
            left={diamond.left}
            delay={index * 300}
            key={index.toString()}>
            <Image
              source={require('../../../assets/diamond.png')}
              style={{ width: 50, height: 50, zIndex: 2 }}
            />
          </SlowAnimation>
        );
      })}
      {getDiamonds(small).map((diamond, index) => {
        return (
          <FastAnimation
            left={diamond.left}
            delay={index * 100}
            key={index.toString()}
            index={index}>
            <Image
              source={require('../../../assets/diamond.png')}
              style={{ width: 50, height: 50, zIndex: 2 }}
            />
          </FastAnimation>
        );
      })}
    </View>
  );
};
