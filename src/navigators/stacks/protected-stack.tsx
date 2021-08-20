import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import firestore from '@react-native-firebase/firestore';
import Intercom from '@intercom/intercom-react-native';

import { LiveScreen } from '../../scenes/live/live-screen';
import { AuthContext, AuthContextType } from '../../providers/auth';

import { ROUTES_IDS } from '../routes/identifiers';
import { TabNavigator } from '../tab-navigator';

import { OnboardingStack } from './onboarding-stack';
import { Platform } from 'react-native';

export type ProtectedStackParamList = {
  [ROUTES_IDS.ONBOARDING_STACK]: undefined;
  [ROUTES_IDS.TAB_NAVIGATOR]: undefined;
  [ROUTES_IDS.LIVE_MODAL]: undefined;
};

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export const ProtectedStack = (): JSX.Element => {
  const { onboardingComplete, user } = useContext(
    AuthContext,
  ) as AuthContextType;

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        if (Platform.OS === 'ios' && data?.intercomIOS) {
          Intercom.setUserHash(data.intercomIOS);
          Intercom.registerIdentifiedUser({
            email: user?.email as string,
            userId: user?.uid,
          });
          subscriber();
        }

        if (Platform.OS === 'android' && data?.intercomAndroid) {
          Intercom.setUserHash(data.intercomAndroid);
          Intercom.registerIdentifiedUser({
            email: user?.email as string,
            userId: user?.uid,
          });
          subscriber();
        }
      });

    return () => subscriber();
  }, [user]);

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
    </Stack.Navigator>
  );
};
