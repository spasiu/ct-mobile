import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { View } from 'react-native';

import { ROUTES_IDS } from '../routes/identifiers';

type PublicStackParamList = {
  [ROUTES_IDS.LOGIN_SCREEN]: undefined;
  [ROUTES_IDS.SIGN_UP_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

const GenericScreen = () => <View />;

export const PublicStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={ROUTES_IDS.LOGIN_SCREEN} component={GenericScreen} />
    <Stack.Screen name={ROUTES_IDS.SIGN_UP_SCREEN} component={GenericScreen} />
  </Stack.Navigator>
);
