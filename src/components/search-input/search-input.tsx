import React from 'react';
import { View, Image, TextInput } from 'react-native';

import {
  SEARCH_INPUT_CONTAINER_STYLE,
  SEARCH_ICON_WRAPPER_STYLE,
  SEARCH_ICON_STYLE,
  SEARCH_INPUT_STYLE,
  PLACEHOLDER_TEXT_COLOR,
  INPUT_PLACEHOLDER_TEXT,
} from './search-input.presets';
import { SearchInputProps } from './search-input.props';

const searchIcon = require('../../assets/search-icon.png');

export const SearchInput = ({
  containerStyle = [],
  ...textInputProps
}: SearchInputProps) => (
  <View style={[...SEARCH_INPUT_CONTAINER_STYLE, ...containerStyle]}>
    <View style={SEARCH_ICON_WRAPPER_STYLE}>
      <Image
        style={SEARCH_ICON_STYLE}
        source={searchIcon}
        resizeMode={'contain'}
      />
    </View>
    <TextInput
      {...textInputProps}
      style={SEARCH_INPUT_STYLE}
      placeholder={INPUT_PLACEHOLDER_TEXT}
      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
    />
  </View>
);
