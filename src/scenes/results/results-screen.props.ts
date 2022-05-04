import { Dispatch, SetStateAction } from 'react';
import { EventDetailModalProps } from 'scenes/event-detail/event-detail-modal.props';
import { UserMinimalInformationQuery, Users } from 'services/api/requests';

export type BreakerListType = {
  breakers: Users[];
  onClose: () => void;
  showModal: boolean;
  setBreakerFilter: (breaker: Users) => void;
};

export type ResultsQueryHookType = {
  users: UserMinimalInformationQuery | undefined;
  breakerList: Partial<Users>[] | undefined;
  breakers: Users[] | undefined;
  loading: boolean;
  showBreakerList: boolean;
  setShowBreakerList: (state: boolean) => void;
  breakerFilter: Partial<Users> | undefined;
  setBreakerFilter: Dispatch<SetStateAction<Partial<Users> | undefined>>;
  myEventsFilter: boolean;
  setMyEventsFilter: (state: boolean) => void;
  showDatePicker: boolean;
  setShowDatePicker: (prevState: boolean) => void;
  dateFilter: boolean;
  setDateFilter: (state: boolean) => void;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  result: Partial<EventDetailModalProps>;
  setResult: Dispatch<SetStateAction<Partial<EventDetailModalProps>>>;
};
