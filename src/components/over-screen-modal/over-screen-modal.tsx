import React from 'react';
import { Modal, View, Text, Image } from 'react-native';

import { IconButton } from '../icon-button/icon-button';
import { ActionFooter } from '../action-footer/action-footer';

import {
  MODAL_CONTAINER_STYLE,
  TITLE_BAR_STYLE,
  BUTTON_WRAPPER_STYLE,
  TITLE_TEXT_STYLE,
  CLOSE_BUTTON_STYLE,
  getModalWrapperStyle,
} from './over-screen-modal.presets';
import { OverScreenModalProps } from './over-screen-modal.props';

const closeIcon = require('../../assets/close-icon.png');

export const OverScreenModal = ({
  visible = false,
  ratio = 1,
  title = '',
  action,
  children,
  onPressClose = () => {},
  onPressAction = () => {},
  actionStyle = [],
  ...modalProps
}: OverScreenModalProps) => {
  return (
    <Modal
      {...modalProps}
      presentationStyle={'overFullScreen'}
      animationType={'slide'}
      visible={visible}
      onRequestClose={onPressClose}
      transparent={true}>
      <View style={MODAL_CONTAINER_STYLE}>
        <View style={getModalWrapperStyle(ratio)}>
          <View style={TITLE_BAR_STYLE}>
            <View style={BUTTON_WRAPPER_STYLE} />
            <Text style={TITLE_TEXT_STYLE}>{title}</Text>
            <IconButton style={BUTTON_WRAPPER_STYLE} onPress={onPressClose}>
              <Image
                style={CLOSE_BUTTON_STYLE}
                source={closeIcon}
                resizeMode={'contain'}
              />
            </IconButton>
          </View>
          {children}
          {action && (
            <ActionFooter
              containerStyle={actionStyle}
              buttonText={action}
              onPress={onPressAction}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
