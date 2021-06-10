import React, { useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  RowLink,
  AddressRowLink,
  PaymentRowLink,
  AvatarUpload,
  Loading,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useLoggedUserQuery } from '../../services/api/requests';

const userIcon = require('../../assets/user-icon.png');
const breakPreferencesIcon = require('../../assets/break-preferences-icon.png');
const notificationsIcon = require('../../assets/notifications-icon.png');
const rulesOfPlayIcon = require('../../assets/rules-of-play-icon.png');
const termsOfServiceIcon = require('../../assets/terms-of-service-icon.png');
const privacyPolicyIcon = require('../../assets/privacy-policy-icon.png');
const chatIcon = require('../../assets/chat-icon.png');
const logoutIcon = require('../../assets/logout-icon.png');

export const UserProfileScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useLoggedUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: 'jmrSPHmVoCOx7vBdDdNIr1ulE6u2',
    },
  });
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
        {loading ? (
          <Loading />
        ) : (
          <>
            <View style={[s.flx_i, s.aic]}>
              <AvatarUpload image={data?.Users[0].image} />
              <Text style={[s.ff_b, s.f5, s.mt3, s.mb4]}>
                {`@${data?.Users[0].username}`}
              </Text>
            </View>
            <View style={[s.mb4]}>
              <Text style={[s.ff_b, s.f4, s.mb3]}>
                {t('profile.accountDetailsSection')}
              </Text>
              <RowLink
                icon={userIcon}
                text={`${data?.Users[0].first_name} ${data?.Users[0].last_name}`}
                containerStyle={[s.mb2]}
                showArrow={false}
                enabled={false}
              />
              <PaymentRowLink containerStyle={[s.mb2]} />
              <AddressRowLink
                containerStyle={[s.mb2]}
                onPress={() => {
                  navigation.navigate(ROUTES_IDS.ADDRESSES_LIST_SCREEN, {
                    addresses: data?.Users[0].Addresses,
                    recipient: `${data?.Users[0].first_name} ${data?.Users[0].last_name}`,
                  });
                }}
              />
              <RowLink
                icon={breakPreferencesIcon}
                text={t('profile.breakPreferences')}
                containerStyle={[s.mb2]}
                onPress={() => {
                  navigation.navigate(ROUTES_IDS.BREAK_PREFERENCES_SCREEN, {
                    breakPreferences: data?.Users[0].UserPreferences,
                  });
                }}
              />
              <RowLink
                icon={notificationsIcon}
                text={t('profile.notifications')}
                containerStyle={[s.mb2]}
                onPress={() => {
                  navigation.navigate(
                    ROUTES_IDS.NOTIFICATION_PREFERENCES_SCREEN,
                    {
                      notificationPreferences: data?.Users[0].Notifications,
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
              />
              <RowLink
                icon={termsOfServiceIcon}
                text={t('profile.termsOfService')}
                containerStyle={[s.mb2]}
              />
              <RowLink
                icon={privacyPolicyIcon}
                text={t('profile.privacyPolicy')}
                containerStyle={[s.mb2]}
              />
              <RowLink
                icon={chatIcon}
                text={t('profile.chat')}
                containerStyle={[s.mb2]}
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
