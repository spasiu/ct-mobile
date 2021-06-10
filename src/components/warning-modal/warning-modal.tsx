import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import { TextLink } from '../text-link';
import { ActionFooter } from '../action-footer';

import {
  containerWrapper,
  titleStyle,
  descriptionStyle,
  secondaryActionStyle,
  secondaryActionWrapperStyle,
} from './warning-modal.presets';
import { WarningModalProps } from './warning-modal.props';

export const WarningModal = ({
  visible = false,
  title = '',
  description = '',
  primaryActionText = '',
  onPrimaryActionPressed = () => undefined,
  secondaryActionText = '',
  onSecondaryActionPressed = () => undefined,
}: WarningModalProps): JSX.Element => (
  <Modal isVisible={visible}>
    <View style={containerWrapper}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={descriptionStyle}>{description}</Text>
      <ActionFooter
        buttonText={primaryActionText}
        onPress={onPrimaryActionPressed}>
        <TextLink
          textStyle={secondaryActionStyle}
          style={secondaryActionWrapperStyle}
          text={secondaryActionText}
          onPress={onSecondaryActionPressed}
        />
      </ActionFooter>
    </View>
  </Modal>
);
