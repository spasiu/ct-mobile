import React, { useState } from 'react';
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

import { ICON_SIZE, WINDOW_WIDTH } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';
import {
  Container,
  ContainerTypes,
  NavigationBar,
  FollowButton,
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

import { breakerDetailScreenSelector } from './breaker-detail-screen-utils';
import { BreaksView } from './breaks-view';
import { EventsView } from './events-view';

const RECENT_HITS = [
  {
    id: 'hits-1',
    image: '/temp-hits/Lionel-Messi-71.jpeg',
    name: 'Lionel Messi',
  },
  {
    id: 'hits-2',
    image: '/temp-hits/Ceedee-Lamb.jpeg',
    name: 'Ceedee Lamb',
  },
  {
    id: 'hits-3',
    image: '/temp-hits/Deshaun-Watson.jpeg',
    name: 'Deshaun Watson',
  },
  {
    id: 'hits-4',
    image: '/temp-hits/Ja-Morant.jpeg',
    name: 'Ja Morant',
  },
  {
    id: 'hits-5',
    image: '/temp-hits/Justin-Herbert.jpeg',
    name: 'Justin Herbert',
  },
  {
    id: 'hits-6',
    image: '/temp-hits/Mike-Trout.jpeg',
    name: 'Mike Trout',
  },
];

export const BreakerDetailScreen = ({ route, navigation }) => {
  const { breaker, startOnEventsView = false } = route.params;
  const [eventsView, setEventsView] = useState(startOnEventsView);

  const { id, name, image, social, description } = breakerDetailScreenSelector(
    breaker,
  );

  const pixelRatio = PixelRatio.get();
  const videoWidth = WINDOW_WIDTH - sizes.mv3 * 2;
  const iframeHeight = (videoWidth * pixelRatio) / 2;

  const videoHtml = `
    <html>
      <body style="display:flex;justify-content:center;align-items:center;background-color:${
        COLORS.black_5
      }">
      <iframe style="border-radius:${
        sizes.br5
      }px;" src="https://player.vimeo.com/video/${541190711}" width="100%" height="${iframeHeight}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </body>
    </html>
  `;

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
            <FollowButton />
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
          data={RECENT_HITS}
          horizontal
          renderItem={({ item }) => (
            <HitCard
              onPress={() =>
                navigation.navigate(ROUTES_IDS.HIT_DETAIL_MODAL, {})
              }
              showTitle={false}
              containerStyle={[s.mr3]}
              image={item.image}
              title={item.name}
              cardSize={ImageCardSizeTypes.small}
            />
          )}
        />
        <SectionHeader
          containerStyle={[s.mh3, s.h3, s.mb2]}
          title={t('sections.break')}
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
    </Container>
  );
};
