import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const hasHasuraClaim = (
  idToken: FirebaseAuthTypes.IdTokenResult,
): boolean => Boolean(idToken.claims['https://hasura.io/jwt/claims']);
