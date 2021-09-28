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
} from 'react-native-reanimated';

import { TeamRandomizerProps } from '../live-screen.props';
import Svg, { Text, Defs, LinearGradient, Rect, Stop, TSpan } from 'react-native-svg';
// import { ServerImage } from '../../../components/server-image/server-image';
// import { BreakResultItem } from '../../../common/break/break';

const Randomizer = ({
  allTeams,
  result,
  boxSize,
  boxMargin
}: TeamRandomizerProps): JSX.Element => {
  const scrollPosition = useSharedValue(allTeams.length * (boxSize + (boxMargin * 2)) * -1);

  useEffect(() => {
    // scrollPosition.value = withRepeat(withTiming(allTeams.length * boxSize * -1, {
    //   duration: allTeams.length * 130,
    //   easing: Easing.linear,
    // }, () => {
    //   // console.log('loop finished')
    // }), 10, false, () => {})
    scrollPosition.value = withDelay(0, withRepeat(
        withTiming(0, {
        duration: 700,
        easing: Easing.linear,
      }
    ), 5))
  }, [])

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollPosition.value
        },
      ],
    }
  })

  return (
    <>
      <View
        style={[
          {
            width: boxSize + boxMargin * 2,
            height: boxSize + boxMargin * 2,
            zIndex: 1,
            overflow: 'hidden'
          }
        ]
      }>
        <View style={{ position: 'absolute', left: boxMargin}}>
          <Animated.View
            style={[
              s.jcse, s.aic, s.flex_col,
              {
                height: (allTeams.length * boxSize) + (allTeams.length * boxMargin),
              },
              animationStyle
            ]}
          >
            {
              allTeams.concat(allTeams[0]).map((team, index: number) => {
                return (
                  <View
                    style={[
                      // s.ba,
                      // s.b__white,
                      {
                        height: boxSize,
                        width: boxSize - 1,
                        marginVertical: boxMargin
                      }
                    ]}
                    key={index.toString()}
                  >
                    <Svg height={boxSize} width={boxSize}>
                      <Defs>
                        <LinearGradient id="defaultUnits" x1="0%" y1="0%" x2="0%" y2="100%">
                          <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
                          <Stop offset="100%" stopColor="#ff0" stopOpacity="1" />
                        </LinearGradient>
                      </Defs>
                      <Defs>
                        <LinearGradient id="defaultUnitsDark" x1="0%" y1="0%" x2="0%" y2="100%">
                          <Stop offset="0%" stopColor="red" stopOpacity="1" />
                          <Stop offset="100%" stopColor="#ff0" stopOpacity="1" />
                        </LinearGradient>
                      </Defs>
                      <Rect
                        fill="url(#defaultUnits)"
                        x="0"
                        y="0"
                        width={boxSize - 3}
                        height={6}
                        rx="3"
                        ry="3"
                      />
                      <Defs>
                        <LinearGradient id="text-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <Stop offset="0%" stopColor="white" stopOpacity="0.5" />
                          <Stop offset="100%" stopColor="red" stopOpacity="1" />
                        </LinearGradient>
                      </Defs>
                      <Text
                        stroke="url(#text-stroke-grad)"
                        strokeWidth="2"
                        fill="none"
                        fontSize="16"
                        fontWeight="bold"
                        x={boxSize / 2 - 2}
                        y={boxSize / 2 + 6}
                      >
                        <TSpan textAnchor="middle">{[team.shorthand]}</TSpan>
                      </Text>
                      <Rect
                        fill="url(#defaultUnitsDark)"
                        x="0"
                        y={boxSize - 6}
                        width={boxSize - 3}
                        height={6}
                        rx="3"
                        ry="3"
                      />
                    </Svg>
                  </View>
                )
              })
            }
          </Animated.View>
        </View>
      </View>
    </>
  );
};

export const TeamRandomizer = memo(Randomizer, (nextProps, prevProps) => {
  return true;
});
