import React, { useContext } from 'react';
import { ImageURISource } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { StatusBadgeTypes } from '../../components';
import { LiveScreen } from '../../scenes/live/live-screen';
import { EventDetailModal } from '../../scenes/event-detail/event-detail-modal';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { ROUTES_IDS } from '../routes/identifiers';
import { TabNavigator } from '../tab-navigator';

import { OnboardingStack } from './onboarding-stack';

export type ProtectedStackParamList = {
  [ROUTES_IDS.ONBOARDING_STACK]: undefined;
  [ROUTES_IDS.TAB_NAVIGATOR]: undefined;
  [ROUTES_IDS.LIVE_MODAL]: undefined;
  [ROUTES_IDS.EVENT_DETAIL_MODAL]: {
    modalTitle: string;
    id: string;
    title: string;
    image: ImageURISource;
    status: StatusBadgeTypes;
    description: string;
    league: string;
    eventDate: string;
    breaker: { name: string; image: ImageURISource };
  };
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
    </Stack.Navigator>
  );
};
