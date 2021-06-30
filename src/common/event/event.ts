import { Event_Status_Enum } from '../../services/api/requests';

export type EventStatusType = typeof Event_Status_Enum[keyof typeof Event_Status_Enum];
