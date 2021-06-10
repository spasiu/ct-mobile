import { Break_Type_Enum } from '../../services/api/requests';

import { Pricing } from '../pricing';
import { Sports } from '../sports';
import { Frequency } from '../frequency';
export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  questionKey: string;
  translationRootKey: string;
  titleKey: string;
  subtitleKey: string;
  allowMultipleSelection: boolean;
  options: QuestionOption[];
}

export const PRICING_OPTIONS = {
  questionKey: 'pricing',
  translationRootKey: 'onboarding.howMuchDoYouSpendQuestion',
  titleKey: 'title',
  subtitleKey: 'subtitle',
  allowMultipleSelection: true,
  options: [
    {
      value: Pricing.less_50,
      label: 'lessThan50',
    },
    {
      value: Pricing.between_50_100,
      label: 'between50and100',
    },
    {
      value: Pricing.between_100_250,
      label: 'between100and250',
    },
    {
      value: Pricing.between_250_500,
      label: 'between250and500',
    },
    {
      value: Pricing.between_500_1000,
      label: 'between500and1000',
    },
    {
      value: Pricing.more_1000,
      label: 'moreThan1000',
    },
  ],
} as Question;

export const SPORTS_OPTIONS = {
  questionKey: 'sports',
  translationRootKey: 'onboarding.whatDoYouCollectQuestion',
  titleKey: 'title',
  subtitleKey: 'subtitle',
  allowMultipleSelection: true,
  options: [
    {
      value: Sports.baseball,
      label: 'baseball',
    },
    {
      value: Sports.basketball,
      label: 'basketball',
    },
    {
      value: Sports.football,
      label: 'football',
    },
    {
      value: Sports.hockey,
      label: 'hockey',
    },
    {
      value: Sports.soccer,
      label: 'soccer',
    },
    {
      value: 'OTHER',
      label: 'other',
    },
  ],
} as Question;

export const BREAK_TYPE_OPTIONS = {
  questionKey: 'break_type',
  translationRootKey: 'onboarding.howDoYouBreakQuestion',
  titleKey: 'title',
  subtitleKey: 'subtitle',
  allowMultipleSelection: true,
  options: [
    {
      value: 'NEW',
      label: 'new',
    },
    {
      value: Break_Type_Enum.HitDraft,
      label: 'hitDraft',
    },
    {
      value: Break_Type_Enum.PickYourTeam,
      label: 'pickYourTeam',
    },
    {
      value: Break_Type_Enum.PickYourDivision,
      label: 'pickYourDivision',
    },
    {
      value: Break_Type_Enum.RandomTeam,
      label: 'randomTeam',
    },
    {
      value: Break_Type_Enum.RandomDivision,
      label: 'randomDivision',
    },
    {
      value: Break_Type_Enum.Personal,
      label: 'personal',
    },
  ],
} as Question;

export const FREQUENCY_OPTIONS = {
  questionKey: 'frequency',
  translationRootKey: 'onboarding.howOftenDoYouBreakQuestion',
  titleKey: 'title',
  subtitleKey: 'subtitle',
  allowMultipleSelection: false,
  options: [
    {
      value: Frequency.new_to_breaking,
      label: 'newToBreaking',
    },
    {
      value: Frequency.few_times_year,
      label: 'fewTimes',
    },
    {
      value: Frequency.once_month,
      label: 'onceMonth',
    },
    {
      value: Frequency.once_week,
      label: 'onceWeek',
    },
    {
      value: Frequency.more_once_week,
      label: 'moreThanOnceWeek',
    },
  ],
} as Question;

export const QUESTIONS: Question[] = [
  FREQUENCY_OPTIONS,
  SPORTS_OPTIONS,
  PRICING_OPTIONS,
  BREAK_TYPE_OPTIONS,
];
