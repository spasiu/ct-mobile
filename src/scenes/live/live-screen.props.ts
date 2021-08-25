import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';

import { BreakResult } from '../../common/break';
import { ChatMessage } from '../../common/chat';
import { OverScreenModalProps, SlidingBoxProps } from '../../components';
import { ProtectedStackParamList, ROUTES_IDS } from '../../navigators';
import {
  Breaks,
  Break_Type_Enum,
  Events,
  Users,
} from '../../services/api/requests';

export interface LiveNowBoxProps extends SlidingBoxProps {
  breakTitle?: string;
}

export interface UpNextBoxProps extends SlidingBoxProps {
  breakTitle?: string;
  price?: string;
  spotsLeft?: string;
}

export interface ChatProps {
  messages: ChatMessage[];
}

export interface UpcomingBreaksProps extends OverScreenModalProps {
  event: Partial<Events>;
  breaks: Breaks[];
  breaker: Partial<Users>;
}

export interface SeeAllTeamsModalProps extends OverScreenModalProps {
  userId: string;
  result: BreakResult[];
  breakType: Break_Type_Enum;
}

export interface BreakResultBoxProps {
  userTeam: BreakResult;
  loggedUserId: string;
  boxWidth: number;
  boxHeight: number;
}

export interface HitDraftBrealResultBoxProps extends BreakResultBoxProps {
  index: number;
}

type LiveScreenRouteProp = RouteProp<
  ProtectedStackParamList,
  typeof ROUTES_IDS.LIVE_MODAL
>;

type LiveScreenNavigationProp = NativeStackNavigationProp<
  ProtectedStackParamList,
  typeof ROUTES_IDS.LIVE_MODAL
>;

export interface LiveScreenProps {
  navigation: LiveScreenNavigationProp;
  route: LiveScreenRouteProp;
}
