import { userNameSelector, userImageSelector } from '../../common/user-profile';
import {
  eventTimeSelector,
  eventCardStatusSelector,
  eventImageSelector,
  eventTitleSelector,
  eventDescriptionSelector,
  eventIdSelector,
  eventVideoSelector,
  formatEvents,
} from '../../common/event';
import { SectionHeaderProps } from '../../components';
import {
  Events,
  useBreakersListQuery,
  useCompletedEventsQuery,
  Users,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../../providers/auth';
import dayjs from 'dayjs';
import { ResultsScreenHookType } from './results-screen.props';

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

export const useResultsScreenHook = (): ResultsScreenHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateFilter, setDateFilter] = useState(false);
  const [result, setResult] = useState<Partial<EventDetailModalProps>>({});
  const [myEventsFilter, setMyEventsFilter] = useState(false);
  const [showBreakerList, setShowBreakerList] = useState(false);
  const [breakerFilter, setBreakerFilter] = useState<Partial<Users>>();

  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });
  const { data: breakerList } = useBreakersListQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { loading, data } = useCompletedEventsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      breakerId: breakerFilter ? { _eq: breakerFilter.id } : {},
      startDate: dateFilter ? { _gte: date } : {},
      endDate: dateFilter
        ? {
            start_time: {
              _lte: dayjs(date).add(1, 'day').subtract(1, 'second').toDate(),
            },
          }
        : {},
      limit: 100,
      userId: myEventsFilter
        ? { Order: { user_id: { _eq: authUser?.uid } } }
        : {},
    },
  });
  const breakers = formatEvents(data);
  return {
    users,
    breakerList: breakerList?.Users,
    breakers,
    loading,
    showBreakerList,
    setShowBreakerList,
    breakerFilter,
    setBreakerFilter,
    result,
    setResult,
    showDatePicker,
    setShowDatePicker,
    dateFilter,
    setDateFilter,
    date,
    setDate,
    myEventsFilter,
    setMyEventsFilter,
  };
};
