import { userNameSelector, userImageSelector } from '../../common/user-profile';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventDescriptionSelector,
  eventIdSelector,
  eventVideoSelector,
} from '../../common/event';
import { SectionHeaderProps } from '../../components';
import { Events, Users } from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';

export const eventBreakerSelector = (breaker: Users): SectionHeaderProps => {
  return {
    title: userNameSelector(breaker),
    image: userImageSelector(breaker),
  };
};

export const eventDetailSelector = (
  event: Events,
  breaker: Users,
): EventDetailModalProps => {
  const eventTime = eventTimeSelector(event);
  return {
    eventId: eventIdSelector(event),
    title: eventTitleSelector(event),
    image: eventImageSelector(event),
    breaker: {
      name: userNameSelector(breaker),
      image: userImageSelector(breaker),
    },
    status: eventCardStatusSelector(event),
    description: eventDescriptionSelector(event),
    eventDate: formatScheduledStatus(eventTime),
    videoUrl: eventVideoSelector(event),
  };
};
