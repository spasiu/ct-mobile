import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';

import { PaymentInformationListScreen } from '../../scenes/payment-information-list/payment-information-list-screen';
import { AddPaymentInformationScreen } from '../../scenes/add-payment-information/add-payment-information-screen';

export type PaymentStackParamList = {
  [ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN]: undefined;
  [ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<PaymentStackParamList>();

export const PaymentStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN}
      component={PaymentInformationListScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN}
      component={AddPaymentInformationScreen}
    />
  </Stack.Navigator>
);
