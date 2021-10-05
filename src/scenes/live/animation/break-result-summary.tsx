import React, { useEffect } from 'react';
import { BreakResultSummaryProps } from '../live-screen.props';
import { digitsStyle, digitsBackgroundStyle } from '../live-screen.presets';
import { styles as s } from 'react-native-style-tachyons';
import { Image, Text, View } from 'react-native';
import Sound from 'react-native-sound';
import { playSound } from '../../../utils/sound';

import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../../theme/sizes';

export const BreakResultSummary = ({
  userCount,
  teamCount,
  onEnd = () => undefined,
}: BreakResultSummaryProps): JSX.Element => {
  const [animationStage, setAnimationStage] = React.useState(0);
  const imageWidth = WINDOW_WIDTH * 0.65;
  const imageHeight = imageWidth * 0.53;

  const modalWidth = WINDOW_WIDTH * 0.61;
  const modalHeight = modalWidth * 1.3;

  const imageIn = useSharedValue(0);
  const imageOut = useSharedValue(0);

  const summaryBox = useSharedValue(0);
  const textInAnim = useSharedValue(0);
  const digitsInAnim = useSharedValue(0);

  const imageX = WINDOW_WIDTH * 0.5 - imageWidth / 2;
  const imageY = WINDOW_HEIGHT * 0.5 - imageHeight / 2;

  const modalX = WINDOW_WIDTH * 0.5 - modalWidth / 2;
  const modalY = WINDOW_HEIGHT * 0.5 - modalHeight / 2;

  function nextStage(stage: number, duration: number) {
    setTimeout(() => {
      setAnimationStage(stage);
    }, duration);
  }

  useEffect(() => {
    if (animationStage === 0) {
      playSound('entry')
      imageIn.value = withTiming(
        1,
        { duration: 350, easing: Easing.ease },
        () => {
          runOnJS(nextStage)(1, 1000);
        },
      );
    }

    if (animationStage === 1) {
      playSound('cardEntry');
      imageOut.value = withTiming(1, { duration: 300, easing: Easing.ease });
      summaryBox.value = withTiming(
        1,
        { duration: 300, easing: Easing.ease },
        () => {
          runOnJS(nextStage)(2, 500);
        },
      );
    }

    if (animationStage === 2) {
      textInAnim.value = withTiming(
        1,
        { duration: 200, easing: Easing.ease },
        () => {
          runOnJS(nextStage)(3, 0);
        },
      );
    }

    if (animationStage === 3) {
      playSound('players');
      setTimeout(() => {
        playSound('teams');
      }, 100);

      digitsInAnim.value = withTiming(
        1,
        { duration: 200, easing: Easing.ease },
        () => {
          runOnJS(nextStage)(4, 20);
        },
      );
    }

    if (animationStage === 4) {
      setTimeout(() => {
        setAnimationStage(5);
      }, 2000);
    }

    if (animationStage === 5) {
      playSound('cardEntry');
      imageOut.value = withTiming(2, { duration: 150, easing: Easing.ease });
      summaryBox.value = withTiming(
        2,
        { duration: 150, easing: Easing.ease },
        () => {
          runOnJS(onEnd)();
        },
      );
    }
  }, [animationStage]);

  const inAnimationValues = {
    imageX: [
      0,
      -modalHeight / 20, // 0.1
      -modalHeight / 10, // 0.2
      -modalHeight / 4, // 0.3
      -modalHeight / 2 + (imageHeight / 2) + 10, // 0.4
      -modalHeight / 2 + (imageHeight / 2), // 0.5
      -modalHeight / 2 + (imageHeight / 2) - 5, // 0.6
      -modalHeight / 2 + (imageHeight / 2), // 0.7
      -modalHeight / 2 + (imageHeight / 2) + 10, // 0.8
      -modalHeight / 2 + (imageHeight / 2) + 5, // 0.9
      -modalHeight / 2 + (imageHeight / 2), // 1
      -WINDOW_HEIGHT / 2 - modalHeight,
    ],
    imageScale: [
      1,
      0.8, // 0.1
      0.72, // 0.2
      0.6, // 0.3
      0.5, // 0.4
      0.5, // 0.5
      0.5, // 0.6
      0.5, // 0.7
      0.5, // 0.8
      0.5, // 0.9
      0.5, // 1
    ],
    modalY: [
      -(WINDOW_HEIGHT / 2) - modalHeight,
      -(WINDOW_HEIGHT / 2) - modalHeight / 6, // 0.1
      -(WINDOW_HEIGHT / 2) + modalHeight / 2, // 0.2
      10, // 0.3
      0, // 0.4
      -10, // 0.5
      -10, // 0.6
      -10, // 0.7
      -10, // 0.8
      -10, // 0.9
      -10, // 1
      -WINDOW_HEIGHT / 2 - modalHeight, // 2
    ],
  };

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // image in
          scale: interpolate(
            imageIn.value,
            [0, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            [0, 1.2, 1.1, 1, 1.1, 1.2, 1.1, 1.1],
          ),
        },
        {
          // image out
          translateY: interpolate(
            imageOut.value,
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2],
            inAnimationValues.imageX,
          ),
        },
        {
          scale: interpolate(
            imageOut.value,
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            inAnimationValues.imageScale,
          ),
        },
      ],
    };
  }, []);

  const summaryBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            summaryBox.value,
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2],
            inAnimationValues.modalY,
          ),
        },
      ],
    };
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            top: imageY,
            left: imageX,
            position: 'absolute',
            width: imageWidth,
            height: imageHeight,
            zIndex: 2,
          },
          imageStyle,
        ]}>
        <Image
          source={require('../../../assets/team-draft.png')}
          style={{ width: imageWidth, height: imageHeight, zIndex: 2 }}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            top: modalY,
            left: modalX,
            position: 'absolute',
            width: modalWidth,
            height: modalHeight,
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          summaryBoxStyle,
        ]}>
        <View style={[s.flx_i, s.ph3]}>
          <View style={[s.flx_i]} />
          <View style={[s.flx_i, s.flx_row]}>
            <View style={[s.flx_i, s.flx_col, s.aic, s.jcc]}>
              <Animated.View
                style={[
                  s.tc,
                  useAnimatedStyle(() => {
                    return {
                      transform: [
                        {
                          scale: interpolate(
                            textInAnim.value,
                            [0, 0.2, 0.4, 1],
                            [0, 1.3, 0.6, 1],
                          ),
                        },
                      ],
                    };
                  }),
                ]}>
                <Text style={[s.ff_alt_b, s.f4, s.white]}>PLAYERS</Text>
              </Animated.View>
              <Animated.View
                style={[
                  useAnimatedStyle(() => {
                    return {
                      transform: [
                        {
                          scale: interpolate(
                            digitsInAnim.value,
                            [0, 0.2, 0.4, 1],
                            [0, 1.3, 0.6, 1],
                          ),
                        },
                      ],
                    };
                  }),
                ]}>
                <Text
                  style={[
                    s.white,
                    s.ff_tech_b,
                    s.f1,
                    s.mt3,
                    digitsBackgroundStyle,
                  ]}>
                  {'88'}
                </Text>
                {animationStage == 4 && (
                  <Text
                    style={[s.white, s.ff_tech_b, s.f1, s.mt3, digitsStyle]}>
                    {userCount < 10 ? '0' + userCount : userCount}
                  </Text>
                )}
              </Animated.View>
            </View>
            <View style={[s.flx_i, s.flx_col, s.aic, s.jcc]}>
              <Animated.View
                style={[
                  s.tc,
                  useAnimatedStyle(() => {
                    return {
                      transform: [
                        {
                          scale: interpolate(
                            textInAnim.value,
                            [0, 0.2, 0.4, 1],
                            [0, 1.3, 0.6, 1],
                          ),
                        },
                      ],
                    };
                  }),
                ]}>
                <Text style={[s.ff_alt_b, s.f4, s.white]}>TEAMS</Text>
              </Animated.View>
              <Animated.View
                style={[
                  useAnimatedStyle(() => {
                    return {
                      transform: [
                        {
                          scale: interpolate(
                            digitsInAnim.value,
                            [0, 0.2, 0.4, 1],
                            [0, 1.3, 0.6, 1],
                          ),
                        },
                      ],
                    };
                  }),
                ]}>
                <Text
                  style={[
                    s.white,
                    s.ff_tech_b,
                    s.f1,
                    s.mt3,
                    digitsBackgroundStyle,
                  ]}>
                  {'88'}
                </Text>
                {animationStage == 4 && (
                  <Text
                    style={[s.white, s.ff_tech_b, s.f1, s.mt3, digitsStyle]}>
                    {teamCount < 10 ? '0' + teamCount : teamCount}
                  </Text>
                )}
              </Animated.View>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
};
