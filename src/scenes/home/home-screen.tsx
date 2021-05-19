import React from 'react';
import { View, ScrollView, FlatList, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  HitCard,
  BreakerCard,
  FilterItem,
  LeagueIcon,
  SectionHeader,
  SearchInput,
  FeaturedBreakCard,
  NavigationBar,
  IconButton,
  Loading,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { indexedMap } from '../../utils/ramda';
import { formatScheduledStatus } from '../../utils/date';
import {
  useFeaturedBreaksQuery,
  NewFeaturedBreaksDocument,
  useFeaturedBreakersQuery,
} from '../../services/api/requests';

const PAGE_DATA = [
  {
    title: t('sections.leagues'),
    key: 'leagues',
    data: [
      {
        id: 201,
        key: 'baseball',
      },
      {
        id: 202,
        key: 'basketball',
      },
      {
        id: 203,
        key: 'football',
      },
      {
        id: 204,
        key: 'soccer',
      },
      {
        id: 205,
        key: 'hockey',
      },
    ],
  },
  {
    title: t('sections.featuredBreaks'),
    key: 'featured_breaks',
  },
  {
    title: t('sections.recentHits'),
    key: 'recent_hits',
    data: [
      {
        id: 210,
        name: 'Luis Robert',
      },
      {
        id: 211,
        name: 'Ceedee Lamb',
      },
      {
        id: 212,
        name: 'Deshaun Watson',
      },
      {
        id: 213,
        name: 'Luis Robert',
      },
      {
        id: 214,
        name: 'Ceedee Lamb',
      },
      {
        id: 215,
        name: 'Deshaun Watson',
      },
    ],
  },
  {
    title: t('sections.meetTheBreakers'),
    key: 'meet_the_breakers',
  },
];

export const HomeScreen = ({ navigation }) => {
  const {
    loading: featuredBreaksLoading,
    data: featuredBreaks,
    subscribeToMore: featuredBreaksSubscription,
  } = useFeaturedBreaksQuery({
    fetchPolicy: 'cache-and-network',
  });

  const {
    loading: featuredBreakersLoading,
    data: featuredBreakers,
  } = useFeaturedBreakersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const loadingBreakers = featuredBreakersLoading && !featuredBreakers;
  const loadingBreaks = featuredBreaksLoading && !featuredBreaks;

  if (featuredBreaksLoading && !featuredBreaks) {
    return <Loading />;
  }

  featuredBreaksSubscription({
    document: NewFeaturedBreaksDocument,
    updateQuery: (prev, { subscriptionData }) => subscriptionData.data || prev,
  });

  return (
    <Container
      style={[s.mh0]}
      containerType={ContainerTypes.fixed}
      safeAreaEdges={['top', 'left', 'right']}>
      <View style={[s.flx_i]}>
        <NavigationBar>
          <View style={[s.flx_i]}>
            <SearchInput
              style={[s.flx_i, s.mv3]}
              editable={false}
              onTouchStart={() => {}}
            />
          </View>
          <View style={[s.flx_ratio(0.15), s.aife, s.jcc]}>
            <IconButton
              onPress={() =>
                navigation.navigate(ROUTES_IDS.USER_PROFILE_SCREEN)
              }>
              <Image
                style={[s.circle_m]}
                source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
              />
            </IconButton>
          </View>
        </NavigationBar>
        <ScrollView contentContainerStyle={[s.pb4, s.ml3]}>
          {indexedMap(({ title, key }, index) => {
            const dataSource = {
              leagues: PAGE_DATA[0].data,
              featured_breaks: featuredBreaks?.Breaks,
              recent_hits: PAGE_DATA[2].data,
              meet_the_breakers: featuredBreakers?.Users,
            };

            return (
              <View key={index}>
                <SectionHeader
                  title={title}
                  actionText={index !== 0 && t('buttons.seeAll')}
                  containerStyle={[s.mr3]}
                  onActionPressed={() => {
                    const destinations = {
                      1: ROUTES_IDS.SCHEDULE_TAB,
                      2: ROUTES_IDS.HITS_TAB,
                      3: ROUTES_IDS.BREAKERS_TAB,
                    };
                    navigation.navigate(destinations[index]);
                  }}
                />
                <FlatList
                  keyExtractor={item => item.id}
                  horizontal
                  data={dataSource[key]}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    if (key === 'leagues') {
                      return (
                        <FilterItem
                          type={'circle'}
                          style={[s.ml1, s.mb2, s.mr2]}>
                          <LeagueIcon league={item.key} />
                        </FilterItem>
                      );
                    }

                    if (key === 'featured_breaks') {
                      return (
                        <FeaturedBreakCard
                          containerStyle={[s.mr3, s.mb3]}
                          status={item.Event.status.toLowerCase()}
                          eventDate={formatScheduledStatus(
                            item.Event.start_time,
                          )}
                          viewCount={'320'}
                          image={{
                            uri:
                              item.image ||
                              'https://source.unsplash.com/600x801/?sports',
                          }}
                          title={item.title}
                          description={item.description}
                          onPress={() =>
                            navigation.navigate(ROUTES_IDS.LIVE_MODAL)
                          }
                        />
                      );
                    }

                    if (key === 'recent_hits') {
                      return (
                        <HitCard
                          onPress={() =>
                            navigation.navigate(ROUTES_IDS.HIT_DETAIL_MODAL, {})
                          }
                          containerStyle={[s.mr3, s.mb3]}
                          image={{
                            uri: 'https://source.unsplash.com/363x522/?sports',
                          }}
                          title={item.name}
                        />
                      );
                    }

                    if (key === 'meet_the_breakers') {
                      return (
                        <BreakerCard
                          onPress={() =>
                            navigation.navigate(ROUTES_IDS.BREAKERS_TAB, {
                              screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                              initial: false,
                              params: {
                                id: item.id,
                                breaker: item.Profile,
                              },
                            })
                          }
                          containerStyle={[s.mb3, s.mr3]}
                          title={`${item.Profile.first_name} ${item.Profile.last_name}`}
                          description={item.Profile.bio}
                          image={{
                            uri: item.Profile.image,
                          }}
                        />
                      );
                    }

                    return null;
                  }}
                />
              </View>
            );
          }, PAGE_DATA)}
        </ScrollView>
      </View>
    </Container>
  );
};
