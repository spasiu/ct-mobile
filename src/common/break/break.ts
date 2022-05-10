import { BreakCardProps } from '../../components';
import { Break_Type_Enum } from '../../services/api/requests';

export type BreakType = typeof Break_Type_Enum[keyof typeof Break_Type_Enum];

export type BreakResultItem = {
  name: string;
  short_code: string;
  color: string;
  color_secondary: string;
};

export type BreakResult = {
  image: string;
  user_id: string;
  username: string;
  items?: BreakResultItem[];
};

export type BreakResultUser = {
  image: string;
  user_id: string;
  username: string;
  items?: BreakResultItem[];
};

export type PickBreakCard = Pick<
  BreakCardProps,
  | 'title'
  | 'status'
  | 'eventDate'
  | 'price'
  | 'spotsLeft'
  | 'breakType'
  | 'breakerImage'
  | 'league'
  | 'userFollows'
>;
