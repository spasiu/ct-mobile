import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';

import { t } from '../i18n/i18n';
import { getLocale } from './localization';

// start dayjs calendar to customize calendar locale
dayjs.extend(calendar);
dayjs.extend(updateLocale);

dayjs.updateLocale(getLocale(), {
  calendar: {
    lastDay: 'ddd, h:mma',
    sameDay: `[${t('calendar.today')}], h:mma`,
    nextDay: 'ddd, h:mma',
    lastWeek: 'ddd, h:mma',
    nextWeek: 'ddd, h:mma',
    sameElse: 'MMM D, h:mma',
  },
});

export const formatScheduledStatus = (date: string) => dayjs(date).calendar();
