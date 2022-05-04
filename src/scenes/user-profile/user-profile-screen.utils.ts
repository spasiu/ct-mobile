import {
  breakBreakerSelector,
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';
import {
  eventBreakerSelector,
  eventCardStatusSelector,
  eventDescriptionSelector,
  eventFollowedByUserSelector,
  eventIdSelector,
  eventImageSelector,
  eventTimeSelector,
  eventTitleSelector,
} from '../../common/event';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import { BreakCardProps, EventCardProps } from '../../components';
import { Breaks, Events, Users } from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import functions from '@react-native-firebase/functions';

export const breakScheduleSelector = (
  eventBreak: Breaks,
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
  breakerImage: userImageSelector(breakBreakerSelector(eventBreak)),
  league: breakSportSelector(eventBreak),
  userFollows: breakFollowedByUserSelector(eventBreak),
});

export const upcomingEventSelector = (event: Events): EventCardProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventDate: formatScheduledStatus(eventTime),
    title: eventTitleSelector(event),
    status: eventCardStatusSelector(event),
    image: eventImageSelector(event),
    userFollows: eventFollowedByUserSelector(event),
  };
};

export const eventDetailSelector = (event: Events): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  const eventBreaker = eventBreakerSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: userNameSelector(eventBreaker),
      image: userImageSelector(eventBreaker as Users),
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
  };
};

export const deleteUser = functions().httpsCallable('deleteUser');
