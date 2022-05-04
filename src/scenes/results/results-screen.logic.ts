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
import {
  BreakerFilterHookType,
  DateFilterHookType,
  MyEventsFilterHookType,
  ResultDetailHookType,
  ResultsQueryHookType,
} from './results-screen.props';

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

export const useBreakerFilterHook = (): BreakerFilterHookType => {
  const [showBreakerList, setShowBreakerList] = useState(false);
  const [breakerFilter, setBreakerFilter] = useState<Partial<Users>>();
  const chooseBreaker = (breaker: Partial<Users>) => {
    setBreakerFilter(breaker);
    setShowBreakerList(false);
  };
  return {
    showBreakerList,
    setShowBreakerList,
    breakerFilter,
    setBreakerFilter,
    chooseBreaker,
  };
};

export const useMyEventsFilterHook = (): MyEventsFilterHookType => {
  const [myEventsFilter, setMyEventsFilter] = useState(false);
  return { myEventsFilter, setMyEventsFilter };
};

export const useDateFilterHook = (): DateFilterHookType => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateFilter, setDateFilter] = useState(false);
  const confirmDate = (input: Date) => {
    setDate(input);
    setShowDatePicker(false);
    setDateFilter(true);
  };
  const cancelDate = () => {
    setDate(new Date());
    setShowDatePicker(false);
    setDateFilter(false);
  };
  return {
    showDatePicker,
    setShowDatePicker,
    dateFilter,
    confirmDate,
    cancelDate,
    date,
  };
};

export const useResultsScreenHook = (
  myEventsFilter?: boolean,
  date?: Date,
  dateFilter?: boolean,
  breakerFilter?: Partial<Users>,
): ResultsQueryHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
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
  return { users, breakerList: breakerList?.Users, breakers, loading };
};

export const useEventResultHook = (): ResultDetailHookType => {
  const [result, setResult] = useState<Partial<EventDetailModalProps>>({});
  return { result, setResult };
};
