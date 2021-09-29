import React, { memo, useState, useEffect } from 'react';
import { flatten, head, length, repeat } from 'ramda';
import Sound from 'react-native-sound';
// import { styles as s } from 'react-native-style-tachyons';
import { RandomTeamUserRowsProps } from '../live-screen.props';
import { RandomTeamUserRow } from './random-team-user-row';
import {
  getNextColumn,
  getNextRow,
  getUserRowsCount,
  getUsersPerRowCount,
} from '../live-screen.presets';
import { indexedMap } from '../../../utils/ramda';
import { BreakResultUser, BreakResultItem } from '../../../common/break/break';

function playSpin() {
  let entryMusic = new Sound('spin.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    entryMusic.play(success => {
      if (success) {
        // console.log('successfully finished playing');
      } else {
        // console.log('playback failed due to audio decoding errors');
      }
    });
  });
}

export const TeamUserRows = ({
  userId,
  users,
}: RandomTeamUserRowsProps): JSX.Element => {
  const [visibleRows, setVisibleRows] = useState(0);
  const [injectRowIndex, setInjectRowIndex] = useState(-1);

  const firstUser = head(users);
  const teamsPerUser = length(firstUser?.items || []);
  const teams = indexedMap(
    breakResultUser => (breakResultUser as BreakResultUser).items,
    users,
  );
  const allTeams = flatten(teams as BreakResultItem[]);

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
  const [currentAnimatingIndex, setCurrentAnimatingIndex] = useState({
    row: -1,
    col: -1,
    // number of teams visible in a row at given time
    // array of teamIndexes for each row
    visibleTeamsInRow: repeat(-1, totalRowsCount),
  });

  const startAnimation = () => {
    setTimeout(() => {
      // playSpin()
      setCurrentAnimatingIndex({
        row: 0,
        col: 0,
        visibleTeamsInRow: repeat(-1, totalRowsCount),
      });
    }, 2000);
  };

  // animate individual columns in a row
  useEffect(() => {
    if (currentAnimatingIndex.row < 0 && currentAnimatingIndex.col < 0) {
      return;
    }

    const isLastRow = currentAnimatingIndex.row === totalRowsCount - 1;
    const isLastColumn = currentAnimatingIndex.col === teamsPerUser - 1;

    if (currentAnimatingIndex.row === 0) {
      playSpin();
      setInjectRowIndex(currentAnimatingIndex.col);
    }

    const timer = setTimeout(
      () => {
        const nextObj = {
          row: getNextRow(currentAnimatingIndex.row, isLastRow, isLastColumn),
          col: getNextColumn(
            currentAnimatingIndex.col,
            isLastRow,
            isLastColumn,
          ),

          visibleTeamsInRow: [
            ...repeat(currentAnimatingIndex.col, currentAnimatingIndex.row + 1),
            ...repeat(
              currentAnimatingIndex.col - 1,
              totalRowsCount - currentAnimatingIndex.row - 1,
            ),
          ],
        };

        setCurrentAnimatingIndex(nextObj);
      },
      currentAnimatingIndex.row === 0 && currentAnimatingIndex.col >= 0
        ? 8000
        : 600, // undo this number
    );

    return () => clearTimeout(timer);
  }, [currentAnimatingIndex]);

  // render rows
  useEffect(() => {
    if (visibleRows >= totalRowsCount - 1) {
      if (visibleRows == totalRowsCount - 1) {
        startAnimation();
      }
      return;
    }

    const timer = setTimeout(
      () => {
        setVisibleRows(visibleRows + 1);
        // figure out a way to improve animation
        // when number of users per row > 3
      },
      usersPerRow >= 4 ? 600 : 300,
    );

    return () => clearTimeout(timer);
  }, [visibleRows, setVisibleRows]);

  return (
    <>
      {rows.map((r, index) => {
        console.log(
          index,
          'ininjectElementsAtColumnIndex',
          visibleRows,
          totalRowsCount,
        );
        return (
          <RandomTeamUserRow
            users={getUsersForRow(index)}
            currentUserId={userId}
            key={index.toString()}
            visibleTeamsInRow={currentAnimatingIndex.visibleTeamsInRow[index]}
            rowIndex={index}
            allTeams={allTeams}
            injectElementsAtColumnIndex={injectRowIndex}
          />
        );
      })}
    </>
  );
};

export const RandomTeamUserRows = memo(TeamUserRows, (prevProps, nextProps) => {
  return true;
});
