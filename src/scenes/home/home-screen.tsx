import React from 'react';
import { View, ScrollView, FlatList, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { usersSelector } from '../../common/user-profile';
import { breaksSelector } from '../../common/break';
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
  FilterItemTypes,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { indexedMap } from '../../utils/ramda';
import {
  useFeaturedBreaksQuery,
  NewFeaturedBreaksDocument,
  useFeaturedBreakersQuery,
  Breaks,
  Users,
} from '../../services/api/requests';

import {
  HomeScreenProps,
  HomeSectionData,
  HomeSection,
  HomeSectionDataSource,
  HomeSportsData,
} from './home-screen.props';
import { SectionsData, SportsData, HitsData } from './home-screen.presets';
import {
  featuredBreakSelector,
  featuredBreakerSelector,
} from './home-screen.utils';
import { HitsStackParamList, TabNavigatorParamList } from '../../navigators';

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const {
    data: featuredBreaks,
    subscribeToMore: featuredBreaksSubscription,
  } = useFeaturedBreaksQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: featuredBreakers } = useFeaturedBreakersQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (!featuredBreakers && !featuredBreaks) {
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
              onTouchStart={() => {
                console.log('on search');
              }}
            />
          </View>
          <View style={[s.flx_ratio(0.15), s.aife, s.jcc]}>
            <IconButton
              onPress={() =>
                navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)
              }>
              <Image
                style={[s.circle_m]}
                source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
              />
            </IconButton>
          </View>
        </NavigationBar>
        <ScrollView contentContainerStyle={[s.pb4, s.ml3]}>
          {indexedMap((section, index) => {
            const { title, key, destination } = section as HomeSectionData;
            const dataSource: HomeSectionDataSource = {
              [HomeSection.sports]: SportsData,
              [HomeSection.breaks]: breaksSelector(featuredBreaks),
              [HomeSection.hits]: HitsData,
              [HomeSection.breakers]: usersSelector(featuredBreakers),
            };

            return (
              <View key={index}>
                <SectionHeader
                  title={title}
                  actionText={destination && t('buttons.seeAll')}
                  containerStyle={[s.mr3]}
                  onActionPressed={() =>
                    navigation.navigate(
                      destination as keyof TabNavigatorParamList,
                    )
                  }
                />
                <FlatList
                  keyExtractor={item => item.id}
                  horizontal
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={dataSource[key] as any[]}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    if (key === HomeSection.sports) {
                      const sports = item as HomeSportsData;
                      return (
                        <FilterItem
                          type={FilterItemTypes.circle}
                          style={[s.ml1, s.mb2, s.mr2]}>
                          <LeagueIcon league={sports.key} />
                        </FilterItem>
                      );
                    }

                    if (key === HomeSection.breaks) {
                      const eventBreak = item as Breaks;
                      return (
                        <FeaturedBreakCard
                          {...featuredBreakSelector(eventBreak)}
                          containerStyle={[s.mr3, s.mb3]}
                          onPress={() =>
                            navigation.navigate(ROUTES_IDS.LIVE_MODAL)
                          }
                        />
                      );
                    }

                    if (key === HomeSection.hits) {
                      return (
                        <HitCard
                          onPress={() =>
                            navigation.navigate(
                              ROUTES_IDS.HIT_DETAIL_MODAL as keyof HitsStackParamList,
                            )
                          }
                          containerStyle={[s.mr3, s.mb3]}
                          image={{
                            uri: 'https://source.unsplash.com/363x522/?sports',
                          }}
                          title={item.name}
                        />
                      );
                    }

                    if (key === HomeSection.breakers) {
                      const breaker = item as Users;
                      return (
                        <BreakerCard
                          {...featuredBreakerSelector(breaker)}
                          containerStyle={[s.mb3, s.mr3]}
                          onPress={() =>
                            navigation.navigate(
                              ROUTES_IDS.BREAKERS_TAB as keyof TabNavigatorParamList,
                              {
                                screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                                initial: false,
                                params: {
                                  id: item.id,
                                  breaker: item.Profile,
                                },
                              },
                            )
                          }
                        />
                      );
                    }

                    return null;
                  }}
                />
              </View>
            );
          }, SectionsData)}
        </ScrollView>
      </View>
    </Container>
  );
};
