import React from 'react';
import { View } from 'react-native';

import { ActionButton } from '../action-button/action-button';

import { ActionFooterProps } from './action-footer.props';
import { viewPresets } from './action-footer.presets';

export const ActionFooter = ({
  containerStyle = [],
  buttonText = '',
  buttonType = 'primary',
  onPress = () => {},
  children,
}: ActionFooterProps) => {
  return (
    <View style={[...viewPresets.containerStyle, ...containerStyle]}>
      <ActionButton
        buttonType={buttonType}
        text={buttonText}
        onPress={onPress}
      />
      {children && (
        <View style={[viewPresets.childrenWrapperStyle]}>{children}</View>
      )}
    </View>
  );
};