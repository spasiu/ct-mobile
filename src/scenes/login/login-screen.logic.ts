import {
  useContext,
  useState,
  useRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';
import { TextInput } from 'react-native';

import { AuthContext, AuthContextType } from '../../providers/auth';

export const useLoginScreenHook = (): {
  signInWithGoogle: () => Promise<boolean>;
  signInWithApple: () => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  activeField: string;
  setActiveField: Dispatch<SetStateAction<string>>;
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  password: RefObject<TextInput>;
} => {
  const { signInWithGoogle, signInWithApple, signInWithEmail } = useContext(
    AuthContext,
  ) as AuthContextType;
  const [activeField, setActiveField] = useState('');
  const [processing, setProcessing] = useState(false);
  const password = useRef<TextInput>(null);
  return {
    signInWithGoogle,
    signInWithApple,
    signInWithEmail,
    password,
    activeField,
    setActiveField,
    processing,
    setProcessing,
  };
};
