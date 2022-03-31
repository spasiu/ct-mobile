import { Hits } from '../../services/api/requests';

export interface HitsViewProps {
  hits: Hits[];
  onEndReached?: (offset: number) => void;
  loading?: boolean;
}
