import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import Animated, {
  Easing,
  withRepeat,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { TeamRandomizerProps } from '../live-screen.props';
import { BreakTeam } from '../../../components/break-team';
import { playSound } from '../../../utils/sound';
import { COLORS } from '../../../theme/colors';

const Randomizer = ({
  allTeams,
  result,
  isReady,
  boxSize,
  boxMargin,
  rowIndex,
  teamIndex,
  columnIndex,
  preloadTeams
}: TeamRandomizerProps): JSX.Element => {
  const scrollPosition = useSharedValue(
    allTeams.length * (boxSize + boxMargin * 2) * -1,
  );
  const outerOpacity = useSharedValue(0);
  const innerOpacity = useSharedValue(1);
  const resultScale = useSharedValue(0);

  useEffect(() => {
    if (isReady) {
      scrollPosition.value = withDelay(
        rowIndex * 550,
        withRepeat(
          withTiming(0, {
            duration: 1000,
            easing: Easing.linear,
          }),
          5,
          false,
          () => {
            innerOpacity.value = 0;

            if (columnIndex == 0 && teamIndex === 0) {
              runOnJS(playSound)('drop1');
            }
            if (columnIndex == 0 && teamIndex === 1) {
              runOnJS(playSound)('drop2');
            }
            if (columnIndex == 0 && teamIndex === 2) {
              runOnJS(playSound)('drop3');
            }

            resultScale.value = withTiming(0.7, {
              duration: 200,
              easing: Easing.ease,
            });
          },
        ),
      );
      outerOpacity.value = withDelay(
        rowIndex * 550,
        withTiming(1, { duration: 0 }),
      );
    }
  }, [isReady]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollPosition.value,
        },
      ],
      opacity: innerOpacity.value,
    };
  });

  const resultAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            resultScale.value,
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
            [0, 0.3, 0.7, 1.3, 1, 0.8, 0.9, 1],
          ),
        },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: outerOpacity.value,
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            width: boxSize + boxMargin * 2,
            height: boxSize + boxMargin * 4,
            zIndex: 1,
            borderColor: COLORS.transparent,
          },
          s.ba,
          s.no_overflow,
          containerStyle,
        ]}>
        {(isReady || preloadTeams) && (
          <View
            style={{
              position: 'absolute',
              left: boxMargin,
              alignSelf: 'center',
            }}>
            <Animated.View
              style={[
                s.jcse,
                s.aic,
                s.flex_col,
                {
                  height:
                    allTeams.length * boxSize + allTeams.length * boxMargin,
                },
                animationStyle,
              ]}>
              {allTeams.concat(allTeams[0]).map((team, index: number) => {
                return (
                  <View
                    style={[
                      {
                        height: boxSize,
                        width: boxSize,
                        marginVertical: boxMargin,
                      },
                    ]}
                    key={index.toString()}>
                    <BreakTeam {...team} boxSize={boxSize} />
                  </View>
                );
              })}
            </Animated.View>

            {
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    height: boxSize,
                    width: boxSize,
                    marginTop: boxMargin * 2,
                  },
                  resultAnimationStyle,
                ]}>
                <BreakTeam {...result} boxSize={boxSize} />
              </Animated.View>
            }
          </View>
        )}
      </Animated.View>
    </>
  );
};

export const TeamRandomizer = memo(Randomizer, (prevProps, nextProps) => {
  if (prevProps.isReady === false && nextProps.isReady === true) return false;
  return true;
});
