import React, { useContext, useEffect } from 'react';
import { Platform, AppState } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import firestore from '@react-native-firebase/firestore';
import Intercom from '@intercom/intercom-react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { LiveScreen } from '../../scenes/live/live-screen';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { ROUTES_IDS } from '../routes/identifiers';
import { TabNavigator } from '../tab-navigator';

import { OnboardingStack } from './onboarding-stack';

import {
  NotificationContext,
  NotificationContextType,
} from '../../providers/notification';

export type ProtectedStackParamList = {
  [ROUTES_IDS.ONBOARDING_STACK]: undefined;
  [ROUTES_IDS.TAB_NAVIGATOR]: undefined;
  [ROUTES_IDS.LIVE_MODAL]: {
    eventId: string;
  };
};

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export const ProtectedStack = (): JSX.Element => {
  const { onboardingComplete, user, getValidAuthToken } = useContext(
    AuthContext,
  ) as AuthContextType;
  const { setRegisteredInIntercom } = useContext(
    NotificationContext,
  ) as NotificationContextType;
  const { getCards } = useContext(PaymentContext) as PaymentContextType;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user?.uid)
      .onSnapshot(async documentSnapshot => {
        const data = documentSnapshot.data();
        if (Platform.OS === 'ios' && data?.intercomIOS) {
          await Intercom.setUserHash(data.intercomIOS);
        }

        if (Platform.OS === 'android' && data?.intercomAndroid) {
          await Intercom.setUserHash(data.intercomAndroid);
        }

        await Intercom.registerIdentifiedUser({
          email: user?.email as string,
          userId: user?.uid,
        });

        setRegisteredInIntercom(true);
        unsubscribe();
      });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    getValidAuthToken(user)
      .then(() => getCards(user as FirebaseAuthTypes.User))
      .catch(e => {}) // TODO use new error handling  
  }, []);

  useEffect(() => {
    AppState.addEventListener(
      'change',
      nextAppState =>
        nextAppState === 'active' &&
        Intercom.handlePushMessage().then(res => {
          // TODO: add logic to handle intercom pushes
        }),
    );
    return () => AppState.removeEventListener('change', () => true);
  }, []);

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
