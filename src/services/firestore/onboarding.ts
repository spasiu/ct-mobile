import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const checkOnboardingStatusOnFirestore = async (
  user: FirebaseAuthTypes.User | null,
  onboardingComplete: boolean,
): Promise<boolean> => {
  try {
    if (!user) {
      return false;
    }

    if (onboardingComplete) {
      return true;
    }

    const userDocument = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();

    if (userDocument.exists) {
      const userData = userDocument.data() as { onboardingComplete: boolean };
      return Boolean(userData.onboardingComplete);
    }

    return false;
  } catch (e) {
    return false;
  }
};

export const setOnboardingCompleteOnFirestore = async (
  user: FirebaseAuthTypes.User | null,
): Promise<void> => {
  try {
    if (user) {
      await firestore().collection('Users').doc(user.uid).set(
        {
          onboardingComplete: true,
        },
        { merge: true },
      );
    }
  } catch (e) {
    console.log(e);
  }
};
