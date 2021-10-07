import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ADDRESS_FORM_FIELDS } from '../../common/address/address-form';
import { getPostalCode, PredictionType } from '../../services/places-api';
import { indexedMap } from '../../utils/ramda';

import {
  containerStyle,
  firstRowSpacing,
  defaultRowSpacing,
  dividerStyle,
} from './address-prediction-list.presets';
import { AddressPredictionListProps } from './address-prediction-list.props';

export const AddressPredictionList = ({
  addressPredictions = [],
  onItemPressed = () => undefined,
}: AddressPredictionListProps): JSX.Element => {
  const handleOnPress = async (prediction: PredictionType) => {
    const address = prediction.description;
    const addressDivided = address.split(',');
    const addressFirstLine = addressDivided[0]?.trim() || '';
    const addressCity = addressDivided[1]?.trim() || '';
    const addressState = addressDivided[2]?.trim() || '';
    const postalCode = await getPostalCode(prediction.place_id);

    const addressSuggestion = {
      [ADDRESS_FORM_FIELDS.FIRST_LINE]: addressFirstLine,
      [ADDRESS_FORM_FIELDS.CITY]: addressCity,
      [ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]: addressState,
      [ADDRESS_FORM_FIELDS.POSTAL_CODE]: postalCode,
    };

    onItemPressed(addressSuggestion);
  };

  return (
    <View style={containerStyle}>
      {indexedMap((addressPrediction, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === addressPredictions.length - 1;
        const prediction = addressPrediction as PredictionType;

        return (
          <View key={prediction.place_id}>
            <TouchableOpacity
              style={isFirstItem ? firstRowSpacing : defaultRowSpacing}
              onPress={() => handleOnPress(prediction)}>
              <Text>{prediction.description}</Text>
            </TouchableOpacity>
            {isLastItem ? null : <View style={dividerStyle} />}
          </View>
        );
      }, addressPredictions)}
    </View>
  );
};
