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
