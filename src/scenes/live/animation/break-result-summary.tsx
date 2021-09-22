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
  const imageWidth = WINDOW_WIDTH * 0.65;
  const imageHeight = imageWidth * 0.53;

  const modalWidth = Math.min(280, WINDOW_WIDTH * 0.61);
  const modalHeight = modalWidth * 1.3;

  const imageIn = useSharedValue(0);
  const imageOut = useSharedValue(0);
  const summaryBox = useSharedValue(0);

  const imageX = WINDOW_WIDTH * 0.5 - imageWidth / 2;
  const imageY = WINDOW_HEIGHT * 0.5 - imageHeight / 2;

  const modalX = WINDOW_WIDTH * 0.5 - modalWidth / 2;
  const modalY = WINDOW_HEIGHT * 0.5 - modalHeight / 2;

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
      -modalHeight / 20,  // 0.1
      -modalHeight / 10,  // 0.2
      -modalHeight / 4,   // 0.3
      -modalHeight / 2.7, // 0.4
      -modalHeight / 2.7 - 10, // 0.5
      -modalHeight / 2.7 - 15, // 0.6
      -modalHeight / 2.7 - 10, // 0.7
      -modalHeight / 2.7, // 0.8
      -modalHeight / 2.7 - 5, // 0.9
      -modalHeight / 2.7 - 10, // 1
    ],
    imageScale: [
      1,
      0.8,  // 0.1
      0.72, // 0.2
      0.6,  // 0.3
      0.5,  // 0.4
      0.5,  // 0.5
      0.5,  // 0.6
      0.5,  // 0.7
      0.5,  // 0.8
      0.5,  // 0.9
      0.5   // 1
    ],
    modalY: [
      -(WINDOW_HEIGHT / 2) - modalHeight,
      -(WINDOW_HEIGHT / 2) - (modalHeight/6),                 // 0.1
      -(WINDOW_HEIGHT / 2) + (modalHeight/2),                 // 0.2
      -(WINDOW_HEIGHT / 2) + (modalHeight) + 10, // push down // 0.3
      -(WINDOW_HEIGHT / 2) + (modalHeight), // push up        // 0.4
      -(WINDOW_HEIGHT / 2) + (modalHeight) - 10,              // 0.5
      -(WINDOW_HEIGHT / 2) + (modalHeight) - 10,              // 0.6
      -(WINDOW_HEIGHT / 2) + (modalHeight) - 10,              // 0.7
      -(WINDOW_HEIGHT / 2) + (modalHeight) - 10,              // 0.8
      -(WINDOW_HEIGHT / 2) + (modalHeight) - 10,              // 0.9
      -(WINDOW_HEIGHT / 2) + (modalHeight) - 10,              // 1
    ]
  }

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
            backgroundColor: 'rgba(6, 4, 2, 0.7)',
          },
          summaryBoxStyle,
        ]}>
        </Animated.View>
    </>
  );
};
