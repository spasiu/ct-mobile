import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ImagePickerResponse } from 'react-native-image-picker';

export type AuthUser = FirebaseAuthTypes.User | null;

export type AuthContextType = {
  user: AuthUser;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  onboardingComplete: boolean;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  setOnboardingStatusComplete: () => Promise<void>;
  checkOnboardingStatus: (user: AuthUser) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  uploadPhoto: (photo: ImagePickerResponse) => Promise<string>;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}
