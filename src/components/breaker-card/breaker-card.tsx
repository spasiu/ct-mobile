import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard } from '../image-card';
import {
  FollowButton,
  FollowButtonTypes,
  FollowButtonSizeTypes,
} from '../follow-button';

import { BreakerCardProps } from './breaker-card.props';
import {
  gradientPresets,
  contentContainerStylePreset,
  titleStylePreset,
  descriptionStylePreset,
  buttonAbsoluteWrapper,
  followButtonStyle,
} from './breaker-card.presets';

export const BreakerCard = ({
  title = '',
  description = '',
  titleTextStyle = [],
  descriptionTextStyle = [],
  contentContainerStyle = [],
  cardSize = 'medium',
  showFollow = true,
  userFollows = false,
  onPressFollow = () => undefined,
  ...imageCardProps
}: BreakerCardProps): JSX.Element => (
  <>
    <ImageCard cardSize={cardSize} {...imageCardProps}>
      <LinearGradient {...gradientPresets}>
        <View
          style={[...contentContainerStylePreset, ...contentContainerStyle]}>
          <Text style={[...titleStylePreset[cardSize], ...titleTextStyle]}>
            {title}
          </Text>
          <Text
            style={[
              ...descriptionStylePreset[cardSize],
              ...descriptionTextStyle,
            ]}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {description}
          </Text>
        </View>
      </LinearGradient>
    </ImageCard>
    {showFollow ? (
      <View style={buttonAbsoluteWrapper}>
        <FollowButton
          defaultContainerStyle={followButtonStyle.container}
          defaultImageStyle={followButtonStyle.image}
          size={FollowButtonSizeTypes.full}
          onPress={onPressFollow}
          type={
            userFollows ? FollowButtonTypes.selected : FollowButtonTypes.default
          }
        />
      </View>
    ) : null}
  </>
);
