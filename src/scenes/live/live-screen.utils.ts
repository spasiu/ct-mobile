import firestore from '@react-native-firebase/firestore';
import {
  breakCardStatusSelector,
  breakFollowedByUserSelector,
  breakPriceSelector,
  breakSportSelector,
  breakSpotsSelector,
  breakTimeSelector,
  breakTitleSelector,
  breakTypeSelector,
} from '../../common/break';

import { ChatMessage } from '../../common/chat';
import {
  userImageSelector,
  userUsernameSelector,
} from '../../common/user-profile';
import { BreakCardProps } from '../../components';
import { Breaks, Events, Users } from '../../services/api/requests';
import { formatScheduledStatus } from '../../utils/date';

export const createChatMessage = (
  message: string,
  userId: string,
  user: Partial<Users>,
): ChatMessage => {
  return {
    createdOn: firestore.FieldValue.serverTimestamp(),
    text: message,
    user: {
      id: userId,
      username: userUsernameSelector(user),
      image: userImageSelector(user),
    },
  };
};

export const breakCardSelector = (
  eventBreak: Breaks,
  breaker: Partial<Users>,
  event: Partial<Events>,
): Pick<
  BreakCardProps,
  | 'eventDate'
  | 'status'
  | 'price'
  | 'spotsLeft'
  | 'title'
  | 'breakType'
  | 'breakerImage'
  | 'league'
  | 'userFollows'
> => ({
  eventDate: formatScheduledStatus(breakTimeSelector(eventBreak)),
  status: breakCardStatusSelector(eventBreak, event),
  price: breakPriceSelector(eventBreak),
  spotsLeft: breakSpotsSelector(eventBreak),
  title: breakTitleSelector(eventBreak),
  breakType: breakTypeSelector(eventBreak),
  breakerImage: breaker.image as string,
  league: breakSportSelector(eventBreak),
  userFollows: breakFollowedByUserSelector(eventBreak),
});

export const getNumberOfColumns = (teamsPerUser: number): number => {
  if (teamsPerUser === 1) {
    return 5;
  }

  if (teamsPerUser === 2) {
    return 3;
  }

  if (teamsPerUser === 3 || teamsPerUser === 0) {
    return 2;
  }

  // if size is not predictable, use 1 column only
  return 1;
};
