import React, { useEffect } from 'react';
import { BreakResultSummaryProps } from '../live-screen.props';
import { styles as s } from 'react-native-style-tachyons';
import { Image } from 'react-native';
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
}: BreakResultSummaryProps): JSX.Element => {
  const [animationStage, setAnimationStage] = React.useState(0);
  const imageWidth = 160;
  const imageHeight = 85;

  const modalHeight = 200;
  const modalWidth = 170;

  const imageIn = useSharedValue(0);
  const imageOut = useSharedValue(0);
  const summaryBox = useSharedValue(0);

  function nextStage(stage: number) {
    setTimeout(() => {
      setAnimationStage(stage);
    }, 1000);
  }

  useEffect(() => {
    if (animationStage === 0) {
      imageIn.value = withTiming(
        1,
        { duration: 300, easing: Easing.ease },
        () => {
          runOnJS(nextStage)(1);
        },
      );
    }

    if (animationStage === 1) {
      imageOut.value = withTiming(1, { duration: 300, easing: Easing.ease });
      summaryBox.value = withTiming(1, { duration: 300, easing: Easing.ease });
    }
  }, [animationStage]);

  const inAnimationValues = {
    imageX: [
      0,
      -80,
      -130,
      -130,
      -150,
      -160,
      -165,
      -155,
      -145,
      -165,
      -165
    ],
    imageScale: [
      1,
      0.9,
      0.8,
      0.8,
      0.6,
      0.6,
      0.6,
      0.6,
      0.6,
      0.6,
      0.6
    ],
    modalX: [
      -(WINDOW_HEIGHT / 2) - modalHeight,
      -(WINDOW_HEIGHT / 2) - (modalHeight/7),
      -230,
      -90,
      -100,
      -110,
      -110,
      -110,
      -110,
      -110,
      -110
    ]
  }

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // image in
          scale: interpolate(
            imageIn.value,
            [0, 0.2, 0.4, 0.6, 0.8, 1],
            [0, 1.3, 0.6, 1.03, 0.97, 1],
          ),
        },
        {
          // image out
          translateY: interpolate(
            imageOut.value,
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            inAnimationValues.imageX,
          ),
        },
        {
          scale: interpolate(
            imageOut.value,
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            inAnimationValues.imageScale
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
            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            inAnimationValues.modalX,
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
            top: WINDOW_HEIGHT * 0.5 - imageHeight / 2,
            left: WINDOW_WIDTH * 0.5 - imageWidth / 2,
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
            top: WINDOW_HEIGHT * 0.5 - modalHeight / 2,
            left: WINDOW_WIDTH * 0.5 - modalWidth / 2,
            position: 'absolute',
            width: modalWidth,
            height: modalHeight,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 10,
            backgroundColor: 'rgba(6, 4, 2, 0.7)',
          },
          summaryBoxStyle,
        ]}></Animated.View>
    </>
  );
};
