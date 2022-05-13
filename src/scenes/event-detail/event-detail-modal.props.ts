import { PickBreakCard } from '../../common/break';
import { Dispatch } from 'react';
import {
  Breaks,
  NewEventBreaksSubscription,
} from '../../services/api/requests';
import { OverScreenModalProps, StatusBadgeTypes } from '../../components';

export interface EventDetailModalProps extends OverScreenModalProps {
  modalTitle?: string;
  showHeader?: boolean;
  title: string;
  image: string;
  status: StatusBadgeTypes;
  eventDate: string;
  breaker: { name: string; image: string };
  description?: string;
  eventId: string;
  videoUrl?: string;
}

export type useEventDetailModalHookType = {
  breaks: Breaks[];
  data: NewEventBreaksSubscription | undefined;
  loading: boolean;
  breakId: string | undefined;
  setBreakId: Dispatch<string | undefined>;
  onPressFollow: (item: Breaks, breakCardDetails: PickBreakCard) => void;
};
