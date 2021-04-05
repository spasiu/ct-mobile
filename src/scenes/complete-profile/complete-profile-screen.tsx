import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ActionFooter,
  FormInput,
  TitleBar,
  AvatarUpload,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';

export const CompleteProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType="scroll">
      <View style={[s.flx_i, s.jcfs, s.aic, s.mb4]}>
        <TitleBar
          title={t('account.completeProfileTitle')}
          subtitle={t('account.completeProfileSubtitle')}
        />
        <AvatarUpload containerStyle={[s.mv4]} />
        <View style={[s.flx_i, s.w_100, s.jcfs]}>
          <FormInput label={t('forms.usernameLabel')} />
        </View>
      </View>
      <ActionFooter
        buttonText={t('buttons.createAccount')}
        onPress={() => navigation.navigate(ROUTES_IDS.INSTRUCTIONS_SCREEN)}
      />
    </Container>
  );
};
