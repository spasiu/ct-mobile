import React, { memo, useState, useEffect } from 'react';
import { head, length, repeat } from 'ramda';
// import { styles as s } from 'react-native-style-tachyons';
import { RandomTeamUserRowsProps } from '../live-screen.props';
import { RandomTeamUserRow } from './random-team-user-row';

const getUserRowsCount = (usersCount: number, teamsPerUser: number) => {
  if (usersCount <= 10) {
    return Math.ceil(usersCount / (6 / teamsPerUser));
  }
  if (usersCount >= 18 && usersCount <= 25 && teamsPerUser === 1) {
    return Math.ceil(usersCount / 5);
  }

  return Math.ceil(usersCount / 6);
};

const getUsersPerRowCount = (usersCount: number, teamsPerUser: number) => {
  if (usersCount >= 18 && usersCount <= 25 && teamsPerUser === 1) {
    return 5;
  }

  return 6 / teamsPerUser;
};

export const TeamUserRows = ({
  userId,
  users,
}: RandomTeamUserRowsProps): JSX.Element => {
  const [visibleRows, setVisibleRows] = useState(0);
  const firstUser = head(users);
  const teamsPerUser = length(firstUser?.items || []);

  // number of users that can fit in single row
  const usersPerRow = getUsersPerRowCount(users.length, teamsPerUser);

  // Total number of rows containing users
  const totalRowsCount = getUserRowsCount(users.length, teamsPerUser);

  const getUsersForRow = (rowIndex: number) => {
    const from = usersPerRow * rowIndex;
    const to =
      rowIndex === totalRowsCount - 1
        ? users.length
        : (rowIndex + 1) * usersPerRow;
    return users.slice(from, to);
  };

  const rows = repeat('r', visibleRows + 1);

  useEffect(() => {
    if (visibleRows >= totalRowsCount - 1) return;

    const timer = setTimeout(
      () => {
        setVisibleRows(visibleRows + 1);
        // figure out a way to improve animation
        // when number of users are high
      },
      usersPerRow >= 4 ? 600 : 300,
    );

    return () => clearTimeout(timer);
  }, [visibleRows, setVisibleRows]);

  return (
    <>
      {rows.map((r, index) => {
        return (
          <RandomTeamUserRow
            users={getUsersForRow(index)}
            currentUserId={userId}
            key={index.toString()}
          />
        );
      })}
    </>
  );
};

export const RandomTeamUserRows = memo(TeamUserRows, (prevProps, nextProps) => {
  return true;
});
