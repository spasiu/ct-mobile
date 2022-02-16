import { BreakCardProps } from '../../components';
import { Breaks } from '../../services/api/requests';
import {
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import { formatScheduledStatus } from '../../utils/date';

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
