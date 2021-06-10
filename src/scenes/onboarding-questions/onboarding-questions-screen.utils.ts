import { Question } from '../../common/break-preferences';
import { UserPreferencesType } from './onboarding-questions-screen.props';
import R from 'ramda';

import { postgresStringArray } from '../../utils/array';

export const formatUserPreferences = (
  userPreferences: UserPreferencesType,
  questions: Question[],
): { [key: string]: string } => {
  return R.reduce(
    (acc, value) => {
      const question = R.find(R.propEq('questionKey', value))(
        questions,
      ) as Question;
      return {
        ...acc,
        [value]: question.allowMultipleSelection
          ? postgresStringArray(userPreferences[value] as string[])
          : userPreferences[value],
      };
    },
    {},
    R.keys(userPreferences),
  );
};
