import React, { memo, useEffect } from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { RandomTeamUserRowProps } from '../live-screen.props';
import { WINDOW_WIDTH } from '../../../theme/sizes';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ServerImage } from '../../../components/server-image/server-image';

export const TeamUserRow = ({
  currentUserId,
  users,
}: RandomTeamUserRowProps): JSX.Element => {
  const boxWidth = users.length < 6 ? 84 : 70;
  const boxSize = (boxWidth * WINDOW_WIDTH) / 750;
  const headerHeight = (34 * WINDOW_WIDTH) / 750;
  const avatarSize = (80 * WINDOW_WIDTH) / 750;

  const userBoxAnim = useSharedValue(0);
  const avatarAnim = useSharedValue(0);

  useEffect(() => {
    userBoxAnim.value = withDelay(
      0,
      withTiming(0.7, { duration: 250, easing: Easing.ease }),
    );

    avatarAnim.value = withDelay(
      300,
      withTiming(0.7, {
        duration: 250,
        easing: Easing.ease,
      }),
    );
  }, []);

  return (
    <>
      <View style={[s.flx_row, s.jcsa, s.mt4, s.ph2]}>
        {users.map((user: any, index: number) => {
          return (
            <Animated.View
              key={index.toString()}
              style={[
                useAnimatedStyle(() => {
                  return {
                    transform: [
                      {
                        // image in
                        scale: interpolate(
                          userBoxAnim.value,
                          [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
                          [0, 0.3, 0.7, 1.3, 1, 0.8, 0.9, 1],
                        ),
                      },
                    ],
                  };
                }),
              ]}>
              <View style={[s.b_white, s.no_overflow, { borderRadius: 10 }]}>
                <View
                  style={[
                    s.pa2,
                    s.flx_row,
                    s.jcc,
                    { height: headerHeight, backgroundColor: 'red' },
                  ]}></View>
                <View style={[s.ba, s.flx_row, s.jcc]}>
                  {
                    // replace with actual component
                    user.items!.map((item: any, index: number) => {
                      const styleFirst = index == 0 ? s.ml2 : {};

                      return (
                        <View
                          key={index.toString()}
                          style={[
                            { width: boxSize, height: boxSize },
                            s.ba,
                            s.b_white,
                            s.mr2,
                            s.mv2,
                            styleFirst,
                          ]}>
                          <Text style={[s.white]}>{item.shorthand}</Text>
                        </View>
                      );
                    })
                  }
                </View>
              </View>
              <Animated.View
                style={[
                  s.absolute,
                  s.circle_m2,
                  s.no_overflow,
                  s.flx_i,
                  s.jcc,
                  s.aic,
                  s.asc,
                  {
                    top: (avatarSize / 1.7) * -1,
                  },
                  useAnimatedStyle(() => {
                    return {
                      transform: [
                        {
                          // image in
                          scale: interpolate(
                            avatarAnim.value,
                            [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
                            [0, 0.3, 0.7, 1.3, 1, 0.8, 0.9, 1],
                          ),
                        },
                      ],
                    };
                  }),
                ]}>
                <ServerImage
                  fit={'facearea'}
                  src={user.image}
                  width={avatarSize}
                  height={avatarSize}
                  style={[s.circle_m2, s.ba2, s.b__white]}
                />
              </Animated.View>
            </Animated.View>
          );
        })}
      </View>
    </>
  );
};

export const RandomTeamUserRow = memo(TeamUserRow, (prevProps, nextProps) => {
  return true;
});
