import { Dispatch, SetStateAction } from 'react';
import { Breaks, EventBreaksQuery } from 'services/api/requests';
import { OverScreenModalProps, StatusBadgeTypes } from '../../components';
export interface ResultDetailModalProps extends OverScreenModalProps {
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
  breaks?: [];
}

export type useResultDetailModalHookType = {
  breaks: Breaks[];
  loading: boolean;
  data: EventBreaksQuery | undefined;
  breakResults: Breaks | undefined;
  setBreakResults: Dispatch<SetStateAction<Breaks | undefined>>;
  userId: string | undefined;
};
