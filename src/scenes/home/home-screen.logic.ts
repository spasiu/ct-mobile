import Intercom from '@intercom/intercom-react-native';
import {
  userImageSelector,
  userNameSelector,
  userSelector,
  userUsernameSelector,
} from '../../common/user-profile';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { FilterContext, FilterContextType } from '../../providers/filter';
import { useContext, useState } from 'react';
import { EventDetailModalProps } from 'scenes/event-detail/event-detail-modal.props';
import {
  Events,
  Hits,
  useFeaturedBreakersQuery,
  useFeaturedEventsSubscription,
  useFeaturedHitsSubscription,
  UserMinimalInformationQuery,
  Users,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { FeaturedEventCardProps } from 'components/featured-event-card';
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
import { formatScheduledStatus } from '../../utils/date';
import { breakerBioSelector } from '../../common/breaker';
import { BreakerCardProps } from '../../components';

export const useHomeScreenHook = () => {
  const [event, setEvent] = useState<Partial<EventDetailModalProps>>({});
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const { setSportTypeFilter, setItemTypeFilter } = useContext(
    FilterContext,
  ) as FilterContextType;
  const [hitDetail, setHitDetail] = useState<Partial<Hits>>({});

  const { data: featuredEvents } = useFeaturedEventsSubscription();
  const { data: featuredHits } = useFeaturedHitsSubscription();
  const { data: featuredBreakers } = useFeaturedBreakersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
    onCompleted: (queryData: UserMinimalInformationQuery) => {
      const user = userSelector(queryData);
      Intercom.updateUser({
        name: userNameSelector(user),
        customAttributes: {
          username: userUsernameSelector(user),
        },
      });
    },
  });

  return {
    event,
    setEvent,
    setSportTypeFilter,
    setItemTypeFilter,
    hitDetail,
    setHitDetail,
    featuredEvents,
    featuredHits,
    featuredBreakers,
    users,
  };
};

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
