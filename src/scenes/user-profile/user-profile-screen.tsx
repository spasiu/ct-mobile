import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { NetworkStatus } from '@apollo/client';
import Intercom from '@intercom/intercom-react-native';

import {
  userSelector,
  userUsernameSelector,
  userNameSelector,
  userImageSelector,
  userNotificationsSelector,
  userDefaultAddressSingleLineSelector,
} from '../../common/user-profile';
import {
  Container,
  ContainerTypes,
  NavigationBar,
  RowLink,
  AddressRowLink,
  PaymentMethods,
  PaymentRowLink,
  AvatarUpload,
  Loading,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import {
  useLoggedUserQuery,
  useUpdateUserMutation,
  Users,
} from '../../services/api/requests';

import { UserProfileScreenProps } from './user-profile-screen.props';
import {
  userIcon,
  breakPreferencesIcon,
  notificationsIcon,
  rulesOfPlayIcon,
  termsOfServiceIcon,
  privacyPolicyIcon,
  chatIcon,
  logoutIcon,
} from './user-profile-screen.presets';
import { UserSaves } from './user-saves';

export const UserProfileScreen = ({
  navigation,
}: UserProfileScreenProps): JSX.Element => {
  const { logout, uploadPhoto, user: authUser } = useContext(
    AuthContext,
  ) as AuthContextType;
  const { getCards, getDefaultPaymentCard } = useContext(
    PaymentContext,
  ) as PaymentContextType;

  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    getCards(authUser as FirebaseAuthTypes.User);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading, refetch, networkStatus } = useLoggedUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const [updateUserMutation] = useUpdateUserMutation({
    onError: () => setUploadingPhoto(false),
    onCompleted: () => {
      refetch();
      setUploadingPhoto(false);
    },
  });

  const isRefetching = networkStatus === NetworkStatus.refetch;
  const user = userSelector(data);
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('profile.title')}
      />
      <ScrollView contentContainerStyle={[s.mh3]}>
        {loading && !isRefetching ? (
          <Loading />
        ) : (
          <>
            <View style={[s.flx_i, s.aic]}>
              <AvatarUpload
                isLoading={uploadingPhoto}
                image={userImageSelector(user as Users)}
                onNewImageSelected={async response => {
                  setUploadingPhoto(true);
                  const url = await uploadPhoto(response);
                  updateUserMutation({
                    variables: {
                      userId: authUser?.uid,
                      userInput: {
                        image: url,
                      },
                    },
                  });
                }}
              />
              <Text style={[s.ff_b, s.f5, s.mt3, s.mb4]}>
                {`@${userUsernameSelector(user as Users)}`}
              </Text>
            </View>
            <UserSaves />
            <View style={[s.mb4]}>
              <Text style={[s.ff_b, s.f4, s.mb3]}>
                {t('profile.accountDetailsSection')}
              </Text>
              <RowLink
                icon={userIcon}
                text={userNameSelector(user as Users)}
                containerStyle={[s.mb2]}
                showArrow={false}
                enabled={false}
              />
              <PaymentRowLink
                paymentMethod={PaymentMethods.card}
                cardInfo={getDefaultPaymentCard()}
                containerStyle={[s.mb2]}
                onPress={() => navigation.navigate(ROUTES_IDS.PAYMENT_STACK)}
              />
              <AddressRowLink
                address={userDefaultAddressSingleLineSelector(user as Users)}
                containerStyle={[s.mb2]}
                onPress={() => {
                  navigation.navigate(ROUTES_IDS.ADDRESSES_LIST_SCREEN);
                }}
              />
              <RowLink
                icon={breakPreferencesIcon}
                text={t('profile.breakPreferences')}
                containerStyle={[s.mb2]}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.BREAK_PREFERENCES_SCREEN)
                }
              />
              <RowLink
                icon={notificationsIcon}
                text={t('profile.notifications')}
                containerStyle={[s.mb2]}
                onPress={() => {
                  navigation.navigate(
                    ROUTES_IDS.NOTIFICATION_PREFERENCES_SCREEN,
                    {
                      notificationPreferences: userNotificationsSelector(
                        user as Users,
                      ),
                    },
                  );
                }}
              />
            </View>
            <View style={[s.mb4]}>
              <Text style={[s.ff_b, s.f4, s.mb3]}>
                {t('profile.helpSection')}
              </Text>
              <RowLink
                icon={rulesOfPlayIcon}
                text={t('profile.rulesOfPlay')}
                containerStyle={[s.mb2]}
                onPress={() => Intercom.displayHelpCenter()}
              />
              <RowLink
                icon={termsOfServiceIcon}
                text={t('profile.termsOfService')}
                containerStyle={[s.mb2]}
                onPress={() =>
                  Intercom.displayArticle(
                    Config.INTERCOM_PRIVACY_TERMS_OF_SERVICE_ARTICLE_ID,
                  )
                }
              />
              <RowLink
                icon={privacyPolicyIcon}
                text={t('profile.privacyPolicy')}
                containerStyle={[s.mb2]}
                onPress={() =>
                  Intercom.displayArticle(
                    Config.INTERCOM_PRIVACY_POLICY_ARTICLE_ID,
                  )
                }
              />
              <RowLink
                icon={chatIcon}
                text={t('profile.chat')}
                containerStyle={[s.mb2]}
                onPress={() => Intercom.displayMessenger()}
              />
              <RowLink
                icon={logoutIcon}
                text={t('buttons.logout')}
                containerStyle={[s.mb2]}
                onPress={() => logout()}
              />
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
};
