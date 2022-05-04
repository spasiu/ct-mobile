import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'ramda';
import { breakerEventsSelector } from '../../common/breaker';
import { formatEvents } from '../../common/event';
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
  EmptyState,
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
} from './results-screen.utils';
import { formatScheduledStatus } from '../../utils/date';
import { eventTimeSelector } from '../../common/event';
import dayjs from 'dayjs';
import { userNameSelector } from '../../common/user-profile';

export const ResultsScreen = (): JSX.Element => {
  const [result, setResult] = useState<Partial<EventDetailModalProps>>({});
  const [showBreakersModal, setShowBreakersModal] = useState(false);
  const [breakerFilter, setBreakerFilter] = useState<Partial<Users>>();
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterByDate, setFilterByDate] = useState(false);
  const [myEventsFilter, setMyEventsFilter] = useState(false);
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
    fetchPolicy: 'cache-and-network',
    variables: {
      breakerId: breakerFilter ? { _eq: breakerFilter.id } : {},
      startDate: filterByDate ? { _gte: date } : {},
      endDate: filterByDate
        ? {
            start_time: {
              _lte: dayjs(date).add(1, 'day').subtract(1, 'second').toDate(),
            },
          }
        : {},
      limit: 100,
      userId: myEventsFilter
        ? { Order: { user_id: { _eq: authUser?.uid } } }
        : {},
    },
  });
  const breakers = formatEvents(data);
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
                myEventsFilter
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() => {
                if (breakerFilter && !myEventsFilter) setBreakerFilter(undefined);
                setMyEventsFilter(!myEventsFilter);
              }}
            />
            <FilterItem
              style={[s.mr3]}
              type={FilterItemTypes.pill_alt}
              text={
                breakerFilter ? (
                  <Text style={[s.b, s.white, s.ff_alt_sb, s.f5, s.ph3]}>
                    {userNameSelector(breakerFilter)}
                  </Text>
                ) : (
                  t('buttons.breaker')
                )
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
              onPress={() => {
                if (filterByDate) {
                  setFilterByDate(false);
                  setDate(new Date(Date.now()));
                } else {
                  setShowDatePicker(true);
                }
              }}
            />
          </View>
        </View>
        <ScrollView style={[s.h_100]} contentContainerStyle={[s.pb4, s.ml3]}>
          {breakers?.length === 0 ||
          (breakerFilter && breakers && breakers[0].Events.length === 0) ? (
            <EmptyState
              title={t('emptyResults.noResultsTitle')}
              description={t('emptyResults.noResultsDescription')}
            />
          ) : (
            breakers?.map((user: any, index: number) => {
              const breaker = user as Users;
              const breakerEvents = breakerEventsSelector(breaker);
              if (isEmpty(breakerEvents)) {
                return null;
              }
              return (
                <View key={`breaker-${index}`}>
                  <SectionHeader
                    {...eventBreakerSelector(breaker)}
                    containerStyle={[s.mr3]}
                  />
                  <FlatList
                    keyExtractor={item => item.id}
                    horizontal
                    data={breaker.Events}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <EventCard
                          title={item.title}
                          status="completed"
                          image={item.image}
                          eventId={item.id}
                          eventDate={formatScheduledStatus(
                            eventTimeSelector(item),
                          )}
                          onPress={() => {
                            setResult(eventDetailSelector(item, breaker));
                          }}
                          containerStyle={[s.mr3]}
                          result={true}
                        />
                      );
                    }}
                  />
                </View>
              );
            })
          )}
        </ScrollView>
        <DatePicker
          modal
          title={t('dates.date')}
          open={showDatePicker}
          mode="date"
          date={date}
          maximumDate={new Date(Date.now())}
          onConfirm={(input: Date) => {
            setDate(input);
            setShowDatePicker(false);
            setFilterByDate(true);
          }}
          onCancel={() => {
            setShowDatePicker(false);
            setDate(new Date(Date.now()));
          }}
        />
        {breakerList?.Users ? (
          <BreakerList
            breakers={breakerList.Users as Users[]}
            onClose={() => setShowBreakersModal(false)}
            showModal={showBreakersModal}
            setBreakerFilter={(breaker: Users) => {
              setBreakerFilter(breaker);
              if (myEventsFilter) setMyEventsFilter(false);
            }}
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
