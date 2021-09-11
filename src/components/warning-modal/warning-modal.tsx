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
  loadingWrapper,
  loadingContainer,
} from './warning-modal.presets';
import { WarningModalProps } from './warning-modal.props';
import { Loading } from '../loading';

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
  children,
  loading = false,
}: WarningModalProps): JSX.Element => (
  <Modal isVisible={visible}>
    {loading ? (
      <View style={loadingWrapper}>
        <Loading containerStyle={loadingContainer} />
      </View>
    ) : (
      <View style={containerWrapper}>
        {imageSrc ? <Image source={imageSrc} /> : null}
        {title ? (
          <Text style={[...titleDefaultStyle, ...titleStyle]}>{title}</Text>
        ) : null}
        {description ? (
          <Text style={descriptionStyle}>{description}</Text>
        ) : null}
        {children}
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
    )}
  </Modal>
);
