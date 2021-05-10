import React from 'react';
import { FlatList, View, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  TitleBar,
  Container,
  SearchInput,
  IconButton,
  FilterItem,
  Loading,
  BreakerCard,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { useBreakersQuery } from '../../services/api/requests';

import {
  breakerSelector,
  breakerProfileSelector,
} from './breakers-screen-utils';

export const BreakersScreen = ({ navigation }) => {
  const { loading, data } = useBreakersQuery({
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Container
      containerType={'fixed'}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.mh3, s.mb4]}>
        <TitleBar
          title={t('breakers.title')}
          rightElement={
            <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
              <FilterItem type="pill-alt" text={t('buttons.showFollowing')} />
              <IconButton style={[s.ml3]}>
                <Image
                  resizeMode={'cover'}
                  style={[s.circle_m]}
                  source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
                />
              </IconButton>
            </View>
          }
        />
        <SearchInput editable={false} />
      </View>
      {loading && !data ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          style={[s.flx_i, s.ph3]}
          data={data?.Users}
          renderItem={({ item }) => (
            <View style={[s.flx_i, s.aic, s.mb4]}>
              <BreakerCard
                {...breakerSelector(item)}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.BREAKER_SCREEN, {
                    breaker: breakerProfileSelector(item),
                    id: item.id,
                  })
                }
                containerStyle={[s.flx_i]}
                cardSize="large"
              />
            </View>
          )}
        />
      )}
    </Container>
  );
};
