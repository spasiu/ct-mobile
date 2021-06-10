import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ROUTES_IDS } from '../routes/identifiers';
import { UserProfileScreen } from '../../scenes/user-profile/user-profile-screen';
import { BreakPreferencesScreen } from '../../scenes/break-preferences/break-preferences-screen';
import { EditBreakPreferencesScreen } from '../../scenes/edit-break-preferences/edit-break-preferences-screen';
import { NotificationPreferencesScreen } from '../../scenes/notification-preferences/notification-preferences-screen';
import { AddressesListScreen } from '../../scenes/addresses-list/addresses-list-screen';
import { EditAddressScreen } from '../../scenes/edit-address/edit-address-screen';

export type UserProfileStackParamList = {
  [ROUTES_IDS.USER_PROFILE_SCREEN]: undefined;
  [ROUTES_IDS.BREAK_PREFERENCES_SCREEN]: undefined;
  [ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN]: undefined;
  [ROUTES_IDS.NOTIFICATION_PREFERENCES_SCREEN]: undefined;
  [ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN]: undefined;
  [ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN]: undefined;
  [ROUTES_IDS.ADDRESSES_LIST_SCREEN]: undefined;
  [ROUTES_IDS.EDIT_ADDRESS_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<UserProfileStackParamList>();

export const UserProfileStack = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={ROUTES_IDS.USER_PROFILE_SCREEN}
      component={UserProfileScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.BREAK_PREFERENCES_SCREEN}
      component={BreakPreferencesScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN}
      component={EditBreakPreferencesScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.NOTIFICATION_PREFERENCES_SCREEN}
      component={NotificationPreferencesScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.PAYMENT_INFORMATION_LIST_SCREEN}
      component={UserProfileScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ADD_PAYMENT_INFORMATION_SCREEN}
      component={UserProfileScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.ADDRESSES_LIST_SCREEN}
      component={AddressesListScreen}
    />
    <Stack.Screen
      name={ROUTES_IDS.EDIT_ADDRESS_SCREEN}
      component={EditAddressScreen}
    />
  </Stack.Navigator>
);
