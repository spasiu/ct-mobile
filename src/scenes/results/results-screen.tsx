import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';
import { breakerEventsSelector } from '../../common/breaker';
import {
  SectionHeader,
  EventCard,
  Loading,
  Container,
  ContainerTypes,
  Avatar,
  TitleBar,
  FilterItem,
  FilterItemTypes,
  FilterItemStatusTypes,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import {
  useCompletedEventsQuery,
  Users,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { ResultDetailModal } from '../result-detail/result-detail-modal';

import {
  eventBreakerSelector,
  eventDetailSelector,
  eventBreakerDetailSelector,
} from './schedule-screen.utils';

export const ResultsScreen = (): JSX.Element => {
  const [result, setResult] = useState<Partial<EventDetailModalProps>>({});

  const [breakerId, setBreakerId] = useState('');
  const [date, setDate] = useState('');
  const [myEvents, setMyEvents] = useState(false);
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation();

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });
  const { loading, data } = useCompletedEventsQuery({
    fetchPolicy: 'cache-and-network',
    // variables: {
    //   userId: authUser?.uid,
    //   breakerId: getBreakTypeFilter(breakTypeFilter),
    //   date: getSportTypeFilter(sportTypeFilter),
    // },
  });
  const breakersObj: any = {};
  data?.Events.forEach((e: any) => {
    const id = e.User.id;
    if (!breakersObj[id]) {
      breakersObj[id] = { ...e.User, Events: [] };
    }
    const { User, ...rest } = e;
    breakersObj[id].Events.push(rest);
  });
  const breakers = Object.keys(breakersObj).map(b => breakersObj[b]);

  if (loading && !data) {
    return <Loading />;
  }

  return (
    <>
      <Container
        style={[s.mh0]}
        containerType={ContainerTypes.fixed}
        safeAreaEdges={['top', 'left', 'right']}>
        <View style={[s.mh3, s.mb4]}>
          <TitleBar
            title={t('results.title')}
            rightElement={
              <View style={[s.flx_i, s.flx_row, s.jcfe, s.aic]}>
                <Avatar
                  src={users?.Users[0]?.image || ''}
                  onPress={() =>
                    navigation.navigate(ROUTES_IDS.USER_PROFILE_STACK)
                  }
                />
              </View>
            }
          />
          <View style={[s.flx_row]}>
            <FilterItem
              style={[s.mr3]}
              type={FilterItemTypes.pill_alt}
              text={t('buttons.myBreaks')}
              status={
                myEvents
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() => setMyEvents(!myEvents)}
            />
            <FilterItem
              style={[s.mr3]}
              type={FilterItemTypes.pill_alt}
              text={t('buttons.breaker')}
              status={
                breakerId
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() => setBreakerId('id')}
            />
            <FilterItem
              style={[s.mr3]}
              type={FilterItemTypes.pill_alt}
              text={t('buttons.date')}
              status={
                date
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() => setDate('12-12-12')}
            />
          </View>
        </View>
        <ScrollView style={[s.h_100]} contentContainerStyle={[s.pb4, s.ml3]}>
          {breakers.map((user, index) => {
            const breaker = user as Users;
            const breakerEvents = breakerEventsSelector(breaker);
            if (isEmpty(breakerEvents)) {
              return null;
            }
            return (
              <View key={index}>
                <SectionHeader
                  {...eventBreakerSelector(breaker)}
                  actionText={t('buttons.seeAll')}
                  containerStyle={[s.mr3]}
                  onActionPressed={() =>
                    navigation.navigate(ROUTES_IDS.BREAKERS_TAB, {
                      screen: ROUTES_IDS.BREAKER_DETAIL_SCREEN,
                      initial: false,
                      params: eventBreakerDetailSelector(breaker),
                    })
                  }
                />
                <FlatList
                  keyExtractor={item => item.id}
                  horizontal
                  data={breaker.Events}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    //const eventData = scheduleEventSelector(item);
                    return (
                      <EventCard
                        title={item.title}
                        status="completed"
                        image={item.image}
                        eventId={item.id}
                        eventDate={item.start_time}
                        onPress={() => {
                          setResult(eventDetailSelector(item, breaker));
                        }}
                        containerStyle={[s.mr3]}
                      />
                    );
                  }}
                />
              </View>
            );
          })}
        </ScrollView>

        {!isEmpty(result) ? (
          <ResultDetailModal
            isVisible={!isEmpty(result)}
            onPressClose={() => setResult({})}
            modalTitle={t('event.detailTitle')}
            {...(result as EventDetailModalProps)}
          />
        ) : null}
      </Container>
    </>
  );
};
