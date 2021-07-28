import { Breaks, Users } from '../../services/api/requests';
import { BreakerCardProps, FeaturedBreakCardProps } from '../../components';
import {
  breakCardStatusSelector,
  breakImageSelector,
  breakDescriptionSelector,
  breakTitleSelector,
  breakTimeSelector,
} from '../../common/break';
import { formatScheduledStatus } from '../../utils/date';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import { breakerBioSelector } from '../../common/breaker';

export const featuredBreakSelector = (
  eventBreak: Breaks,
): FeaturedBreakCardProps => {
  const breakTime = breakTimeSelector(eventBreak);
  return {
    status: breakCardStatusSelector(eventBreak),
    eventDate: formatScheduledStatus(breakTime),
    viewCount: '321',
    image: breakImageSelector(eventBreak),
    title: breakTitleSelector(eventBreak),
    description: breakDescriptionSelector(eventBreak),
  };
};

export const featuredBreakerSelector = (breaker: Users): BreakerCardProps => {
  return {
    title: userNameSelector(breaker),
    description: breakerBioSelector(breaker),
    image: userImageSelector(breaker),
  };
};
