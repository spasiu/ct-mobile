import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard, ImageCardSizeTypes } from '../image-card';
import { StatusBadge } from '../status-badge';
import { LiveCountBadge } from '../live-count-badge';

import { FeaturedBreakCardProps } from './featured-break-card.props';
import {
  gradientPresets,
  contentContainerStylePreset,
  titleStylePreset,
  descriptionStylePreset,
  badgeWrapperStylePreset,
  contentWrapperStylePreset,
} from './featured-break-card.presets';

export const FeaturedBreakCard = ({
  title = '',
  description = '',
  status,
  viewCount,
  titleTextStyle = [],
  descriptionTextStyle = [],
  contentContainerStyle = [],
  eventDate,
  ...imageCardProps
}: FeaturedBreakCardProps): JSX.Element => (
  <ImageCard cardSize={ImageCardSizeTypes.medium} {...imageCardProps}>
    <LinearGradient {...gradientPresets}>
      <View style={[...contentContainerStylePreset, ...contentContainerStyle]}>
        <View style={badgeWrapperStylePreset}>
          {status ? <StatusBadge text={eventDate} status={status} /> : null}
          {viewCount ? <LiveCountBadge count={viewCount} /> : null}
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
