import React from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';

import { EmptyState, HitCard, ImageCardSizeTypes } from '../../components';

import { HitDetailModal } from '../hit-detail/hit-detail-modal';
import { hitImageFrontSelector, hitPlayerSelector } from '../../common/hit';
import { hitDetailForModalSelector } from '../hit-detail/hit-detail-modal.logic';
import { t } from '../../i18n/i18n';
import { useUserUpcomingHitsHook } from './user-profile-screen.logic';
export const UserUpcomingHits = (): JSX.Element => {
  const { hitDetail, setHitDetail, hits } = useUserUpcomingHitsHook();

  if (isEmpty(hits)) {
    return (
      <EmptyState
        title={t('emptyResults.noHitsFollowedByUserTitle')}
        description={t('emptyResults.noHitsFollowedByUserDescription')}
      />
    );
  }

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={[s.w_100]}
        contentContainerStyle={[s.pr3]}
        data={hits}
        horizontal
        renderItem={({ item }) => (
          <HitCard
            onPress={() => setHitDetail(item)}
            containerStyle={[s.mr3]}
            image={hitImageFrontSelector(item)}
            title={hitPlayerSelector(item)}
            cardSize={ImageCardSizeTypes.small}
          />
        )}
      />
      <HitDetailModal
        isVisible={!isEmpty(hitDetail)}
        onPressClose={() => setHitDetail({})}
        {...hitDetailForModalSelector(hitDetail)}
      />
    </>
  );
};
