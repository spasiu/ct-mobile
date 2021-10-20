export type UserContextType = {
  liveTermsAccepted: boolean;
  setLiveTermsAccepted: (liveTermsAccepted: boolean) => void;
  breakersFollowed: string[];
  handleModifyBreakersFollowed: (breakerId: string) => void;
  userFollowsBreaker: (breakerId: string) => boolean;
};

export interface UserProviderProps {
  children: React.ReactNode;
}
