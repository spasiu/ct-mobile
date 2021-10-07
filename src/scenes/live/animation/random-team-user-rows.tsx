import React, { memo, useState, useEffect } from 'react';
import { flatten, head, length, repeat } from 'ramda';
import Sound from 'react-native-sound';
import { View, Image } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { RandomTeamUserRowsProps } from '../live-screen.props';
import { RandomTeamUserRow } from './random-team-user-row';
import {
  getNextColumn,
  getNextRow,
  getUserRowsCount,
  getUsersPerRowCount,
} from '../live-screen.presets';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { indexedMap } from '../../../utils/ramda';
import { BreakResultUser, BreakResultItem } from '../../../common/break/break';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../../theme/sizes';
import { playSound } from '../../../utils/sound';

export const TeamUserRows = ({
  userId,
  users,
  onEnd
}: RandomTeamUserRowsProps): JSX.Element => {
  const [visibleRows, setVisibleRows] = useState(0);
  const [injectRowIndex, setInjectRowIndex] = useState(-1);
  const [ended, setEnded] = useState(false);

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

  const imageAnim = useSharedValue(0);
  const imageWidth = WINDOW_WIDTH * 0.65;
  const imageHeight = imageWidth * 0.53;
  const imageX = WINDOW_WIDTH * 0.5 - imageWidth / 2;
  const imageY = 2 * imageHeight;

  const startAnimation = () => {
    setTimeout(() => {
      setCurrentAnimatingIndex({
        row: 0,
        col: 0,
        visibleTeamsInRow: repeat(-1, totalRowsCount),
      });
      imageAnim.value = withDelay(500, withTiming(
        0,
        { duration: 500, easing: Easing.ease }
      ));
    }, 2000);
  };

  // animate individual columns in a row
  useEffect(() => {
    if (ended) return;

    if (currentAnimatingIndex.row < 0 && currentAnimatingIndex.col < 0) {
      return;
    }

    const isLastRow = currentAnimatingIndex.row === totalRowsCount - 1;
    const isLastColumn = currentAnimatingIndex.col === teamsPerUser - 1;

    // Start playing the sound and prepare the teams
    // for each column which is going to be animated next.
    if (currentAnimatingIndex.row === 0) {
      playSound('spin');
      setInjectRowIndex(currentAnimatingIndex.col);
    }

    if (isLastColumn && isLastRow) {
      setTimeout(() => {
        setEnded(true);
        onEnd()
        playSound('players');
      }, 2000)
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
        ? 8000 // ~ time it takes to play spinning sound
        : 600, // undo this number
    );

    return () => clearTimeout(timer);
  }, [currentAnimatingIndex]);

  // render rows
  useEffect(() => {
    if (ended) return;
    playSound('pop');

    if (visibleRows === Math.ceil(totalRowsCount / 2)) {
      playSound('entry');
      imageAnim.value = withTiming(
        1,
        { duration: 350, easing: Easing.ease }
      );
    }

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
      300,
    );

    return () => clearTimeout(timer);
  }, [visibleRows, setVisibleRows]);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // image in
          scale: interpolate(
            imageAnim.value,
            [0, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            [0, 1.2, 1.1, 1, 1.1, 1.2, 1.1, 1.1],
          ),
        }
      ],
    };
  }, []);

  return (
    <>
      <View style={[s.mt5]}>
        {rows.map((r, index) => {
          return (
            <RandomTeamUserRow
              users={getUsersForRow(index)}
              currentUserId={userId}
              key={index.toString()}
              visibleTeamsInRow={currentAnimatingIndex.visibleTeamsInRow[index]}
              rowIndex={index}
              allTeams={allTeams}
              injectElementsAtColumnIndex={injectRowIndex}
              usersPerRow={usersPerRow}
            />
          );
        })}
      </View>
      <Animated.View
        style={[
          {
            top: imageY,
            left: imageX,
            position: 'absolute',
            width: imageWidth,
            height: imageHeight,
            zIndex: 2,
          },
          imageStyle,
        ]}>
        <Image
          source={require('../../../assets/lets-go.png')}
          style={{ width: imageWidth, height: imageHeight, zIndex: 2 }}
        />
      </Animated.View>
    </>
  );
};

export const RandomTeamUserRows = memo(TeamUserRows, (prevProps, nextProps) => {
  return true;
});
