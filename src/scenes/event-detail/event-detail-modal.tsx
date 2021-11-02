import React, { useEffect, useContext, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import {
  StatusBadge,
  ImageCard,
  BreakCard,
  Loading,
  ReadMore,
  ServerImage,
} from '../../components';

import { t } from '../../i18n/i18n';
import { OverScreenModal } from '../../components';
import {
  useEventBreaksQuery,
  NewEventBreaksDocument,
  useFollowBreakMutation,
  useUnfollowBreakMutation,
} from '../../services/api/requests';
import { ICON_SIZE } from '../../theme/sizes';
import { breaksSelector } from '../../common/break';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  optimisticFollowBreakResponse,
  optimisticUnfollowBreakResponse,
  updateFollowBreakCache,
  updateUnfollowBreakCache,
} from '../../utils/cache';

import { breakCardSelector } from './event-detail-modal.utils';
import { EventDetailModalProps } from './event-detail-modal.props';
import { BreakDetailModal } from '../break-detail/break-detail-modal';

export const EventDetailModal = ({
  modalTitle = '',
  isVisible,
  showHeader = true,
  title,
  image,
  status,
  eventDate,
  breaker,
  description = '',
  eventId,
  onPressClose = () => undefined,
  ...modalProps
}: EventDetailModalProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakId, setBreakId] = useState('');

  const { loading, data, subscribeToMore } = useEventBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: eventId,
      userId: authUser?.uid,
    },
  });

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  useEffect(() => {
    subscribeToMore({
      document: NewEventBreaksDocument,
      variables: { id: eventId, userId: authUser?.uid },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breaks = breaksSelector(data);
  return (
    <OverScreenModal
      title={modalTitle}
      isVisible={isVisible}
      onPressClose={onPressClose}
      {...modalProps}>
      {showHeader ? (
        <View style={[s.mv3, s.jcc, s.aic, s.ph3]}>
          <ImageCard cardSize={'micro'} touchable={false} image={image} />
          <Text style={[s.ff_alt_b, s.f4, s.mv3]}>{title}</Text>
          <View style={[s.flx_row, s.jcsb, s.mv3]}>
            <View style={[s.flx_row, s.flx_ratio(0.65)]}>
              <ServerImage
                style={[s.circle_xs, s.mr2]}
                src={breaker.image as string}
                width={ICON_SIZE.XS}
                height={ICON_SIZE.XS}
              />
              <Text style={[s.ff_b, s.black, s.f5]}>
                {breaker.name as string}
              </Text>
            </View>
            <View style={[s.flx_ratio(0.35), s.flx_row, s.jcfe]}>
              <StatusBadge status={status} text={eventDate} />
            </View>
          </View>
          <ReadMore mainTextStyle={[s.f7, s.lh_medium]} numberOfLines={3}>
            {description}
          </ReadMore>
        </View>
      ) : null}
      {breaks && breaks.length === 0 ? null : (
        <Text style={[s.ff_b, s.f5, s.mb2, s.mt3, s.ph3]}>
          {t('event.breakLineupTitle')}
        </Text>
      )}
      {loading && !data ? (
        <Loading />
      ) : (
        <FlatList
          style={[s.flx_i, s.mv3, s.ph3]}
          data={breaks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const breakCardDetails = breakCardSelector(item, breaker);
            return (
              <BreakCard
                breakStatus={item.status}
                {...breakCardDetails}
                eventDate={eventDate}
                onPressBuy={() => setBreakId(item.id)}
                onPress={() => setBreakId(item.id)}
                onPressFollow={() => {
                  const followData = {
                    user_id: authUser?.uid,
                    break_id: item.id,
                  };

                  breakCardDetails.userFollows
                    ? unfollowBreak({
                        optimisticResponse: optimisticUnfollowBreakResponse(
                          item,
                          authUser?.uid as string,
                        ),
                        update: cache => updateUnfollowBreakCache(cache, item),
                        variables: followData,
                      })
                    : followBreak({
                        optimisticResponse: optimisticFollowBreakResponse(
                          item,
                          authUser?.uid as string,
                        ),
                        update: (cache, followResponse) =>
                          updateFollowBreakCache(cache, followResponse, item),
                        variables: {
                          follow: followData,
                        },
                      });
                }}
              />
            );
          }}
        />
      )}
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId('')}
        />
      ) : null}
    </OverScreenModal>
  );
};
