import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { Image, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { IconButton } from '../../../components';
import { FloatingDiamonds } from '../animation/floating-diamonds';
import { diamondIcon } from '../live-screen.presets';

class Queue {
  bucket = 0;
  blocked = false;
  callback: (n: number) => void;
  timer?: NodeJS.Timeout;

  constructor(callback: (n: number) => void) {
    this.callback = callback;
  }

  batch() {
    if (this.bucket < 1 || this.blocked) {
      return;
    }
    const n = this.bucket;
    this.bucket = 0;
    this.blocked = true;
    this.callback(n);
    this.timer = setTimeout(() => {
      this.blocked = false;
      this.batch();
    }, n * 300 /*ms*/); // delay before playing next animation
  }

  push(n: number) {
    this.bucket += n;
    this.batch();
  }

  cancel() {
    this.bucket = 0;
    this.blocked = false;
    this.timer && clearTimeout(this.timer);
  }
}

export const Diamond = ({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}): JSX.Element => {
  // console.log({ eventId, userId });
  const timer = useRef<any>(undefined);
  const [diamonds, setDiamonds] = useState(0);
  const send = (count: number) => firestore()
    .collection('LiveChat')
    .doc(eventId)
    .collection('Diamonds')
    .add({ count, userId });

  const queue = new Queue(n => {
    setDiamonds(n);
    send(n);
  });

  const hold = () => {
    queue.push(1);
    timer.current = setInterval(() => queue.push(1), 200 /*ms*/); // interval delay
  };

  const release = () => {
    clearInterval(timer.current);
    queue.cancel();
  };

  useEffect(() => {
    let shouldShowDiamonds = false;

    const unsubscribe = firestore()
      .collection('LiveChat')
      .doc(eventId)
      .collection('Diamonds')
      .onSnapshot(snapshot => {
        const count = snapshot
          .docChanges()
          .filter(change => change.type === 'added')
          .filter(change => change.doc.data().userId !== userId)
          .map(change => change.doc.data().count || 1)
          .reduce((x, y) => x + y, 0);
        if (shouldShowDiamonds && count > 0) queue.push(count);
        shouldShowDiamonds = true; // ignore first snapshot event which contains all previous events
      });

    return () => {
      release();
      unsubscribe();
    };
  }, [eventId, userId]);

  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderStart={hold}
      onResponderRelease={release}>
      <View style={[s.absolute, { bottom: 0 }]}>
        <FloatingDiamonds large={diamonds} small={diamonds} />
      </View>
      <IconButton>
        <Image source={diamondIcon} />
      </IconButton>
    </View>
  );
};
