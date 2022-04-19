import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';

import { HitCard, EmptyState, Loading } from '../../components';

import { t } from '../../i18n/i18n';
import { Hits } from '../../services/api/requests';

import { hitImageFrontSelector, hitPlayerSelector } from '../../common/hit';
import { hitDetailForModalSelector } from '../../scenes/hit-detail/hit-detail-modal.utils';
import { HitDetailModal } from '../../scenes/hit-detail/hit-detail-modal';

import {
  triggerAnalyticsEvent,
  AnalyticsEventTypes,
} from '../../utils/analytics-events';

import { completeHits } from './hits-view.utils';
import {
  NUMBER_OF_COLUMNS,
  HIT_CARD_WIDTH,
  HIT_CARD_HEIGHT,
  gridStyle,
  gridContentStyle,
  spacingItemStyle,
  hitCardContainerStyle,
  hitCardTextStyle,
} from './hits-view.presets';
import { HitsViewProps } from './hits-view.props';

export const HitsView = ({
  hits,
  onEndReached,
  loading,
  myHits,
}: HitsViewProps): JSX.Element => {
  const [hitDetail, setHitDetail] = useState<Partial<Hits>>({});
  return (
    <>
      <FlatList
        ListEmptyComponent={() => (
          <EmptyState
            title={
              myHits
                ? t('emptyResults.noMyHitsTitle')
                : t('emptyResults.noHitSearchResultTitle')
            }
            description={
              myHits
                ? t('emptyResults.noMyHitsDescription')
                : t('emptyResults.noHitSearchResultDescription')
            }
          />
        )}
        style={gridStyle}
        ListFooterComponent={() => (loading ? <Loading /> : null)}
        onEndReachedThreshold={0.5}
        onEndReached={() => !loading && onEndReached && onEndReached()}
        numColumns={NUMBER_OF_COLUMNS}
        data={hits.length % NUMBER_OF_COLUMNS === 0 ? hits : completeHits(hits)}
        contentContainerStyle={gridContentStyle}
        keyExtractor={(_, index) => `main-hits-${index}`}
        renderItem={({ item }) => {
          if (isEmpty(item)) {
            return (
              <View
                style={[
                  ...spacingItemStyle,
                  {
                    width: HIT_CARD_WIDTH,
                    height: HIT_CARD_HEIGHT,
                  },
                ]}
              />
            );
          }
          return (
            <HitCard
              onPress={() => setHitDetail(item)}
              title={hitPlayerSelector(item)}
              image={hitImageFrontSelector(item)}
              containerStyle={hitCardContainerStyle}
              textStyle={[...hitCardTextStyle, { height: sizes.h2 * 1.8 }]}
              cardWidth={HIT_CARD_WIDTH}
              cardHeight={HIT_CARD_HEIGHT}
              cardStyle={[s.br3]}
            />
          );
        }}
      />
      <HitDetailModal
        isVisible={!isEmpty(hitDetail)}
        onPressClose={() => {
          triggerAnalyticsEvent({
            event: AnalyticsEventTypes.viewed_hit,
            customProperties: {
              player: hitPlayerSelector(hitDetail),
            },
          });
          setHitDetail({});
        }}
        {...hitDetailForModalSelector(hitDetail)}
      />
    </>
  );
};
