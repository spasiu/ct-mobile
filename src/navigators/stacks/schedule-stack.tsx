import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { ScheduleScreen } from '../../scenes/schedule/schedule-screen';

type ScheduleStackParamList = {
  [ROUTES_IDS.SCHEDULE_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<ScheduleStackParamList>();

export const ScheduleStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={ROUTES_IDS.SCHEDULE_SCREEN}
      component={ScheduleScreen}
    />
  </Stack.Navigator>
);
