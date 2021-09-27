import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';

import { IconButton } from '../icon-button';
import { ActionFooter } from '../action-footer';
import { BackButton } from '../back-button';

import {
  modalContainerStyle,
  titleBarStyle,
  buttonWrapperStyle,
  titleTextStyle,
  closeButtonStyle,
  getModalWrapperStyle,
  overScreenModalStyle,
  closeIcon,
} from './over-screen-modal.presets';
import { OverScreenModalProps } from './over-screen-modal.props';
import { ActionButtonTypes } from '../action-button';

export const OverScreenModal = ({
  ratio = 1,
  title = '',
  action,
  children,
  onPressClose = () => undefined,
  onPressAction = () => undefined,
  onPressBack = () => undefined,
  showClose = true,
  showBack = false,
  actionLoading = false,
  actionStyle = [],
  actionEnabled = true,
  bottomComponent,
  containerStyle = [],
  titleStyle = [],
  ...modalProps
}: OverScreenModalProps): JSX.Element => {
  return (
    <Modal style={overScreenModalStyle} {...modalProps}>
      <View style={modalContainerStyle}>
        <View style={[...getModalWrapperStyle(ratio), ...containerStyle]}>
          <View style={titleBarStyle}>
            <View style={buttonWrapperStyle}>
              {showBack ? <BackButton onPress={onPressBack} /> : null}
            </View>
            <Text style={[...titleTextStyle, ...titleStyle]}>{title}</Text>
            <View style={buttonWrapperStyle}>
              {showClose ? (
                <IconButton onPress={onPressClose}>
                  <Image
                    style={closeButtonStyle}
                    source={closeIcon}
                    resizeMode={'contain'}
                  />
                </IconButton>
              ) : null}
            </View>
          </View>
          {children}
          {action ? (
            <ActionFooter
              buttonType={
                actionEnabled
                  ? ActionButtonTypes.primary
                  : ActionButtonTypes.disabled
              }
              isLoading={actionLoading}
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
