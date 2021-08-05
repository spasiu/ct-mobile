import React from 'react';
import { Image, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { COLORS } from '../../theme/colors';

import {
  containerStyle,
  paginationStyle,
  paginationActiveItemStyle,
  imageStyle,
} from './image-gallery.presets';
import { ImageGalleryProps } from './image-gallery.props';

export const ImageGallery = ({
  images = [],
}: ImageGalleryProps): JSX.Element => {
  return (
    <View style={containerStyle}>
      <SwiperFlatList
        showPagination
        data={images}
        paginationStyleItem={paginationStyle}
        paginationStyleItemActive={paginationActiveItemStyle}
        paginationStyleItemInactive={{
          backgroundColor: COLORS.black_40,
        }}
        renderItem={({ item }: { item: string }) => {
          return (
            <Image
              style={imageStyle}
              source={{ uri: item }}
              resizeMode={'contain'}
            />
          );
        }}
      />
    </View>
  );
};
