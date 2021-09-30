import React, { useEffect, memo } from 'react';
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
  rowIndex
}: TeamShadowProps): JSX.Element => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 0.5;
  }, []);

  return (
    <>
      <Animated.View
          style={[{
            borderWidth: 5,
            right: boxMargin/2 - 3,
            left: -boxMargin/2 - 3,
            shadowColor: 'white',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            bottom: boxMargin / 2 - 2,
            top: boxMargin / 2 - 2,
            borderColor: 'white',
            borderRadius: boxSize / 5,
            position: 'absolute',
            opacity: 0
          },
          useAnimatedStyle(() => ({
            opacity: withDelay(350 * rowIndex, withRepeat(withTiming(opacity.value, {
              duration: 250,
              easing: Easing.linear,
            }), 30, true))
          }))
        ]}
      />
    </>
  )
}

export const AnimatedTeamShadow = memo(TeamShadow, () => true)