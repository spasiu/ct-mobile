import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { BreakerCard, EmptyState } from '../../components';
import { t } from '../../i18n/i18n';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  useFollowBreakerMutation,
  useUnfollowBreakerMutation,
} from '../../services/api/requests';
import {
  optimisticFollowBreakerResponse,
  optimisticUnfollowBreakerResponse,
  updateFollowBreakerCache,
  updateUnfollowBreakerCache,
} from '../../utils/cache';

import { breakerCardSelector } from './search-modal.utils';
import { SearchBreakersViewProps } from './search-modal.props';

export const SearchBreakersView = ({
  breakers,
  onPressBreaker,
}: SearchBreakersViewProps): JSX.Element => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [followBreaker] = useFollowBreakerMutation();
  const [unfollowBreaker] = useUnfollowBreakerMutation();

  const cardWidth = sizes.w5 + sizes.w3 + sizes.w2;
  return (
    <FlatList
      ListEmptyComponent={() => (
        <EmptyState
          title={t('emptyResults.noBreakersTitle')}
          description={t('emptyResults.noBreakersDescription')}
        />
      )}
      keyExtractor={item => item.id}
      style={[s.flx_i, s.ph3]}
      data={breakers}
      renderItem={({ item }) => {
        const breakerCard = breakerCardSelector(item);
        return (
          <View style={[s.flx_i, s.aic, s.mb4]}>
            <BreakerCard
              {...breakerCard}
              onPress={() => onPressBreaker(item)}
              cardWidth={cardWidth}
              containerStyle={[s.flx_i, { width: cardWidth }]}
              cardSize="large"
              onPressFollow={() => {
                const followData = {
                  user_id: authUser?.uid,
                  breaker_id: item.id,
                };

                breakerCard.userFollows
                  ? unfollowBreaker({
                      optimisticResponse: optimisticUnfollowBreakerResponse(
                        item,
                        authUser?.uid as string,
                      ),
                      update: cache => updateUnfollowBreakerCache(cache, item),
                      variables: followData,
                    })
                  : followBreaker({
                      optimisticResponse: optimisticFollowBreakerResponse(
                        item,
                        authUser?.uid as string,
                      ),
                      update: (cache, followResponse) =>
                        updateFollowBreakerCache(cache, followResponse, item),
                      variables: {
                        follow: followData,
                      },
                    });
              }}
            />
          </View>
        );
      }}
    />
  );
};
