import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard, ImageCardSizeTypes } from '../image-card';
import { StatusBadge } from '../status-badge';
import { LiveCountBadge } from '../viewership';

import { FeaturedEventCardProps } from './featured-event-card.props';
import {
  gradientPresets,
  contentContainerStylePreset,
  titleStylePreset,
  descriptionStylePreset,
  badgeWrapperStylePreset,
  contentWrapperStylePreset,
} from './featured-event-card.presets';

export const FeaturedEventCard = ({
  title = '',
  description = '',
  status,
  titleTextStyle = [],
  descriptionTextStyle = [],
  contentContainerStyle = [],
  eventDate,
  eventId,
  ...imageCardProps
}: FeaturedEventCardProps): JSX.Element => (
  <ImageCard cardSize={ImageCardSizeTypes.medium} {...imageCardProps}>
    <LinearGradient {...gradientPresets}>
      <View style={[...contentContainerStylePreset, ...contentContainerStyle]}>
        <View style={badgeWrapperStylePreset}>
          {status ? <StatusBadge text={eventDate} status={status} /> : null}
          {status === 'live' ? <LiveCountBadge eventId={eventId} /> : null}
        </View>
        <View style={contentWrapperStylePreset}>
          <Text style={[...titleStylePreset, ...titleTextStyle]}>{title}</Text>
          <Text
            style={[...descriptionStylePreset, ...descriptionTextStyle]}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {description}
          </Text>
        </View>
      </View>
    </LinearGradient>
  </ImageCard>
);
