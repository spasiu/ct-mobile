import React, { useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { isEmpty } from 'ramda';

import { EmptyState, HitCard, ImageCardSizeTypes } from '../../components';

import { HitDetailModal } from '../hit-detail/hit-detail-modal';

import { AuthContext, AuthContextType } from '../../providers/auth';
import { Hits, useHitsQuery } from '../../services/api/requests';
import {
  hitImageFrontSelector,
  hitPlayerSelector,
  hitsSelector,
} from '../../common/hit';
import { hitDetailForModalSelector } from '../hit-detail/hit-detail-modal.utils';
import { t } from '../../i18n/i18n';

export const UserUpcomingHits = (): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [hitDetail, setHitDetail] = useState<Partial<Hits>>({});

  const { data } = useHitsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      searchInput: '%%',
      userHitsFilter: {
        _eq: authUser?.uid as string,
      },
    },
  });

  const hits = hitsSelector(data);
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
