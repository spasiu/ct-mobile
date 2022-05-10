import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import Config from 'react-native-config';
import Intercom from '@intercom/intercom-react-native';

import {
  userUsernameSelector,
  userNameSelector,
  userImageSelector,
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
  WarningModal,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { Users } from '../../services/api/requests';

import { UserProfileScreenProps } from './user-profile-screen.props';
import {
  userIcon,
  breakPreferencesIcon,
  rulesOfPlayIcon,
  termsOfServiceIcon,
  privacyPolicyIcon,
  chatIcon,
  logoutIcon,
  failedEmojiIcon,
} from './user-profile-screen.presets';
import { UserSaves } from './user-saves';
import {
  useUserProfileScreenHook,
  deleteUser,
} from './user-profile-screen.logic';

export const UserProfileScreen = ({
  navigation,
}: UserProfileScreenProps): JSX.Element => {
  const {
    logout,
    uploadPhoto,
    userId,
    getDefaultPaymentCard,
    cleanPaymentInfo,
    cleanFilters,
    cleanNotificationData,
    uploadingPhoto,
    setUploadingPhoto,
    confirmDelete,
    setConfirmDelete,
    loading,
    updateUserMutation,
    isRefetching,
    user,
  } = useUserProfileScreenHook();

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
                      userId,
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
                onPress={() => {
                  cleanPaymentInfo();
                  cleanFilters();
                  cleanNotificationData();
                  logout();
                }}
              />
              <RowLink
                icon={failedEmojiIcon}
                text={t('buttons.delete')}
                containerStyle={[s.mb2]}
                onPress={() => setConfirmDelete(true)}
              />
            </View>
          </>
        )}
      </ScrollView>
      <WarningModal
        title={t('account.confirmDelete')}
        description={t('warningModal.delete')}
        visible={confirmDelete}
        primaryActionText={t('buttons.delete')}
        onPrimaryActionPressed={() => {
          cleanPaymentInfo();
          cleanFilters();
          cleanNotificationData();
          logout();
          deleteUser({ id: userId });
        }}
        secondaryActionText={t('buttons.cancel')}
        onSecondaryActionPressed={() => setConfirmDelete(false)}
        loadingPrimaryAction={loading}
      />
    </Container>
  );
};
