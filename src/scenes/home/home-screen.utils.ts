import { Events, Users } from '../../services/api/requests';
import { BreakerCardProps, FeaturedEventCardProps } from '../../components';
import { formatScheduledStatus } from '../../utils/date';
import { userImageSelector, userNameSelector } from '../../common/user-profile';
import { breakerBioSelector } from '../../common/breaker';
import {
  eventBreakerSelector,
  eventCardStatusSelector,
  eventDescriptionSelector,
  eventIdSelector,
  eventImageSelector,
  eventTimeSelector,
  eventTitleSelector,
  eventViewCountSelector,
} from '../../common/event';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';

export const featuredEventSelector = (
  event: Events,
): FeaturedEventCardProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    status: eventCardStatusSelector(event),
    eventDate: formatScheduledStatus(eventTime),
    viewCount: eventViewCountSelector(event),
    image: eventImageSelector(event),
    title: eventTitleSelector(event),
    description: eventDescriptionSelector(event),
  };
};

export const featuredEventDetailSelector = (
  event: Events,
): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  const eventBreaker = eventBreakerSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: userNameSelector(eventBreaker),
      image: userImageSelector(eventBreaker),
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
  };
};

export const featuredBreakerSelector = (breaker: Users): BreakerCardProps => {
  return {
    breakerId: breaker.id,
    title: userNameSelector(breaker),
    description: breakerBioSelector(breaker),
    image: userImageSelector(breaker),
  };
};
