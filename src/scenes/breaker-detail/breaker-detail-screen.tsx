import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  PixelRatio,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';
import { WebView } from 'react-native-webview';
import { isEmpty } from 'ramda';

import { ICON_SIZE, WINDOW_WIDTH } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';
import {
  Container,
  ContainerTypes,
  NavigationBar,
  FollowButtonBreaker,
  HitCard,
  SectionHeader,
  ScheduleToggle,
  SocialIcon,
  IconButton,
  ReadMore,
  ServerImage,
  ImageCardSizeTypes,
} from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { t } from '../../i18n/i18n';

import { breakerDetailScreenSelector } from './breaker-detail-screen.utils';
import { BreaksView } from './breaks-view';
import { EventsView } from './events-view';
import { HitDetailModal } from '../hit-detail/hit-detail-modal';

import { BreakerDetailScreenProps } from './breaker-detail-screen.props';
import {
  Hits,
  NewBreakerHitsDocument,
  useBreakerHitsQuery,
} from '../../services/api/requests';
import {
  hitImageFrontSelector,
  hitPlayerSelector,
  hitsSelector,
} from '../../common/hit';
import { hitDetailForModalSelector } from '../hit-detail/hit-detail-modal.utils';

export const BreakerDetailScreen = ({
  route,
  navigation,
}: BreakerDetailScreenProps): JSX.Element => {
  const { breaker, startOnEventsView = false } = route.params;
  const [eventsView, setEventsView] = useState(startOnEventsView);
  const [hitDetail, setHitDetail] = useState<Partial<Hits>>({});

  const { id, name, image, social, description, video } =
    breakerDetailScreenSelector(breaker);

  const { data: hitsRequestData, subscribeToMore } = useBreakerHitsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      breakerId: id,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: NewBreakerHitsDocument,
      variables: {
        breakerId: id,
      },
      updateQuery: (prev, { subscriptionData }) =>
        subscriptionData.data || prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pixelRatio = PixelRatio.get();
  const videoWidth = WINDOW_WIDTH - sizes.mv3 * 2;
  const iframeHeight = (videoWidth * pixelRatio) / 2;

  const videoHtml = `
    <html>
      <body style="display:flex;justify-content:center;align-items:center;background-color:${COLORS.black_5}">
      <iframe style="border-radius:${sizes.br5}px;" src="${video}" width="100%" height="${iframeHeight}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </body>
    </html>
  `;

  const hits = hitsSelector(hitsRequestData);
  return (
    <Container
      containerType={ContainerTypes.fixed}
      style={[s.mh0]}
      safeAreaEdges={['top', 'left', 'right']}>
      <NavigationBar onBackPressed={() => navigation.goBack()} />
      <ScrollView>
        <View style={[s.mh3]}>
          <View style={[s.flx_row, s.jcsb, s.aic]}>
            <View style={[s.flx_row, s.jcfs, s.aic]}>
              <ServerImage
                resizeMode={'cover'}
                width={ICON_SIZE.L}
                height={ICON_SIZE.L}
                style={[s.circle_l, s.mr3]}
                src={image}
              />
              <Text style={[s.ff_b, s.f5]}>{name}</Text>
            </View>
            <FollowButtonBreaker breakerId={id} />
          </View>
          <FlatList
            horizontal
            keyExtractor={item => item.name}
            data={social}
            renderItem={({ item }) => (
              <IconButton
                onPress={() => Linking.openURL(item.url)}
                style={[
                  s.circle_m,
                  s.bg_white,
                  s.jcc,
                  s.aic,
                  s.ba,
                  s.b__black_10,
                  s.shadow_xs,
                  s.mr2,
                  s.mt3,
                  s.mb1,
                ]}>
                <SocialIcon name={item.name} />
              </IconButton>
            )}
          />
          <ReadMore mainTextStyle={[s.mv3, s.lh_high]} numberOfLines={5}>
            {description}
          </ReadMore>
        </View>
        <View style={[s.h5, s.w_100, s.jcc, s.aic]}>
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
        {isEmpty(hits) ? null : (
          <>
            <SectionHeader
              containerStyle={[s.mh3, s.h1]}
              title={t('sections.recentHits')}
              actionText={t('buttons.seeAll')}
              onActionPressed={() => navigation.navigate(ROUTES_IDS.HITS_TAB)}
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={[s.h5, s.w_100, s.pl3, s.mb3]}
              contentContainerStyle={[s.pr3]}
              data={hits}
              horizontal
              renderItem={({ item }) => (
                <HitCard
                  onPress={() => setHitDetail(item)}
                  showTitle={false}
                  containerStyle={[s.mr3]}
                  image={hitImageFrontSelector(item)}
                  title={hitPlayerSelector(item)}
                  cardSize={ImageCardSizeTypes.small}
                />
              )}
            />
          </>
        )}
        <SectionHeader
          containerStyle={[s.mh3, s.h3, s.mb2]}
          title={eventsView ? t('sections.event') : t('sections.break')}
          actionComponent={
            <ScheduleToggle
              isOn={eventsView}
              onToggle={() => setEventsView(!eventsView)}
            />
          }
        />
        {eventsView ? (
          <EventsView
            breaker={{
              id,
              image,
              name,
            }}
          />
        ) : (
          <BreaksView
            breaker={{
              id,
              image,
            }}
          />
        )}
      </ScrollView>
      <HitDetailModal
        isVisible={!isEmpty(hitDetail)}
        onPressClose={() => setHitDetail({})}
        {...hitDetailForModalSelector(hitDetail)}
      />
    </Container>
  );
};
