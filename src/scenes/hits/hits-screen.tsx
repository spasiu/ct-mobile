import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';

import {
  HitCard,
  TitleBar,
  Container,
  ContainerTypes,
  SearchInput,
  FilterItem,
  Avatar,
  Loading,
} from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { WINDOW_WIDTH } from '../../theme/sizes';
import { t } from '../../i18n/i18n';
import {
  NewHitsDocument,
  useHitsQuery,
  useUserImageQuery,
} from '../../services/api/requests';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { userSelector, userImageSelector } from '../../common/user-profile';

import { HitDetailModal } from '../hit-detail/hit-detail-modal';
import { hitsSelector } from '../../common/hit/hit-selectors';

import { HitsScreenProps } from './hits-screen.props';
import { completeHits, NUMBER_OF_COLUMNS } from './hits-screen.utils';

export const HitsScreen = ({ navigation }: HitsScreenProps): JSX.Element => {
  const cardWidth = (WINDOW_WIDTH - sizes.mv3 * 2 - 40) / NUMBER_OF_COLUMNS;
  const cardHeight = cardWidth * 1.3;

  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [hitDetail, setHitDetail] = useState({});

  const { data: users } = useUserImageQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const { data: requestData, loading, subscribeToMore } = useHitsQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    subscribeToMore({
      document: NewHitsDocument,
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = userSelector(users);
  const hits = hitsSelector(requestData);
  return (
    <Container
      containerType={ContainerTypes.fixed}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.mh3, s.mb4]}>
        <TitleBar
          title={t('hits.title')}
          rightElement={
            <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
              <FilterItem
                style={[s.mr3]}
                type="pill_alt"
                text={t('buttons.myHits')}
              />
              <Avatar
                src={userImageSelector(user)}
                onPress={() =>
                  navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)
                }
              />
            </View>
          }
        />
        <SearchInput editable={false} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            style={[s.flx_i, s.ph3]}
            numColumns={NUMBER_OF_COLUMNS}
            data={hits.length < NUMBER_OF_COLUMNS ? completeHits(hits) : hits}
            contentContainerStyle={[s.jcfs]}
            keyExtractor={(_, index) => `main-hits-${index}`}
            renderItem={({ item }) => {
              if (isEmpty(item)) {
                return (
                  <View style={[{ width: cardWidth, height: cardHeight }]} />
                );
              }
              return (
                <HitCard
                  onPress={() => setHitDetail(item)}
                  title={item.player}
                  image={item.image_front}
                  containerStyle={[s.flx_i, s.jcfs]}
                  textStyle={[s.flx_i, { height: sizes.h2 * 1.8 }, s.f6]}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  cardStyle={[s.br3]}
                />
              );
            }}
          />
          <HitDetailModal
            isVisible={!isEmpty(hitDetail)}
            onPressClose={() => setHitDetail({})}
            {...hitDetail}
          />
        </>
      )}
    </Container>
  );
};
