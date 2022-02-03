import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard, ImageCardSizeTypes } from '../image-card';
import { StatusBadge } from '../status-badge';
import {
  FollowButton,
  FollowButtonSizeTypes,
  FollowButtonTypes,
} from '../follow-button';
import { LiveCountBadge } from '../viewership';

import { EventCardProps } from './event-card.props';
import {
  gradientPresets,
  contentContainerStylePreset,
  titleStylePreset,
  infoWrapperStylePreset,
  contentWrapperStyle,
  followButtonStyle,
  followButtonWrapperStyle,
  footerWrapperStyle,
  buttonAbsoluteWrapper,
} from './event-card.presets';

export const EventCard = ({
  title = '',
  status,
  eventDate,
  contentContainerStyle = [],
  onPressFollow = () => undefined,
  userFollows = false,
  ...imageCardProps
}: EventCardProps): JSX.Element => (
  <View>
    <ImageCard cardSize={ImageCardSizeTypes.medium} {...imageCardProps}>
      <LinearGradient {...gradientPresets}>
        <View
          style={[...contentContainerStylePreset, ...contentContainerStyle]}>
          <View style={infoWrapperStylePreset}>
            <StatusBadge status={status} text={eventDate} />
            {status === 'live' ? <LiveCountBadge /> : null}
          </View>
          <View style={contentWrapperStyle}>
            <View style={footerWrapperStyle}>
              <Text style={titleStylePreset} numberOfLines={2}>
                {title}
              </Text>
              <View style={followButtonWrapperStyle} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageCard>
    <View style={buttonAbsoluteWrapper}>
      <FollowButton
        defaultContainerStyle={followButtonStyle.container}
        defaultImageStyle={followButtonStyle.image}
        size={FollowButtonSizeTypes.short}
        onPress={onPressFollow}
        type={
          userFollows ? FollowButtonTypes.selected : FollowButtonTypes.default
        }
      />
    </View>
  </View>
);
