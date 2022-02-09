import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Badge } from '../badge';
import { styles as s} from 'react-native-style-tachyons';

const eyeIcon = require('../../assets/eye-icon.png');

export const LiveCountBadge = ({ eventId, showPresence }: { eventId: string, showPresence?: boolean }): JSX.Element => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (showPresence) firestore()
      .collection('LiveChat')
      .doc(eventId)
      .set({ viewers: firestore.FieldValue.increment(1) }, { merge: true });

    if (showPresence) return () => {
      firestore()
        .collection('LiveChat')
        .doc(eventId)
        .set({ viewers: firestore.FieldValue.increment(-1) }, { merge: true });
    }
  }, [eventId, showPresence]);

  useEffect(() => {
    firestore()
      .collection('LiveChat')
      .doc(eventId)
      .get()
      .then(doc => {
        const n = doc?.data()?.viewers;
        if (n !== undefined) setCount(n);
      });
  }, [eventId]);

  useEffect(() => firestore()
      .collection('LiveChat')
      .doc(eventId)
      .onSnapshot(doc => {
        const n = doc?.data()?.viewers;
        if (n !== undefined) setCount(n);
      }), [eventId]);

  return <Badge containerStyle={[s.o_70]} image={eyeIcon} text={count.toString()} />;
}
