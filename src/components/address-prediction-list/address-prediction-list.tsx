import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ADDRESS_FORM_FIELDS } from '../../common/address/address-form';
import { getPostalCode, PredictionType } from '../../services/places-api';
import { indexedMap } from '../../utils/ramda';
import { split, trim } from 'ramda';

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
              onPress={async () => {
                const address = prediction.description;

                const addressDivided = split(',', address);

                const addressFirstLine =
                  (addressDivided[0] && trim(addressDivided[0])) || '';

                const addressCity =
                  (addressDivided[1] && trim(addressDivided[1])) || '';

                const addressState =
                  (addressDivided[2] && trim(addressDivided[2])) || '';

                const postalCode = await getPostalCode(
                  prediction.place_id,
                  addressState,
                );

                const addressSuggestion = {
                  [ADDRESS_FORM_FIELDS.FIRST_LINE]: addressFirstLine,
                  [ADDRESS_FORM_FIELDS.CITY]: addressCity,
                  [ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]: addressState,
                  [ADDRESS_FORM_FIELDS.POSTAL_CODE]: postalCode,
                };
                onItemPressed(addressSuggestion);
              }}>
              <Text>{prediction.description}</Text>
            </TouchableOpacity>
            {isLastItem ? null : <View style={dividerStyle} />}
          </View>
        );
      }, addressPredictions)}
    </View>
  );
};
