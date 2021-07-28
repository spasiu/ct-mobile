import React from 'react';
import { View, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { TextLink } from '../text-link';

import { SelectableRowProps, SelectableRowTypes } from './selectable-row.props';
import { isRowStatusDefault } from './selectable-row.utils';
import {
  checkIcon,
  containerPreset,
  checkboxPreset,
  leftWrapperPreset,
  childrenWrapperPreset,
  actionWrapperPreset,
  actionTextStyle,
} from './selectable-row.presets';

export const SelectableRow = ({
  rowStatus = SelectableRowTypes.default,
  actionText,
  onActionPressed,
  children,
  rowStyle = [],
  ...bolderlessButtonProps
}: SelectableRowProps): JSX.Element => {
  return (
    <BorderlessButton
      style={[...containerPreset, ...rowStyle]}
      {...bolderlessButtonProps}>
      <View style={leftWrapperPreset}>
        {isRowStatusDefault(rowStatus) ? (
          <View style={checkboxPreset[rowStatus]} />
        ) : (
          <View style={checkboxPreset[rowStatus]}>
            <Image source={checkIcon} resizeMode="contain" />
          </View>
        )}
      </View>
      <View style={childrenWrapperPreset}>{children}</View>
      <View style={actionWrapperPreset}>
        <TextLink
          onPress={onActionPressed}
          textStyle={actionTextStyle}
          text={actionText}
        />
      </View>
    </BorderlessButton>
  );
};
