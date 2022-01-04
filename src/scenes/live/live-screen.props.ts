import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';

import { BreakResult } from '../../common/break';
import { ChatMessage } from '../../common/chat';
import { OverScreenModalProps, SlidingBoxProps } from '../../components';
import { ProtectedStackParamList, ROUTES_IDS } from '../../navigators';
import { BreakResultUser, BreakResultItem } from '../../common/break/break';
import {
  Breaks,
  Break_Type_Enum,
  Events,
  Users,
} from '../../services/api/requests';

export interface LiveNowBoxProps extends SlidingBoxProps {
  breakTitle?: string;
  canBuy: boolean;
  price?: string;
  spotsLeft?: number;
}

export interface UpNextBoxProps extends SlidingBoxProps {
  breakTitle?: string;
  price?: string;
  spotsLeft?: number;
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

export type LiveScreenNavigationProp = NativeStackNavigationProp<
  ProtectedStackParamList,
  typeof ROUTES_IDS.LIVE_MODAL
>;

export interface LiveScreenProps {
  navigation: LiveScreenNavigationProp;
  route: LiveScreenRouteProp;
}

export interface TermsOfUseModalProps extends OverScreenModalProps {
  onPressCancel: () => void;
  onPressConfirm: () => void;
}

export interface SeeTeamsAnimationProps {
  userId: string;
  result: BreakResultUser[];
  breakType?: Break_Type_Enum;
  onPressClose?: () => void;
}

export interface BreakResultSummaryProps {
  teamCount?: number;
  userCount: number;
  breakType: Break_Type_Enum;
  hideTeamCount?: boolean;
  onEnd?: () => void;
}

export interface RandomTeamUserRowsProps {
  userId: string;
  users: BreakResultUser[];
  onEnd?: () => void;
}

export interface RandomTeamUserRowProps {
  currentUserId: string;
  users: BreakResultUser[];
  visibleTeamsInRow: number;
  allTeams: BreakResultItem[];
  injectElementsAtColumnIndex: number;
  rowIndex: number;
  usersPerRow: number;
}

export interface HitDraftUserRowsProps {
  userId: string;
  users: BreakResultUser[];
  onEnd?: () => void;
}

export interface HitDraftUserRowProps {
  currentUserId: string;
  users: BreakResultUser[];
  rowIndex: number;
}

export interface TeamRandomizerProps {
  allTeams: BreakResultItem[];
  result: BreakResultItem;
  boxSize: number;
  teamIndex: number;
  boxMargin: number;
  currentAnimatingIndex: number;
  isReady: boolean;
  columnIndex: number;
  rowIndex: number;
  preloadTeams: boolean;
}

export interface TeamShadowProps {
  boxMargin: number;
  boxSize: number;
  rowIndex: number;
}

export interface FloatingDiamondsProps {
  large: number;
  small: number;
}