import { BreakCardProps } from '../../components';
import {
  Breaks,
  Break_Status_Enum,
  useEventBreaksQuery,
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
} from '../../common/break';
import { formatScheduledStatus } from '../../utils/date';
import { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useResultDetailModalHookType } from './result-detail-modal.props';

export const breakCardSelector = (
  eventBreak: Breaks,
  breaker: { name: string; image: string },
): Pick<
  BreakCardProps,
  | 'eventDate'
  | 'status'
  | 'price'
  | 'spotsLeft'
  | 'title'
  | 'breakType'
  | 'breakerImage'
  | 'league'
  | 'userFollows'
> => ({
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

export const useResultDetailModalHook = (
  eventId: string,
): useResultDetailModalHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [breakResults, setBreakResults] = useState<Breaks>();

  const { loading, data } = useEventBreaksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: eventId,
      userId: authUser?.uid,
      status: { _eq: Break_Status_Enum.Completed },
    },
  });
  const breaks = breaksSelector(data);
  return {
    breaks,
    loading,
    data,
    breakResults,
    setBreakResults,
    userId: authUser?.uid,
  };
};
