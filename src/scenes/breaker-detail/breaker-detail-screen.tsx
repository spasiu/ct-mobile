import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  PixelRatio,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';
import ReadMore from '@fawazahmed/react-native-read-more';
import { WebView } from 'react-native-webview';

import { WINDOW_WIDTH } from '../../theme/sizes';
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
} from '../../components';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { t } from '../../i18n/i18n';

import { breakerProfileSelector } from './breaker-detail-screen-utils';
import { BreaksView } from './breaks-view';
import { EventsView } from './events-view';

const RECENT_HITS = [
  {
    id: 210,
    name: 'Luis Robert',
  },
  {
    id: 211,
    name: 'Ceedee Lamb',
  },
  {
    id: 212,
    name: 'Deshaun Watson',
  },
  {
    id: 213,
    name: 'Luis Robert',
  },
  {
    id: 214,
    name: 'Ceedee Lamb',
  },
  {
    id: 215,
    name: 'Deshaun Watson',
  },
];

export const BreakerDetailScreen = ({ route, navigation }) => {
  const { breaker, id, startOnEventsView = false } = route.params;
  const [eventsView, setEventsView] = useState(startOnEventsView);

  const { image, name, description, social } = breakerProfileSelector(breaker);
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
              <Image
                resizeMode={'cover'}
                style={[s.circle_l, s.mr3]}
                source={image}
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
          <ReadMore
            style={[s.ff_alt_r, s.f5, s.lh_high, s.mv3]}
            numberOfLines={5}
            seeMoreText={t('buttons.seeMore')}
            seeLessText={t('buttons.seeLess')}
            seeMoreStyle={[s.ff_alt_b, s.black]}
            seeLessStyle={[s.ff_alt_b, s.black]}>
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
              image={{
                uri: 'https://source.unsplash.com/363x522/?sports',
              }}
              title={item.name}
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
