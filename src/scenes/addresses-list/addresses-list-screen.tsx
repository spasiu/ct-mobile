import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  NavigationBar,
  TextLink,
  ActionFooter,
  ActionButton,
  ActionButtonTypes,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators';
import { indexedMap } from '../../utils/ramda';

export const AddressesListScreen = ({ navigation, route }) => {
  const { addresses, recipient } = route.params;
  return (
    <Container
      style={[s.mh0]}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={t('addresses.deliveryAddress')}
      />
      <ScrollView contentContainerStyle={[s.ph3]}>
        {indexedMap(address => {
          return (
            <View
              key={address.id}
              style={[s.flx_row, s.bg_white, s.ph3, s.pv3, s.br4]}>
              <View style={[s.flx_ratio(0.2)]}>
                <View style={[s.circle_s, s.bg_white, s.ba, s.b__black_40]} />
              </View>
              <View style={[s.flx_i]}>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>{recipient}</Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>{address.line1}</Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>{address.line2}</Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>{address.city}</Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {address.postal_zip_code}
                </Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {address.state_provice_region}
                </Text>
                <Text style={[s.ff_alt_sb, s.f5, s.mb2]}>
                  {address.country}
                </Text>
              </View>
              <View style={[s.flx_ratio(0.2), s.aife, s.jcfs]}>
                <TextLink
                  onPress={() =>
                    navigation.navigate(ROUTES_IDS.EDIT_ADDRESS_SCREEN, {
                      address: {
                        ...address,
                        recipient,
                      },
                    })
                  }
                  textStyle={[s.ff_alt_r]}
                  text={t('buttons.edit')}
                />
              </View>
            </View>
          );
        }, addresses)}
      </ScrollView>
      <View style={[s.mh3]}>
        <ActionFooter
          buttonText={t('buttons.save')}
          topElement={
            <ActionButton
              buttonType={ActionButtonTypes.tertiary}
              text={t('buttons.addDeliveryAddress')}
              style={[s.mb3]}
            />
          }
        />
      </View>
    </Container>
  );
};
