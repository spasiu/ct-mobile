import { TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { Break_Type_Enum } from '../../services/api/requests';

export const textKeyForBreakType = {
  [Break_Type_Enum.HitDraft]: 'break.breakTypes.hitDraft',
  [Break_Type_Enum.Personal]: 'break.breakTypes.personal',
  [Break_Type_Enum.PickYourDivision]: 'break.breakTypes.pickYourTeam',
  [Break_Type_Enum.PickYourTeam]: 'break.breakTypes.pickYourTeam',
  [Break_Type_Enum.RandomDivision]: 'break.breakTypes.randomDivision',
  [Break_Type_Enum.RandomTeam]: 'break.breakTypes.randomTeam',
};

export const badgeContainerStyle = [
  s.bg_white,
  s.ba,
  s.b__black_10,
  s.mh3,
] as ViewStyle[];

export const badgeTextStyle = [s.black] as TextStyle[];
