import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';
import { breakerEventsSelector } from '../../common/breaker';
import DatePicker from 'react-native-date-picker';
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
  useBreakersListQuery,
} from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { ResultDetailModal } from '../result-detail/result-detail-modal';
import { BreakerList } from './breaker-list';
import {
  eventBreakerSelector,
  eventDetailSelector,
  eventBreakerDetailSelector,
} from './schedule-screen.utils';

// const downArrow = require('../../assets/down-arrow.png');
export const ResultsScreen = (): JSX.Element => {
  const [result, setResult] = useState<Partial<EventDetailModalProps>>({});
  const [showBreakersModal, setShowBreakersModal] = useState(false);
  const [breakerFilter, setBreakerFilter] = useState<Partial<Users>>();
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterByDate, setFilterByDate] = useState(false);

  const [myEvents, setMyEvents] = useState(false);
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation();

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const { data: breakerList } = useBreakersListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { loading, data } = useCompletedEventsQuery({
    fetchPolicy: 'network-only',
    variables: {
      //userId: myEvents ? { _eq: authUser?.uid } : undefined,
      breakerId: breakerFilter ? { _eq: breakerFilter.id } : {},
      // date: filterByDate ? date : {},
    },
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
              text={
                breakerFilter ? breakerFilter.username : t('buttons.breaker')
              }
              status={
                breakerFilter
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() =>
                breakerFilter
                  ? setBreakerFilter(undefined)
                  : setShowBreakersModal(true)
              }
            />
            <FilterItem
              style={[s.mr3]}
              type={FilterItemTypes.pill_alt}
              text={t('buttons.date')}
              status={
                filterByDate
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() =>
                filterByDate ? setFilterByDate(false) : setShowDatePicker(true)
              }
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
              <View key={`breaker-${index}`}>
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
        <DatePicker
          modal
          open={showDatePicker}
          mode="date"
          date={date}
          onConfirm={(input: Date) => {
            setShowDatePicker(false);
            setDate(input);
            setFilterByDate(true);
          }}
          onCancel={() => {
            setShowDatePicker(false);
            setFilterByDate(false);
          }}
        />
        {breakerList?.Users ? (
          <BreakerList
            breakers={breakerList.Users as Users[]}
            onClose={() => setShowBreakersModal(false)}
            showModal={showBreakersModal}
            setBreakerFilter={(breaker: Users) => setBreakerFilter(breaker)}
          />
        ) : null}
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
