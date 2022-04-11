import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { ResultsScreen } from '../../scenes/results/results-screen';

export type ResultsStackParamList = {
  [ROUTES_IDS.RESULTS_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<ResultsStackParamList>();

export const ResultsStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={ROUTES_IDS.RESULTS_SCREEN} component={ResultsScreen} />
  </Stack.Navigator>
);
