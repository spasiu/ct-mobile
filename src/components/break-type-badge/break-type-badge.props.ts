import { Break_Type_Enum } from '../../services/api/requests';
import { BadgeProps } from '../badge';

export interface BreakTypeBadgeProps extends BadgeProps {
  breakType: Break_Type_Enum;
}
