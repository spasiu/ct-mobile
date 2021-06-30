import { BreakType } from '../../common/break';
import { Break_Type_Enum } from '../../services/api/requests';

export const ALL_FILTER_OPTION = 'ALL';
export const EVENT_TYPES = [
  ALL_FILTER_OPTION,
  ...Object.values(Break_Type_Enum),
];

export const TEXT_KEY_FOR_BREAK_TYPE: {
  [key in BreakType | typeof ALL_FILTER_OPTION]: string;
} = {
  [Break_Type_Enum.HitDraft]: 'filter.breakTypes.hitDraft',
  [Break_Type_Enum.Personal]: 'filter.breakTypes.personal',
  [Break_Type_Enum.PickYourDivision]: 'filter.breakTypes.pickYourDivision',
  [Break_Type_Enum.PickYourTeam]: 'filter.breakTypes.pickYourTeam',
  [Break_Type_Enum.RandomDivision]: 'filter.breakTypes.randomDivision',
  [Break_Type_Enum.RandomTeam]: 'filter.breakTypes.randomTeam',
  [ALL_FILTER_OPTION]: 'filter.all',
};
