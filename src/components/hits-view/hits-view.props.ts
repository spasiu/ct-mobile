import { Hits } from '../../services/api/requests';

export interface HitsViewProps {
  hits: Hits[];
  onEndReached?: () => void;
  loading?: boolean;
  myHits?: boolean;
}
