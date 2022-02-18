import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ImagePickerResponse } from 'react-native-image-picker';

export type AuthUser = FirebaseAuthTypes.User | null;

export type AuthContextType = {
  user: AuthUser;
  onboardingComplete: boolean;
  getValidAuthToken: (user:AuthUser) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithApple: () => Promise<boolean>;
  setOnboardingStatusComplete: () => Promise<void>;
  checkOnboardingStatus: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  uploadPhoto: (photo: ImagePickerResponse) => Promise<string>;
};

export interface AuthProviderProps {
  children: React.ReactNode;
  user: AuthUser;
  onboardingComplete: boolean;
  setOnboardingComplete: (status: boolean) => void;
}
