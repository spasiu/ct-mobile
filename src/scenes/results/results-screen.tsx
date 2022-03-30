import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';
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
  OverScreenModal,
  ServerImage,
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

import {
  eventBreakerSelector,
  eventDetailSelector,
  eventBreakerDetailSelector,
} from './schedule-screen.utils';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ICON_SIZE } from '../../theme/sizes';
// const downArrow = require('../../assets/down-arrow.png');
export const ResultsScreen = (): JSX.Element => {
  const [result, setResult] = useState<Partial<EventDetailModalProps>>({});
  const [showBreakersModal, setShowBreakersModal] = useState(false);
  const [breakerIdFilter, setBreakerIdFilter] = useState('');
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
      breakerId: breakerIdFilter ? { _eq: breakerIdFilter } : {},
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
              text={t('buttons.breaker')}
              status={
                breakerIdFilter
                  ? FilterItemStatusTypes.selected
                  : FilterItemStatusTypes.default
              }
              onPress={() => setShowBreakersModal(true)}
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
          onConfirm={input => {
            setShowDatePicker(false);
            setDate(input);
            setFilterByDate(true);
          }}
          onCancel={() => {
            setShowDatePicker(false);
            setFilterByDate(false);
          }}
        />

        <OverScreenModal
          isVisible={showBreakersModal}
          onPressClose={() => setShowBreakersModal(false)}>
          <ScrollView>
            <Text style={[s.b, s.f2, s.tc, s.pb4]}>
              {t('tabBar.breakersTab')}
            </Text>
            {breakerList?.Users?.map((breaker: any) => {
              return (
                <BorderlessButton
                  key={`filter-breaker-car-${breaker.id}`}
                  style={[
                    { height: sizes.h3 + sizes.h1 },
                    s.flx_i,
                    s.pa3,
                    s.br3,
                    s.mb3,
                    s.jcsb,
                    s.bg_white,
                    s.shadow_s,
                    s.ml1,
                    s.mr1,
                  ]}
                  onPress={() => {
                    setBreakerIdFilter(breaker.id);
                    setShowBreakersModal(false);
                  }}>
                  <View style={[s.flx_row, s.aic, s.pa2]}>
                    <Text style={[s.f3, s.fw3, s.left_2, s.b]}>
                      {breaker.username}
                    </Text>
                    <ServerImage
                      style={[s.circle_l, s.absolute, s.right_2]}
                      width={ICON_SIZE.L}
                      height={ICON_SIZE.L}
                      src={breaker.image}
                    />
                  </View>
                </BorderlessButton>
              );
            })}
          </ScrollView>
        </OverScreenModal>
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
