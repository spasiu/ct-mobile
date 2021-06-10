import dayjs from 'dayjs';

export const formatScheduledStatus = (date: string): string =>
  dayjs(date).calendar();
