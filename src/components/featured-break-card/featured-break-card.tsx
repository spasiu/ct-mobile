import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard } from '../image-card/image-card';
import { StatusBadge } from '../status-badge/status-badge';
import { LiveCountBadge } from '../live-count-badge/live-count-badge';

import { FeaturedBreakCardProps } from './featured-break-card.props';
import {
  GRADIENT_PRESETS,
  CONTENT_CONTAINER_STYLE_PRESET,
  TITLE_STYLE_PRESET,
  DESCRIPTION_STYLE_PRESET,
  BADGE_WRAPPER_STYLE_PRESET,
  CONTENT_WRAPPER_STYPE_PRESET,
} from './featured-break-card.presets';

export const FeaturedBreakCard = ({
  title = '',
  description = '',
  status,
  viewCount,
  titleTextStyle = [],
  descriptionTextStyle = [],
  contentContainerStyle = [],
  ...imageCardProps
}: FeaturedBreakCardProps) => (
  <ImageCard cardSize="medium" {...imageCardProps}>
    <LinearGradient {...GRADIENT_PRESETS}>
      <View
        style={[...CONTENT_CONTAINER_STYLE_PRESET, ...contentContainerStyle]}>
        <View style={BADGE_WRAPPER_STYLE_PRESET}>
          {status && <StatusBadge status={status} />}
          {viewCount && <LiveCountBadge count={viewCount} />}
        </View>
        <View style={CONTENT_WRAPPER_STYPE_PRESET}>
          <Text style={[...TITLE_STYLE_PRESET, ...titleTextStyle]}>
            {title}
          </Text>
          <Text
            style={[...DESCRIPTION_STYLE_PRESET, ...descriptionTextStyle]}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {description}
          </Text>
        </View>
      </View>
    </LinearGradient>
  </ImageCard>
);
