import React from 'react';
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
import { ICON_SIZE } from '../../theme/sizes';
import {
  breakCardSelector,
  useEventDetailModalHook,
} from './event-detail-modal.logic';
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
  const { breaks, data, loading, breakId, setBreakId, onPressFollow } =
    useEventDetailModalHook(eventId);

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
                {...breakCardDetails}
                eventDate={eventDate}
                onPressBuy={() => setBreakId(item.id)}
                onPress={() => setBreakId(item.id)}
                onPressFollow={() => onPressFollow(item, breakCardDetails)}
              />
            );
          }}
        />
      )}
      {breakId ? (
        <BreakDetailModal
          breakId={breakId}
          isVisible={Boolean(breakId)}
          onPressClose={() => setBreakId(undefined)}
        />
      ) : null}
    </OverScreenModal>
  );
};
