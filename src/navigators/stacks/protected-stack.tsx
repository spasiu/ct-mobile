import React, { useContext } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { LiveScreen } from '../../scenes/live/live-screen';
import { BreakDetailModal } from '../../scenes/break-detail/break-detail-modal';
import { EventDetailModal } from '../../scenes/event-detail/event-detail-modal';
import { HitDetailModal } from '../../scenes/hit-detail/hit-detail-modal';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { ROUTES_IDS } from '../routes/identifiers';
import { TabNavigator } from '../tab-navigator';

import { OnboardingStack } from './onboarding-stack';

export type ProtectedStackParamList = {
  [ROUTES_IDS.ONBOARDING_STACK]: undefined;
  [ROUTES_IDS.TAB_NAVIGATOR]: undefined;
  [ROUTES_IDS.LIVE_MODAL]: undefined;
  [ROUTES_IDS.EVENT_DETAIL_MODAL]: undefined;
  [ROUTES_IDS.BREAK_DETAIL_MODAL]: undefined;
  [ROUTES_IDS.HIT_DETAIL_MODAL]: undefined;
};

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export const ProtectedStack = (): JSX.Element => {
  const { onboardingComplete } = useContext(AuthContext) as AuthContextType;
  return (
    <Stack.Navigator
      initialRouteName={
        onboardingComplete
          ? ROUTES_IDS.TAB_NAVIGATOR
          : ROUTES_IDS.ONBOARDING_STACK
      }
      screenOptions={{
        headerShown: false,
        stackPresentation: 'fullScreenModal',
      }}>
      {onboardingComplete ? (
        <Stack.Screen
          name={ROUTES_IDS.TAB_NAVIGATOR}
          component={TabNavigator}
        />
      ) : (
        <Stack.Screen
          name={ROUTES_IDS.ONBOARDING_STACK}
          component={OnboardingStack}
        />
      )}
      <Stack.Screen name={ROUTES_IDS.LIVE_MODAL} component={LiveScreen} />
      <Stack.Screen
        name={ROUTES_IDS.EVENT_DETAIL_MODAL}
        component={EventDetailModal}
      />
      <Stack.Screen
        name={ROUTES_IDS.BREAK_DETAIL_MODAL}
        component={BreakDetailModal}
      />
      <Stack.Screen
        name={ROUTES_IDS.HIT_DETAIL_MODAL}
        component={HitDetailModal}
      />
    </Stack.Navigator>
  );
};
