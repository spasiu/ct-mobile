import { Break_Type_Enum } from '../../services/api/requests';

export type BreakType = typeof Break_Type_Enum[keyof typeof Break_Type_Enum];
