import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';

import { TextLink } from '../text-link';
import { ActionFooter } from '../action-footer';

import {
  containerWrapper,
  titleDefaultStyle,
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
  imageSrc,
  onPrimaryActionPressed = () => undefined,
  secondaryActionText = '',
  onSecondaryActionPressed = () => undefined,
  loadingPrimaryAction = false,
  titleStyle = [],
}: WarningModalProps): JSX.Element => (
  <Modal isVisible={visible}>
    <View style={containerWrapper}>
      {imageSrc ? <Image source={imageSrc} /> : null}
      {title ? (
        <Text style={[...titleDefaultStyle, ...titleStyle]}>{title}</Text>
      ) : null}
      {description ? <Text style={descriptionStyle}>{description}</Text> : null}
      <ActionFooter
        isLoading={loadingPrimaryAction}
        buttonText={primaryActionText}
        onPress={onPrimaryActionPressed}>
        {secondaryActionText ? (
          <TextLink
            textStyle={secondaryActionStyle}
            style={secondaryActionWrapperStyle}
            text={secondaryActionText}
            onPress={onSecondaryActionPressed}
          />
        ) : null}
      </ActionFooter>
    </View>
  </Modal>
);
