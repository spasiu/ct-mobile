import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  RowLink,
} from '../../components';
import {
  PRICING_OPTIONS,
  SPORTS_OPTIONS,
  BREAK_TYPE_OPTIONS,
} from '../../common/break-preferences';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';

import { BreakPreferencesScreenProps } from './break-preferences-screen.props';
import {
  breakTypeIcon,
  sportIcon,
  pricingIcon,
} from './break-preferences-screen.presets';
import { BreakType } from '../../common/break';
import { useUserPreferencesLazyQuery } from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  userBreakPreferencesSelector,
  userSelector,
} from '../../common/user-profile';

export const BreakPreferencesScreen = ({
  navigation,
}: BreakPreferencesScreenProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [getUserPreferences, { data }] = useUserPreferencesLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  useEffect(() => {
    getUserPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = userSelector(data);
  const breakPreferences = userBreakPreferencesSelector(user);
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('breakPreferences.title')}
      />
      <ScrollView contentContainerStyle={[s.ph3]}>
        <RowLink
          icon={breakTypeIcon}
          iconStyle={[s.tint_black]}
          text={t('breakPreferences.breakTypeRow')}
          containerStyle={[s.mb2]}
          onPress={() =>
            navigation.navigate(ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN, {
              content: BREAK_TYPE_OPTIONS,
              userSelection: breakPreferences.break_type as BreakType,
              pageTitle: t('breakPreferences.breakTypeRow'),
            })
          }
        />
        <RowLink
          icon={sportIcon}
          text={t('breakPreferences.sportRow')}
          containerStyle={[s.mb2]}
          onPress={() =>
            navigation.navigate(ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN, {
              content: SPORTS_OPTIONS,
              userSelection: breakPreferences.sports as BreakType,
              pageTitle: t('breakPreferences.sportRow'),
            })
          }
        />
        <RowLink
          icon={pricingIcon}
          text={t('breakPreferences.pricingRow')}
          containerStyle={[s.mb2]}
          onPress={() =>
            navigation.navigate(ROUTES_IDS.EDIT_BREAK_PREFERENCES_SCREEN, {
              content: PRICING_OPTIONS,
              userSelection: breakPreferences.pricing as BreakType,
              pageTitle: t('breakPreferences.pricingRow'),
            })
          }
        />
      </ScrollView>
    </Container>
  );
};
