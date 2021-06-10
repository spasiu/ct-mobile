import React from 'react';
import { Text, Image, FlatList, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import ReadMore from '@fawazahmed/react-native-read-more';

import {
  LeagueIcon,
  StatusBadge,
  ImageCard,
  BreakCard,
  Loading,
} from '../../components';

import { t } from '../../i18n/i18n';
import { OverScreenModal } from '../../components';
import {
  useEventBreaksQuery,
  NewEventBreaksDocument,
} from '../../services/api/requests';

export const EventDetailModal = ({ route, navigation }) => {
  const {
    modalTitle = '',
    showHeader = true,
    title,
    image,
    league,
    status,
    eventDate,
    breaker,
    id,
    description = '',
  } = route.params;

  const {
    loading,
    data,
    subscribeToMore: eventBreaksSubscription,
  } = useEventBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  eventBreaksSubscription({
    document: NewEventBreaksDocument,
    variables: { id },
    updateQuery: (prev, { subscriptionData }) => subscriptionData.data || prev,
  });
  return (
    <OverScreenModal
      title={modalTitle}
      onPressClose={() => navigation.goBack()}>
      {showHeader ? (
        <View style={[s.mv3, s.jcc, s.aic, s.ph3]}>
          <ImageCard cardSize={'micro'} touchable={false} image={image} />
          <Text style={[s.ff_alt_b, s.f4, s.mv3]}>{title}</Text>
          <View style={[s.flx_row, s.jcsb, s.mv3]}>
            <View style={[s.flx_row, s.flx_ratio(0.65)]}>
              <Image style={[s.circle_xs, s.mr2]} source={breaker.image} />
              <Text style={[s.ff_b, s.black, s.f5]}>{breaker.name}</Text>
            </View>
            <View style={[s.flx_ratio(0.35), s.flx_row, s.jcsb]}>
              <LeagueIcon league={league} />
              <StatusBadge status={status} text={eventDate} />
            </View>
          </View>
          <ReadMore
            style={[s.ff_alt_r, s.f7, s.lh_medium]}
            numberOfLines={3}
            seeMoreText={t('buttons.seeMore')}
            seeLessText={t('buttons.seeLess')}
            seeMoreStyle={[s.ff_alt_b, s.black]}
            seeLessStyle={[s.ff_alt_b, s.black]}>
            {description}
          </ReadMore>
        </View>
      ) : null}
      <Text style={[s.ff_b, s.f5, s.mb2, s.mt3, s.ph3]}>
        {t('event.breakLineupTitle')}
      </Text>
      {loading && !data ? (
        <Loading />
      ) : (
        <FlatList
          style={[s.flx_i, s.mv3, s.ph3]}
          data={data?.Breaks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <BreakCard
                eventDate={eventDate}
                status={item.status}
                price={item.price}
                spotsLeft={item.spots}
                title={item.title}
                breakType={item.break_type}
                breakerImage={breaker.image}
                league={'baseball'}
              />
            );
          }}
        />
      )}
    </OverScreenModal>
  );
};
