import React from 'react';
import { View } from 'react-native';

import { ActionButton, ActionButtonTypes } from '../action-button';

import { ActionFooterProps } from './action-footer.props';
import { viewPresets } from './action-footer.presets';

export const ActionFooter = ({
  containerStyle = [],
  buttonText = '',
  buttonType = ActionButtonTypes.primary,
  onPress = () => undefined,
  children,
  topElement,
  isLoading = false,
}: ActionFooterProps): JSX.Element => {
  return (
    <View style={[...viewPresets.containerStyle, ...containerStyle]}>
      {topElement ? topElement : null}
      <ActionButton
        buttonType={buttonType}
        text={buttonText}
        onPress={onPress}
        isLoading={isLoading}
      />
      {children ? (
        <View style={[viewPresets.childrenWrapperStyle]}>{children}</View>
      ) : null}
    </View>
  );
};
