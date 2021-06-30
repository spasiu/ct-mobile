import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';

import { IconButton } from '../icon-button';
import { ActionFooter } from '../action-footer';

import {
  modalContainerStyle,
  titleBarStyle,
  buttonWrapperStyle,
  titleTextStyle,
  closeButtonStyle,
  getModalWrapperStyle,
  overScreenModalStyle,
} from './over-screen-modal.presets';
import { OverScreenModalProps } from './over-screen-modal.props';

const closeIcon = require('../../assets/close-icon.png');

export const OverScreenModal = ({
  ratio = 1,
  title = '',
  action,
  children,
  onPressClose = () => undefined,
  onPressAction = () => undefined,
  actionStyle = [],
  bottomComponent,
  ...modalProps
}: OverScreenModalProps): JSX.Element => {
  return (
    <Modal style={overScreenModalStyle} {...modalProps}>
      <View style={modalContainerStyle}>
        <View style={getModalWrapperStyle(ratio)}>
          <View style={titleBarStyle}>
            <View style={buttonWrapperStyle} />
            <Text style={titleTextStyle}>{title}</Text>
            <IconButton style={buttonWrapperStyle} onPress={onPressClose}>
              <Image
                style={closeButtonStyle}
                source={closeIcon}
                resizeMode={'contain'}
              />
            </IconButton>
          </View>
          {children}
          {action ? (
            <ActionFooter
              containerStyle={actionStyle}
              buttonText={action}
              onPress={onPressAction}>
              {bottomComponent}
            </ActionFooter>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
