import React, { useEffect, memo } from 'react';
import { Image } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { TeamShadowProps } from '../live-screen.props';

const TeamShadow = ({
  boxMargin,
  boxSize,
  rowIndex,
}: TeamShadowProps): JSX.Element => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      550 * rowIndex,
      withRepeat(
        withTiming(1, {
          duration: 250,
          easing: Easing.ease,
        }),
        30,
        true,
      ),
    );
  }, []);

  const shadowStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      <Animated.View
        style={[
          {
            right: -boxMargin * 2,
            left: -boxMargin * 2,
            bottom: 0,
            top: 0,
            position: 'absolute',
            opacity: 0,
          },
          shadowStyle,
        ]}>
        <Image
          source={require('../../../assets/glow.png')}
          style={{ width: '100%', height: '100%', zIndex: 0 }}
        />
      </Animated.View>
    </>
  );
};

export const AnimatedTeamShadow = memo(TeamShadow, () => true);
