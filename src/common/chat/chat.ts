import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type ChatUser = {
  id: string;
  username: string;
  image: string;
};

export type ChatMessage = {
  id?: string;
  createdOn: FirebaseFirestoreTypes.FieldValue;
  text: string;
  user: ChatUser;
};
