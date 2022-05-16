import {
  Breaks,
  Break_Status_Enum,
  useFollowBreakMutation,
  useUnfollowBreakMutation,
  useNewEventBreaksSubscription,
} from '../../services/api/requests';
import {
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breaksSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
  PickBreakCard,
} from '../../common/break';
import { formatScheduledStatus } from '../../utils/date';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useContext, useState } from 'react';
import {
  optimisticUnfollowBreakResponse,
  updateUnfollowBreakCache,
  optimisticFollowBreakResponse,
  updateFollowBreakCache,
} from '../../utils/cache';
import { useEventDetailModalHookType } from './event-detail-modal.props';

export const breakCardSelector = (
  eventBreak: Breaks,
  breaker: { name: string; image: string },
): PickBreakCard => ({
  eventDate: formatScheduledStatus(breakTimeSelector(eventBreak)),
  status: breakCardStatusSelector(eventBreak),
  price: breakPriceSelector(eventBreak),
  spotsLeft: breakSpotsSelector(eventBreak),
  title: breakTitleSelector(eventBreak),
  breakType: breakTypeSelector(eventBreak),
  breakerImage: breaker.image,
  league: breakSportSelector(eventBreak),
  userFollows: breakFollowedByUserSelector(eventBreak),
});

export const useEventDetailModalHook = (
  eventId: string,
): useEventDetailModalHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakId, setBreakId] = useState<string>();

  const { loading, data } = useNewEventBreaksSubscription({
    variables: {
      id: eventId,
      userId: authUser?.uid,
      status: { _neq: Break_Status_Enum.Completed },
    },
  });

  const [followBreak] = useFollowBreakMutation();
  const [unfollowBreak] = useUnfollowBreakMutation();

  const breaks = breaksSelector(data);
  const onPressFollow = (item: Breaks, breakCardDetails: PickBreakCard) => {
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
  };
  return {
    breaks,
    data,
    loading,
    breakId,
    setBreakId,
    onPressFollow,
  };
};
