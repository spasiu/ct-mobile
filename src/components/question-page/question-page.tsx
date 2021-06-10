import React, { useState } from 'react';
import { View } from 'react-native';
import { map } from 'ramda';
import { styles as s } from 'react-native-style-tachyons';

import { TitleBar, ActionFooter, SelectionButton } from '../';
import { t } from '../../i18n/i18n';

import { QuestionPageProps } from './question-page.props';
import {
  getButtonType,
  handleSelectedValues,
  isButtonSelected,
} from './question-page.utils';
import {
  containerWrapperStyle,
  optionsContainerStyle,
  actionContainerStyle,
} from './question-page.presets';

export const QuestionPage = ({
  showTitleBar = true,
  translationRootKey = '',
  titleKey = '',
  subtitleKey = '',
  allowMultipleSelection = false,
  options = [],
  actionButtonText = '',
  onActionPressed = () => undefined,
  containerStyle = [],
  initialSelection,
  isLoading = false,
}: QuestionPageProps): JSX.Element => {
  const initialValueForMultipleSelection = initialSelection || [];
  const initialValueForSingleSelection = initialSelection || '';
  const [alternatives, setAlternatives] = useState<string | string[]>(
    allowMultipleSelection
      ? initialValueForMultipleSelection
      : initialValueForSingleSelection,
  );
  return (
    <View style={[...containerWrapperStyle, ...containerStyle]}>
      {showTitleBar ? (
        <TitleBar
          title={t(`${translationRootKey}.${titleKey}`)}
          subtitle={t(`${translationRootKey}.${subtitleKey}`)}
          wrapperStyle={[s.w_100]}
        />
      ) : null}
      <View style={optionsContainerStyle}>
        {map(({ label, value }) => {
          const selected = isButtonSelected(
            value,
            allowMultipleSelection,
            alternatives,
          );
          return (
            <SelectionButton
              buttonType={getButtonType(selected)}
              onPress={() => {
                const selectedAlternatives = handleSelectedValues(
                  value,
                  selected,
                  allowMultipleSelection,
                  alternatives,
                );
                setAlternatives(selectedAlternatives);
              }}
              key={label}
              text={t(`${translationRootKey}.${label}`)}
            />
          );
        }, options)}
      </View>
      <ActionFooter
        isLoading={isLoading}
        containerStyle={actionContainerStyle}
        buttonText={actionButtonText}
        onPress={() => onActionPressed(alternatives)}
      />
    </View>
  );
};
