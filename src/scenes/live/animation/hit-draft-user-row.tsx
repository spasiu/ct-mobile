import React, { memo, useEffect } from 'react';
import { styles as s } from 'react-native-style-tachyons';

import { HitDraftUserRowProps } from '../live-screen.props';
import { WINDOW_WIDTH } from '../../../theme/sizes';
import { Image, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { getImgixUrlWithQueryParams } from '../../../services/imgix';

export const UserRow = ({
  currentUserId,
  users,
  rowIndex,
}: HitDraftUserRowProps): JSX.Element => {
  const boxMargin = (7 * WINDOW_WIDTH) / 750;
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
      400,
      withTiming(0.7, {
        duration: 250,
        easing: Easing.ease,
      }),
    );
  }, []);

  const imgixQueryParamsConfig = {
    auto: 'compress',
    q: 100,
    w: avatarSize,
    h: avatarSize,
    fill: 'blur',
    fit: 'facearea',
  };

  const getFullImageUrl = src => {
    return getImgixUrlWithQueryParams(src, imgixQueryParamsConfig);
  };

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
                    <View style={[s.b__white, s.flx_row, s.aic, { padding: boxMargin * 2}]}>
                      <View
                        style={[
                          s.circle_m2,
                          s.no_overflow,
                          s.jcc,
                          s.aic,
                          s.asc,
                          s.circle_m2,
                          s.ba2,
                          s.b__white,
                          {
                            height: avatarSize,
                            width: avatarSize,
                            marginRight: boxMargin
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: getFullImageUrl(user.image) }}
                          style={{
                            width: avatarSize,
                            height: avatarSize,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                      <Text
                        allowFontScaling
                        numberOfLines={2}
                        style={[s.white, s.mr1, s.ml2, s.f5, s.b, s.ff_alt_b, { width: 80}]}>
                        {user.username}
                      </Text>
                    </View>
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
                  s.bg_blue,
                  s.b__white,
                  {
                    top: (avatarSize / 2) * -1,
                    height: avatarSize,
                    width: avatarSize,
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
                <Text style={[s.f4, s.ff_alt_sb, s.white]}>{(columnIndex + 1) + (rowIndex * 2)}</Text>
              </Animated.View>
            </Animated.View>
          );
        })}
      </View>
    </>
  );
};

export const HitDraftUserRow = memo(UserRow, (prevProps, nextProps) => {
  return true;
});
