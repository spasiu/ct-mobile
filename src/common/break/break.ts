import { Break_Type_Enum } from '../../services/api/requests';

export type BreakType = typeof Break_Type_Enum[keyof typeof Break_Type_Enum];

export type BreakResult = {
  image: string;
  user_id: string;
  username: string;
  items?: string[];
};

export type BreakResultItem = {
  title: string,
  shorthand: string,
  primaryColor: string,
  secondaryColor: string
}

export type BreakResultUser = {
  image: string;
  user_id: string;
  username: string;
  items?: BreakResultItem[]
}

