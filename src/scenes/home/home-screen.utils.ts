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
  const breakImage = breakImageSelector(eventBreak);
  const breakTime = breakTimeSelector(eventBreak);
  return {
    status: breakCardStatusSelector(eventBreak),
    eventDate: formatScheduledStatus(breakTime),
    viewCount: '321',
    image: { uri: breakImage || 'https://source.unsplash.com/600x801/?sports' },
    title: breakTitleSelector(eventBreak),
    description: breakDescriptionSelector(eventBreak),
  };
};

export const featuredBreakerSelector = (breaker: Users): BreakerCardProps => {
  const breakerName = userNameSelector(breaker);
  const description = breakerBioSelector(breaker);
  const image = userImageSelector(breaker);
  return {
    title: breakerName,
    description,
    image: { uri: image },
  };
};
