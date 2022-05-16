import React from 'react';
import { Text, View, PixelRatio, ScrollView } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { WebView } from 'react-native-webview';

import {
  ImageCard,
  ResultCard,
  ReadMore,
  ServerImage,
  Loading,
  OverScreenModal,
  Badge,
} from '../../components';
import { t } from '../../i18n/i18n';
import { SeeAllTeamsModal } from '../live/see-all-teams-modal';

import { ICON_SIZE } from '../../theme/sizes';
import { breakResultSelector, breakTypeSelector } from '../../common/break';
import { Breaks } from '../../services/api/requests';
import { WINDOW_WIDTH } from '../../theme/sizes';
import {
  breakCardSelector,
  useResultDetailModalHook,
} from './result-detail-modal.logic';
import { ResultDetailModalProps } from './result-detail-modal.props';
import { COLORS } from '../../theme/colors';

export const ResultDetailModal = ({
  isVisible,
  showHeader = true,
  title,
  image,
  eventDate,
  eventId,
  breaker,
  description = '',
  onPressClose = () => undefined,
  videoUrl,
  ...modalProps
}: ResultDetailModalProps): JSX.Element => {
  const { breaks, loading, data, breakResults, setBreakResults, userId } =
    useResultDetailModalHook(eventId);

  const pixelRatio = PixelRatio.get();
  const videoWidth = WINDOW_WIDTH - sizes.mv3 * 2;
  const iframeHeight = (videoWidth * pixelRatio) / 2;
  const videoHtml = `
  <html>
    <body style="display:flex;justify-content:center;align-items:center;background-color:${COLORS.black_5}">
    <iframe style="border-radius:${sizes.br5}px;" src="${videoUrl}" width="100%" height="${iframeHeight}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </body>
  </html>
`;
  return (
    <OverScreenModal
      isVisible={isVisible}
      onPressClose={onPressClose}
      containerStyle={[{ backgroundColor: 'rgba(249, 249, 249, 1)' }]}
      {...modalProps}>
      <ScrollView>
        {showHeader ? (
          <View style={[s.mv3, s.jcc, s.aic, s.ph3]}>
            <ImageCard cardSize={'micro'} touchable={false} image={image} />
            <Text style={[s.ff_alt_b, s.f4, s.mv3]}>{title}</Text>
            <View style={[s.flx_row, s.jcsb, s.mv3]}>
              <View style={[s.flx_row, s.flx_ratio(0.65)]}>
                <ServerImage
                  style={[s.circle_xs, s.mr2]}
                  src={breaker.image}
                  width={ICON_SIZE.XS}
                  height={ICON_SIZE.XS}
                />
                <Text style={[s.ff_b, s.black, s.f5]}>{breaker.name}</Text>
              </View>
              <View style={[s.flx_ratio(0.35), s.flx_row, s.jcfe]}>
                <Badge containerStyle={[s.bg_primary]} text={eventDate} />
              </View>
            </View>
            <ReadMore mainTextStyle={[s.f7, s.lh_medium]} numberOfLines={3}>
              {description}
            </ReadMore>
          </View>
        ) : null}
        {videoUrl ? (
          <View style={[s.h5, s.w_100, s.aic]}>
            <WebView
              scrollEnabled={false}
              style={[
                {
                  width: videoWidth,
                },
              ]}
              source={{ html: videoHtml }}
            />
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
          breaks.map((item: Breaks) => {
            const breakCardDetails = breakCardSelector(item, breaker);
            return (
              <ResultCard
                key={`break-result-${item.id}`}
                {...breakCardDetails}
                eventDate={eventDate}
                setResult={() => setBreakResults(item)}
                onPress={() => setBreakResults(item)}
              />
            );
          })
        )}
        {breakResults ? (
          <SeeAllTeamsModal
            isVisible={!!breakResults}
            onPressClose={() => setBreakResults(undefined)}
            userId={userId as string}
            result={breakResultSelector(breakResults)}
            breakType={breakTypeSelector(breakResults)}
          />
        ) : null}
      </ScrollView>
    </OverScreenModal>
  );
};
