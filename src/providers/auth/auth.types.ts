import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthUser = FirebaseAuthTypes.User | null;

export type AuthContextType = {
  user: AuthUser;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  onboardingComplete: boolean;
  signUpWithEmail: (email: string, password: string) => void;
  signInWithEmail: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signInWithApple: () => void;
  setOnboardingStatusComplete: () => void;
  checkOnboardingStatus: (user: AuthUser) => Promise<boolean>;
  resetPassword: (email: string) => boolean;
  logout: () => void;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}
