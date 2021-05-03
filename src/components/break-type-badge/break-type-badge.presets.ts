import { styles as s } from 'react-native-style-tachyons';

import { Break_Type_Enum } from '../../services/api/requests';

export const TEXT_KEY_FOR_BREAK_TYPE = {
  [Break_Type_Enum.HitDraft]: 'break.breakTypes.hitDraft',
  [Break_Type_Enum.Personal]: 'break.breakTypes.personal',
  [Break_Type_Enum.PickYourDivision]: 'break.breakTypes.pickYourTeam',
  [Break_Type_Enum.PickYourTeam]: 'break.breakTypes.pickYourTeam',
  [Break_Type_Enum.RandomDivision]: 'break.breakTypes.randomDivision',
  [Break_Type_Enum.RandomTeam]: 'break.breakTypes.randomTeam',
};

export const BADGE_CONTAINER_STYLE = [s.bg_white, s.ba, s.b__black_10, s.mh3];

export const BADGE_TEXT_STYLE = [s.black];
