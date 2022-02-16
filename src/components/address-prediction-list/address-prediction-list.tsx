import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ADDRESS_FORM_FIELDS } from '../../common/address/address-form';
import { getPostalCode, PredictionType } from '../../services/places-api';
import { AddressPredictionListProps } from './address-prediction-list.props';
import {
  containerStyle,
  firstRowSpacing,
  defaultRowSpacing,
  dividerStyle,
} from './address-prediction-list.presets';

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
      {addressPredictions.map((prediction, i, predicitions) => (
        <View key={prediction.place_id}>
          <TouchableOpacity
            style={i == 0 ? firstRowSpacing : defaultRowSpacing}
            onPress={() => handleOnPress(prediction)}>
            <Text>{prediction.description}</Text>
          </TouchableOpacity>
          {i == predicitions.length - 1 ? null : <View style={dividerStyle} />}
        </View>
      ))}
    </View>
  );
};
