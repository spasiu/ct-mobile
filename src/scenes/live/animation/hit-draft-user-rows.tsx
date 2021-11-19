import React, { memo, useState, useEffect } from 'react';
import { repeat } from 'ramda';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { HitDraftUserRowsProps } from '../live-screen.props';
import { HitDraftUserRow } from './hit-draft-user-row';
import { playSound } from '../../../utils/sound';

export const UserRows = ({
  userId,
  users,
  onEnd,
}: HitDraftUserRowsProps): JSX.Element => {
  const [visibleRows, setVisibleRows] = useState(0);

  const totalRowsCount = Math.ceil(users.length / 2)
  const getUsersForRow = (rowIndex: number) => {
    const usersPerRow = 2
    const from = usersPerRow * rowIndex;
    const to =
      rowIndex === totalRowsCount - 1
        ? users.length
        : (rowIndex + 1) * usersPerRow;
    return users.slice(from, to);
  };
  // render rows
  useEffect(() => {
    playSound('pop');

    if (visibleRows >= totalRowsCount - 1) {
      if (visibleRows == totalRowsCount - 1) {
        setTimeout(() => {
          onEnd && onEnd();
        }, 2000);
      }
      return;
    }

    const timer = setTimeout(() => {
      setVisibleRows(visibleRows + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [visibleRows, setVisibleRows]);

  const rows = repeat('r', visibleRows + 1);
  return (
    <>
      <View style={[s.mt5]}>
        {rows.map((_, index) => {
          return (
            <HitDraftUserRow
              users={getUsersForRow(index)}
              rowIndex={index}
              currentUserId={userId}
            />
          );
        })}
      </View>
    </>
  );
};

export const HitDraftUserRows = memo(UserRows, () => {
  return true;
});
