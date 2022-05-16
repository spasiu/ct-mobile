import { Sports } from '../../common/sports';
import {
  ItemTypeFilterOptions,
  SportTypeFilterOptions,
  BreakTypeFilterOptions,
} from '../../providers/filter';
import { Dispatch, SetStateAction } from 'react';
import {
  Breaks,
  Break_Type_Enum,
  Events,
  NewScheduledBreaksSubscription,
  NewScheduledEventsSubscription,
  Users,
} from '../../services/api/requests';
import { EventDetailModalProps } from '../event-detail/event-detail-modal.props';
import { EventCardProps } from '../../components';
import { PickBreakCard } from 'common/break';

export type FilterType = BreakTypeFilterOptions | SportTypeFilterOptions;

export type useScheduleScreenHookType = {
  breaksView: boolean;
  setBreaksView: Dispatch<SetStateAction<boolean>>;
  setItemTypeFilter: (itemType: ItemTypeFilterOptions) => void;
  filters: FilterType[];
  isSport: (filter: FilterType) => filter is Sports;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  sportTypeFilter: SportTypeFilterOptions;
  setSportTypeFilter: (sportType: SportTypeFilterOptions) => void;
  breakTypeFilter: Break_Type_Enum | 'ALL';
  setBreakTypeFilter: (breakType: BreakTypeFilterOptions) => void;
};

export type useEventViewHookType = {
  loading: boolean;
  data: NewScheduledEventsSubscription | undefined;
  hasNoEvents: boolean;
  event: Partial<EventDetailModalProps>;
  setEvent: Dispatch<SetStateAction<Partial<EventDetailModalProps>>>;
  breakers: Users[];
  onPressFollow: (item: Events, eventData: EventCardProps) => void;
};

export type useBreaksViewHookType = {
  loading: boolean;
  data: NewScheduledBreaksSubscription | undefined;
  breakId: string | undefined;
  setBreakId: React.Dispatch<React.SetStateAction<string | undefined>>;
  onPressFollow: (eventBreak: Breaks, breakSchedule: PickBreakCard) => void;
};
