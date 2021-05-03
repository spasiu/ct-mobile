import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard } from '../image-card/image-card';
import { StatusBadge } from '../status-badge/status-badge';
import { LeagueIcon } from '../league-icon';
import { FollowButton } from '../follow-button/follow-button';

import { EventCardProps } from './event-card.props';
import {
  GRADIENT_PRESETS,
  CONTENT_CONTAINER_STYLE_PRESET,
  TITLE_STYLE_PRESET,
  INFO_WRAPPER_STYLE_PRESET,
  CONTENT_WRAPPER_STYLE,
  FOLLOW_BUTTON_STYLE,
  FOLLOW_BUTTON_WRAPPER_STYLE,
  FOOTER_WRAPPER_STYLE,
} from './event-card.presets';

export const EventCard = ({
  title = '',
  status,
  league,
  eventDate,
  contentContainerStyle = [],
  ...imageCardProps
}: EventCardProps) => (
  <ImageCard cardSize="medium" {...imageCardProps}>
    <LinearGradient {...GRADIENT_PRESETS}>
      <View
        style={[...CONTENT_CONTAINER_STYLE_PRESET, ...contentContainerStyle]}>
        <View style={INFO_WRAPPER_STYLE_PRESET}>
          <StatusBadge status={status} text={eventDate} />
          <LeagueIcon league={league} />
        </View>
        <View style={CONTENT_WRAPPER_STYLE}>
          <View style={FOOTER_WRAPPER_STYLE}>
            <Text style={TITLE_STYLE_PRESET} numberOfLines={2}>
              {title}
            </Text>
            <View style={FOLLOW_BUTTON_WRAPPER_STYLE}>
              <FollowButton
                defaultContainerStyle={FOLLOW_BUTTON_STYLE.container}
                defaultImageStyle={FOLLOW_BUTTON_STYLE.image}
                size={'short'}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  </ImageCard>
);
