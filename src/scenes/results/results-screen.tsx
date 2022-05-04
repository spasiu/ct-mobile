import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
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
  EmptyState,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { Users } from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { ResultDetailModal } from '../result-detail/result-detail-modal';
import { BreakerList } from './breaker-list';
import {
  eventBreakerSelector,
  eventDetailSelector,
  useBreakerFilterHook,
  useMyEventsFilterHook,
  useDateFilterHook,
  useResultsScreenHook,
  useEventResultSelector,
} from './results-screen.logic';
import { formatScheduledStatus } from '../../utils/date';
import { eventTimeSelector } from '../../common/event';
import { userNameSelector } from '../../common/user-profile';

export const ResultsScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const {
    showBreakerList,
    setShowBreakerList,
    breakerFilter,
    setBreakerFilter,
    chooseBreaker,
  } = useBreakerFilterHook();
  const { myEventsFilter, setMyEventsFilter } = useMyEventsFilterHook();
  const {
    showDatePicker,
    setShowDatePicker,
    dateFilter,
    confirmDate,
    cancelDate,
    date,
  } = useDateFilterHook();
  const { users, breakerList, breakers, loading } = useResultsScreenHook(
    myEventsFilter,
    date,
    dateFilter,
    breakerFilter,
  );
  const { result, setResult } = useEventResultSelector();
  if (loading && !breakers) {
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
              onPress={() => setMyEventsFilter(!myEventsFilter)}
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
                  : setShowBreakerList(true)
              }
            />
            <FilterItem
              style={[s.mr3]}
              type={FilterItemTypes.pill_alt}
              text={t('buttons.date')}
              status={
                dateFilter
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() =>
                dateFilter ? cancelDate() : setShowDatePicker(true)
              }
            />
          </View>
        </View>
        <ScrollView style={[s.h_100]} contentContainerStyle={[s.pb4, s.ml3]}>
          {breakers?.length === 0 ||
          (breakers && breakers[0].Events.length === 0) ? (
            <EmptyState
              title={t('emptyResults.noResultsTitle')}
              description={t('emptyResults.noResultsDescription')}
            />
          ) : (
            breakers?.map((user: Users, index: number) => {
              const breaker = user;
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
          onConfirm={(input: Date) => confirmDate(input)}
          onCancel={() => cancelDate()}
        />
        {breakerList ? (
          <BreakerList
            breakers={breakerList as Users[]}
            onClose={() => setShowBreakerList(false)}
            showModal={showBreakerList}
            setBreakerFilter={(breaker: Users) => chooseBreaker(breaker)}
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
