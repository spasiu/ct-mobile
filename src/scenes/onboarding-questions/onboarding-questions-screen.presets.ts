import { Question } from './onboarding-questions-screen.props';

export const QUESTIONS: Question[] = [
  {
    rootKey: 'onboarding.howOftenDoYouBreakQuestion',
    titleKey: 'title',
    subtitleKey: 'subtitle',
    allowMultipleSelection: false,
    options: [
      {
        value: 'new_to_breaking',
        label: 'newToBreaking',
      },
      {
        value: 'few_times_year',
        label: 'fewTimes',
      },
      {
        value: 'once_month',
        label: 'onceMonth',
      },
      {
        value: 'once_week',
        label: 'onceWeek',
      },
      {
        value: 'more_once_week',
        label: 'moreThanOnceWeek',
      },
    ],
  } as Question,
  {
    rootKey: 'onboarding.whatDoYouCollectQuestion',
    titleKey: 'title',
    subtitleKey: 'subtitle',
    allowMultipleSelection: true,
    options: [
      {
        value: 'baseball',
        label: 'baseball',
      },
      {
        value: 'basketball',
        label: 'basketball',
      },
      {
        value: 'football',
        label: 'football',
      },
      {
        value: 'hockey',
        label: 'hockey',
      },
      {
        value: 'soccer',
        label: 'soccer',
      },
      {
        value: 'other',
        label: 'other',
      },
    ],
  } as Question,
  {
    rootKey: 'onboarding.howMuchDoYouSpendQuestion',
    titleKey: 'title',
    subtitleKey: 'subtitle',
    allowMultipleSelection: true,
    options: [
      {
        value: 'less_50',
        label: 'lessThan50',
      },
      {
        value: 'between_50_100',
        label: 'between50and100',
      },
      {
        value: 'between_100_250',
        label: 'between100and250',
      },
      {
        value: 'between_250_500',
        label: 'between250and500',
      },
      {
        value: 'between_500_1000',
        label: 'between500and1000',
      },
      {
        value: 'more_1000',
        label: 'moreThan1000',
      },
    ],
  } as Question,
  {
    rootKey: 'onboarding.howDoYouBreakQuestion',
    titleKey: 'title',
    subtitleKey: 'subtitle',
    allowMultipleSelection: true,
    options: [
      {
        value: 'new',
        label: 'new',
      },
      {
        value: 'pick_your_team',
        label: 'pickYourTeam',
      },
      {
        value: 'random_team',
        label: 'randomTeam',
      },
      {
        value: 'hit_draft',
        label: 'hitDraft',
      },
      {
        value: 'pack_wars',
        label: 'packWars',
      },
      {
        value: 'personals',
        label: 'personals',
      },
    ],
  } as Question,
];
