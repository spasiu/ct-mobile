import React, { memo, useEffect } from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { RandomTeamUserRowProps } from '../live-screen.props';
import { WINDOW_WIDTH } from '../../../theme/sizes';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ServerImage } from '../../../components/server-image/server-image';
import { TeamRandomizer } from './team-randomizer';
import { AnimatedTeamShadow } from './team-shadow';

export const TeamUserRow = ({
  currentUserId,
  users,
  visibleTeamsInRow,
  allTeams,
  injectElementsAtColumnIndex,
  rowIndex,
}: RandomTeamUserRowProps): JSX.Element => {
  const boxWidth = users.length < 6 ? 84 : 70;
  const boxMargin = (7 * WINDOW_WIDTH) / 750;
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
        {users.map((user: any, columnIndex: number) => {
          return (
            <Animated.View
              key={columnIndex.toString()}
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
              <View
                style={[
                  s.ba2,
                  s.b__white,
                  s.no_overflow,
                  { borderRadius: 12 },
                ]}>
                <View
                  style={[
                    s.pa2,
                    s.flx_row,
                    s.jcc,
                    {
                      height: headerHeight,
                      zIndex: 2,
                    },
                    user.user_id === currentUserId
                      ? s.bg_secondary
                      : s.bg_primary,
                  ]}
                />
                <View
                  style={[
                    s.flx_row,
                    s.jcc,
                    {
                      paddingHorizontal: boxMargin,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                  ]}>
                  {
                    // replace with actual component
                    user.items!.map((item: any, index: number) => {
                      return (
                        <View key={index.toString()}>
                          <TeamRandomizer
                            key={index.toString()}
                            result={item}
                            rowIndex={rowIndex}
                            isReady={injectElementsAtColumnIndex === index}
                            currentAnimatingIndex={visibleTeamsInRow}
                            teamIndex={index}
                            columnIndex={columnIndex}
                            boxSize={boxSize}
                            boxMargin={boxMargin}
                            allTeams={allTeams.slice(0, 6)}
                          />
                          {index == injectElementsAtColumnIndex && <AnimatedTeamShadow
                            boxMargin={boxMargin}
                            boxSize={boxSize}
                            rowIndex={rowIndex}
                          />}
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
                  s.circle_m2,
                  s.ba2,
                  s.b__white,
                  {
                    top: (avatarSize / 2) * -1,
                    height: avatarSize,
                    width: avatarSize
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
  if (
    prevProps.injectElementsAtColumnIndex !==
    nextProps.injectElementsAtColumnIndex
  )
    return false;
  return prevProps.visibleTeamsInRow === nextProps.visibleTeamsInRow;
});
