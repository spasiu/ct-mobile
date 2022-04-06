import dayjs from 'dayjs';

export const formatScheduledStatus = (date: string): string =>
  dayjs(date).isValid() ? dayjs(date).calendar() : 'TBD';
