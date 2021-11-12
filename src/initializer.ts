require('./common/error/global'); // initialize global error handling

import * as Yup from 'yup';
import YupPassword from 'yup-password';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import firestore from '@react-native-firebase/firestore';

import { t } from './i18n/i18n';
import { getLocale } from './utils/localization';

export const initLibraries = async (
  setLoaded: (loaded: boolean) => void,
): Promise<void> => {
  // disable offline persistence
  await firestore().settings({
    persistence: false,
  });

  // start yup password validators
  Yup.setLocale({
    mixed: { notType: t('forms.numberField') },
  });
  YupPassword(Yup);

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

  setLoaded(true);
};
