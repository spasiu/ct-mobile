import React from 'react';
import { Text } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import {
  SELECTION_BUTTON_TYPE_PRESETS,
  SELECTION_BUTTON_TEXT_PRESETS,
} from './selection-button.presets';
import { SelectionButtonProps } from './selection-button.props';

export const SelectionButton = ({
  buttonType = 'default',
  text = '',
  ...awesomeButtonProps
}: SelectionButtonProps) => {
  return (
    <AwesomeButton
      stretch
      raiseLevel={6}
      springRelease={false}
      {...SELECTION_BUTTON_TYPE_PRESETS[buttonType]}
      {...awesomeButtonProps}>
      <Text style={SELECTION_BUTTON_TEXT_PRESETS[buttonType]}>{text}</Text>
    </AwesomeButton>
  );
};
