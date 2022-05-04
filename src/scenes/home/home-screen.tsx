import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';

import {
  userImageSelector,
  userSelector,
  usersSelector,
} from '../../common/user-profile';
import {
  Container,
  ContainerTypes,
  HitCard,
  BreakerCard,
  FilterItem,
  LeagueIcon,
  SectionHeader,
  SearchInput,
  FeaturedEventCard,
  NavigationBar,
  Loading,
  FilterItemTypes,
  ImageCardSizeTypes,
  Avatar,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { indexedMap } from '../../utils/ramda';
import { Users, Events, Event_Status_Enum } from '../../services/api/requests';

import {
  HomeScreenProps,
  HomeSectionData,
  HomeSection,
  HomeSectionDataSource,
  HomeSportsData,
} from './home-screen.props';
import { SectionsData, SportsData } from './home-screen.presets';
import { TabNavigatorParamList } from '../../navigators';
import { HitDetailModal } from '../hit-detail/hit-detail-modal';
import {
  hitImageFrontSelector,
  hitPlayerSelector,
  hitsSelector,
} from '../../common/hit';
import { hitDetailForModalSelector } from '../hit-detail/hit-detail-modal.utils';
import { eventsSelector, eventStatusSelector } from '../../common/event';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import {
  featuredBreakerSelector,
  featuredEventDetailSelector,
  featuredEventSelector,
  useHomeScreenHook,
} from './home-screen.logic';

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const {
    event,
    setEvent,
    setSportTypeFilter,
    setItemTypeFilter,
    hitDetail,
    setHitDetail,
    featuredEvents,
    featuredHits,
    featuredBreakers,
    users,
  } = useHomeScreenHook();

  if (!featuredBreakers && !featuredEvents) {
    return <Loading />;
  }

  const user = userSelector(users);
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
              onTouchStart={() => navigation.navigate(ROUTES_IDS.SEARCH_MODAL)}
            />
          </View>
          <View style={[s.flx_ratio(0.15), s.aife, s.jcc]}>
            <Avatar
              src={userImageSelector(user)}
              onPress={() => navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)}
            />
          </View>
        </NavigationBar>
        <ScrollView contentContainerStyle={[s.pb4, s.ml3]}>
          {indexedMap((section, index) => {
            const { title, key, destination } = section as HomeSectionData;
            const dataSource: HomeSectionDataSource = {
              [HomeSection.sports]: SportsData,
              [HomeSection.events]: eventsSelector(featuredEvents),
              [HomeSection.hits]: hitsSelector(featuredHits),
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
                      const sport = item as HomeSportsData;
                      return (
                        <FilterItem
                          onPress={() => {
                            setSportTypeFilter(sport.key);
                            setItemTypeFilter('Breaks');
                            navigation.navigate(ROUTES_IDS.SCHEDULE_TAB);
                          }}
                          type={FilterItemTypes.circle}
                          style={[s.ml1, s.mb2, s.mr2]}>
                          <LeagueIcon league={sport.key} />
                        </FilterItem>
                      );
                    }

                    if (key === HomeSection.events) {
                      const homeEvent = item as Events;
                      return (
                        <FeaturedEventCard
                          {...featuredEventSelector(homeEvent)}
                          containerStyle={[s.mr3, s.mb3]}
                          eventId={homeEvent.id}
                          onPress={() => {
                            const eventStatus = eventStatusSelector(homeEvent);
                            if (eventStatus === Event_Status_Enum.Live) {
                              navigation.navigate(ROUTES_IDS.LIVE_MODAL, {
                                eventId: homeEvent.id,
                              });
                            } else {
                              setEvent(featuredEventDetailSelector(homeEvent));
                            }
                          }}
                        />
                      );
                    }

                    if (key === HomeSection.hits) {
                      return (
                        <HitCard
                          onPress={() => setHitDetail(item)}
                          containerStyle={[s.mr3, s.mb3]}
                          image={hitImageFrontSelector(item)}
                          title={hitPlayerSelector(item)}
                          cardSize={ImageCardSizeTypes.small}
                        />
                      );
                    }

                    if (key === HomeSection.breakers) {
                      const breaker = item as Users;
                      return (
                        <BreakerCard
                          {...featuredBreakerSelector(breaker)}
                          containerStyle={[s.mb3, s.mr3]}
                          showFollow={false}
                          onPress={() =>
                            navigation.navigate(
                              ROUTES_IDS.BREAKERS_TAB as keyof TabNavigatorParamList,
                              {
                                screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                                initial: false,
                                params: {
                                  breaker: item,
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
        <HitDetailModal
          isVisible={!isEmpty(hitDetail)}
          onPressClose={() => setHitDetail({})}
          {...hitDetailForModalSelector(hitDetail)}
        />
        {!isEmpty(event) ? (
          <EventDetailModal
            isVisible={!isEmpty(event)}
            onPressClose={() => setEvent({})}
            modalTitle={t('event.detailTitle')}
            {...(event as EventDetailModalProps)}
          />
        ) : null}
      </View>
    </Container>
  );
};
