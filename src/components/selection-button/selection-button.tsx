import React from 'react';
import { Text } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import {
  selectionButtonTypePresets,
  selectionButtonTextPresets,
} from './selection-button.presets';
import {
  SelectionButtonProps,
  SelectionButtonTypes,
} from './selection-button.props';

export const SelectionButton = ({
  buttonType = SelectionButtonTypes.default,
  text = '',
  ...awesomeButtonProps
}: SelectionButtonProps): JSX.Element => {
  return (
    <AwesomeButton
      stretch
      raiseLevel={6}
      springRelease={false}
      {...selectionButtonTypePresets[buttonType]}
      {...awesomeButtonProps}>
      <Text style={selectionButtonTextPresets[buttonType]}>{text}</Text>
    </AwesomeButton>
  );
};
