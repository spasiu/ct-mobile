import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Badge } from '../badge';
import { styles as s } from 'react-native-style-tachyons';

const eyeIcon = require('../../assets/eye-icon.png');
export let TIMEOUT = 30000; //ms
export let INTERVAL = 10000; //ms

export const configure = ({
  timeoutMs,
  intervalMs,
}: {
  timeoutMs: number;
  intervalMs: number;
}): void => {
  TIMEOUT = timeoutMs;
  INTERVAL = intervalMs;
};

export const getCount = async function getCount(eventId: string) {
  const timestamp = Date.now();
  const snapshot = await firestore()
    .collection('LiveChat')
    .doc(eventId)
    .collection('Viewers')
    .get();

  return snapshot.docs
    .map(doc => doc.data().timestamp)
    .filter(ts => ts + TIMEOUT > timestamp).length;
};

export const poll = function poll(
  eventId: string,
  userId: string | undefined,
  cb: (count: number) => void,
): () => void {
  if (userId) {
    firestore()
      .collection('LiveChat')
      .doc(eventId)
      .collection('Viewers')
      .doc(userId)
      .set({ timestamp: Date.now() });
  }

  getCount(eventId).then(cb);

  const intervalId = setInterval(async () => {
    const timestamp = Date.now();
    if (userId) {
      firestore()
        .collection('LiveChat')
        .doc(eventId)
        .collection('Viewers')
        .doc(userId)
        .update({ timestamp });
    }

    const count = await getCount(eventId);
    cb(count);
  }, INTERVAL);

  return () => {
    clearTimeout(intervalId);
    if (userId) {
      firestore()
        .collection('LiveChat')
        .doc(eventId)
        .collection('Viewers')
        .doc(userId)
        .delete();
    }
  };
};

export const LiveCountBadge = ({
  eventId,
  userId,
}: {
  eventId?: string;
  userId?: string;
}): JSX.Element => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (eventId) {
      return poll(eventId, userId, setCount);
    }

    return;
  }, [eventId, userId]);
  return (
    <Badge containerStyle={[s.o_70]} image={eyeIcon} text={count.toString()} />
  );
};
