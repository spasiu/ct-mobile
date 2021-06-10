import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard, ImageCardSizeTypes } from '../image-card';
import { StatusBadge } from '../status-badge';
import { LeagueIcon } from '../league-icon';
import { FollowButton, FollowButtonSizeTypes } from '../follow-button';

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
} from './event-card.presets';

export const EventCard = ({
  title = '',
  status,
  league,
  eventDate,
  contentContainerStyle = [],
  ...imageCardProps
}: EventCardProps): JSX.Element => (
  <ImageCard cardSize={ImageCardSizeTypes.medium} {...imageCardProps}>
    <LinearGradient {...gradientPresets}>
      <View style={[...contentContainerStylePreset, ...contentContainerStyle]}>
        <View style={infoWrapperStylePreset}>
          <StatusBadge status={status} text={eventDate} />
          <LeagueIcon league={league} />
        </View>
        <View style={contentWrapperStyle}>
          <View style={footerWrapperStyle}>
            <Text style={titleStylePreset} numberOfLines={2}>
              {title}
            </Text>
            <View style={followButtonWrapperStyle}>
              <FollowButton
                defaultContainerStyle={followButtonStyle.container}
                defaultImageStyle={followButtonStyle.image}
                size={FollowButtonSizeTypes.short}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  </ImageCard>
);
