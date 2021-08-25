import React from 'react';
import { useState } from 'react';
import { View, Text, LayoutRectangle } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { ActionButton } from '../action-button';
import { BuyButton } from '../buy-button';

import {
  containerPreset,
  actionButtonStyle,
  actionButtonTextStyle,
  handleDefaultStyle,
  contentStyle,
  childrenWrapperStyle,
  actionButtonWrapperStyle,
  boxWrapperStyle,
  handleTextStyle,
  textContainerStyle,
} from './sliding-box.presets';
import { SlidingBoxProps } from './sliding-box.props';

export const SlidingBox = ({
  children,
  isActionBuy = false,
  actionText = '',
  actionDisabled = false,
  onPressAction = () => undefined,
  containerStyle = [],
  handleStyle = [],
  handleText = '',
  onPressBox = () => undefined,
}: SlidingBoxProps): JSX.Element => {
  const [handleDimensions, setHandleDimensions] = useState<LayoutRectangle>();
  const [textDimensions, setTextDimensions] = useState<LayoutRectangle>();

  const dimensionsSet = handleDimensions && textDimensions;
  const textTopPosition = dimensionsSet
    ? (handleDimensions as LayoutRectangle).height / 2 -
      (textDimensions as LayoutRectangle).height / 2
    : 0;

  const textLeftPosition = dimensionsSet
    ? (handleDimensions as LayoutRectangle).width / 2 -
      (textDimensions as LayoutRectangle).width / 2
    : 0;
  return (
    <BorderlessButton
      onPress={onPressBox}
      style={[...containerPreset, ...containerStyle]}>
      <View style={boxWrapperStyle}>
        <View
          style={[...handleDefaultStyle, ...handleStyle]}
          onLayout={event => setHandleDimensions(event.nativeEvent.layout)}
        />
        <View style={contentStyle}>
          <View style={childrenWrapperStyle}>
            {children}
            <View style={actionButtonWrapperStyle}>
              {isActionBuy ? (
                <BuyButton disabled={actionDisabled} onPress={onPressAction} />
              ) : (
                <ActionButton
                  style={actionButtonStyle}
                  textStyle={actionButtonTextStyle}
                  text={actionText}
                  onPress={onPressAction}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          ...textContainerStyle,
          {
            top: textTopPosition,
            left: textLeftPosition,
          },
        ]}>
        <Text
          onLayout={event => setTextDimensions(event.nativeEvent.layout)}
          style={handleTextStyle}>
          {handleDimensions && textDimensions ? handleText : ''}
        </Text>
      </View>
    </BorderlessButton>
  );
};
