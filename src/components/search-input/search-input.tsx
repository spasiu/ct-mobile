import React from 'react';
import { View, Image, TextInput } from 'react-native';

import {
  searchInputContainerStyle,
  searchIconWrapperStyle,
  searchIconStyle,
  searchInputStyle,
  placeholderTextColor,
  inputPlaceholderText,
  searchIcon,
} from './search-input.presets';
import { SearchInputProps } from './search-input.props';

export const SearchInput = ({
  containerStyle = [],
  ...textInputProps
}: SearchInputProps): JSX.Element => (
  <View style={[...searchInputContainerStyle, ...containerStyle]}>
    <View style={searchIconWrapperStyle}>
      <Image
        style={searchIconStyle}
        source={searchIcon}
        resizeMode={'contain'}
      />
    </View>
    <TextInput
      {...textInputProps}
      style={searchInputStyle}
      placeholder={inputPlaceholderText}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={'none'}
    />
  </View>
);
