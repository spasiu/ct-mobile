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
  runOnJS
} from 'react-native-reanimated';
import Sound from 'react-native-sound';

import { TeamRandomizerProps } from '../live-screen.props';
import Svg, {
  Text,
  Defs,
  LinearGradient,
  Rect,
  Stop,
  TSpan,
} from 'react-native-svg';
// import { ServerImage } from '../../../components/server-image/server-image';
// import { BreakResultItem } from '../../../common/break/break';

function playDrop1() {
  let entryMusic = new Sound('drop_1.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    entryMusic.play(success => {
      if (success) {
        // console.log('successfully finished playing');
      } else {
        // console.log('playback failed due to audio decoding errors');
      }
    });
  });
}
function playDrop2() {
  let entryMusic = new Sound('drop_2.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    entryMusic.play(success => {
      if (success) {
        // console.log('successfully finished playing');
      } else {
        // console.log('playback failed due to audio decoding errors');
      }
    });
  });
}
function playDrop3() {
  let entryMusic = new Sound('drop_3.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    entryMusic.play(success => {
      if (success) {
        // console.log('successfully finished playing');
      } else {
        // console.log('playback failed due to audio decoding errors');
      }
    });
  });
}

const Randomizer = ({
  allTeams,
  result,
  display,
  boxSize,
  boxMargin,
  rowIndex,
  teamIndex,
  columnIndex
}: TeamRandomizerProps): JSX.Element => {
  const scrollPosition = useSharedValue(
    allTeams.length * (boxSize + boxMargin * 2) * -1,
  );
  const outerOpacity = useSharedValue(0);
  const innerOpacity = useSharedValue(1);
  const resultScale = useSharedValue(0);

  useEffect(() => {
    // scrollPosition.value = withRepeat(withTiming(allTeams.length * boxSize * -1, {
    //   duration: allTeams.length * 130,
    //   easing: Easing.linear,
    // }, () => {
    //   // console.log('loop finished')
    // }), 10, false, () => {})

    if (display) {
      scrollPosition.value = withDelay(
        rowIndex * 300,
        withRepeat(
          withTiming(0, {
            duration: 1000,
            easing: Easing.linear,
          }),
          5,
          false,
          success => {
            innerOpacity.value = 0;

            if (columnIndex == 0 && teamIndex === 0) {
              runOnJS(playDrop1)()
            }
            if (columnIndex == 0 && teamIndex === 1) {
              runOnJS(playDrop2)()
            }
            if (columnIndex == 0 && teamIndex === 2) {
              runOnJS(playDrop3)()
            }

            resultScale.value = withTiming(0.7, {
              duration: 200,
              easing: Easing.ease,
            });
          },
        ),
      );
      outerOpacity.value = withDelay(
        rowIndex * 300,
        withTiming(1, { duration: 0 }),
      );
    }
  }, [display]);

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
            height: boxSize + boxMargin * 2,
            zIndex: 1,
            overflow: 'hidden',
          },
          containerStyle,
        ]}>
        {display && (
          <View style={{ position: 'absolute', left: boxMargin }}>
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
                      // s.ba,
                      // s.b__white,
                      {
                        height: boxSize,
                        width: boxSize - 1,
                        marginVertical: boxMargin,
                      },
                    ]}
                    key={index.toString()}>
                    <Svg height={boxSize} width={boxSize}>
                      <Defs>
                        <LinearGradient
                          id="defaultUnits"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%">
                          <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
                          <Stop
                            offset="100%"
                            stopColor="#ff0"
                            stopOpacity="1"
                          />
                        </LinearGradient>
                      </Defs>
                      <Defs>
                        <LinearGradient
                          id="defaultUnitsDark"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%">
                          <Stop offset="0%" stopColor="red" stopOpacity="1" />
                          <Stop
                            offset="100%"
                            stopColor="#ff0"
                            stopOpacity="1"
                          />
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
                        <LinearGradient
                          id="text-stroke-grad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%">
                          <Stop
                            offset="0%"
                            stopColor="white"
                            stopOpacity="0.5"
                          />
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
                        y={boxSize / 2 + 6}>
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
                );
              })}
            </Animated.View>

            <Animated.View
              style={[
                s.jcse,
                s.aic,
                s.flex_col,
                {
                  position: 'absolute',
                  height: boxSize + 2 * boxMargin,
                },
                resultAnimationStyle,
              ]}>
              <View
                style={[
                  // s.ba,
                  // s.b__white,
                  {
                    height: boxSize,
                    width: boxSize - 1,
                    marginVertical: boxMargin,
                  },
                ]}>
                <Svg height={boxSize} width={boxSize}>
                  <Defs>
                    <LinearGradient
                      id="defaultUnits"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%">
                      <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
                      <Stop offset="100%" stopColor="#ff0" stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Defs>
                    <LinearGradient
                      id="defaultUnitsDark"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%">
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
                    <LinearGradient
                      id="text-stroke-grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%">
                      <Stop offset="0%" stopColor={result.secondaryColor} stopOpacity="0.5" />
                      <Stop offset="100%" stopColor={result.primaryColor} stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    fill="#fff"
                    x="0"
                    y={10}
                    width={boxSize - 3}
                    height={22}
                    rx="3"
                    ry="3"
                  />
                  <Text
                    stroke="url(#text-stroke-grad)"
                    strokeWidth="2"
                    fill={result.primaryColor}
                    fontSize="16"
                    fontWeight="bold"
                    x={boxSize / 2 - 2}
                    y={boxSize / 2 + 6}>
                    <TSpan textAnchor="middle">{[result.shorthand]}</TSpan>
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
            </Animated.View>
          </View>
        )}
      </Animated.View>
    </>
  );
};

export const TeamRandomizer = memo(Randomizer, (prevProps, nextProps) => {
  if (prevProps.display === false && nextProps.display === true) return false;
  return true;
});
