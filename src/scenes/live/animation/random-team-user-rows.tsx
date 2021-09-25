import React, { memo } from 'react';
// import { styles as s } from 'react-native-style-tachyons';
import { RandomTeamUserRowsProps } from '../live-screen.props';
import { RandomTeamUserRow } from './random-team-user-row';

export const TeamUserRows = ({
  userId,
  users
}: RandomTeamUserRowsProps): JSX.Element => {

  return (
    <>
      <RandomTeamUserRow users={users} currentUserId={userId}/>
    </>
  )
};

export const RandomTeamUserRows = memo(TeamUserRows, (prevProps, nextProps) => {
  return true;
})