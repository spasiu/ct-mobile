import React from 'react';
import Svg, {
  Text,
  Defs,
  LinearGradient,
  Rect,
  Stop,
  TSpan,
} from 'react-native-svg';

import { BreakTeamProps } from './break-team.props';

export const BreakTeam = ({
  shorthand,
  primaryColor,
  secondaryColor,
  boxSize
}: BreakTeamProps): JSX.Element => {
  const smallBarHeight = boxSize / 7.8
  const largeBarHeight = boxSize / 2.2

  return (
    <>
      <Svg height={boxSize} width={boxSize}>
        <Rect
          fill={secondaryColor}
          x="0"
          y="1"
          width={boxSize - 3}
          height={smallBarHeight}
          rx="3"
          ry="3"
        />
        <Rect
          fill="#fff"
          x="0"
          y={boxSize / 2 - (largeBarHeight / 2)}
          width={boxSize - 3}
          height={boxSize / 2.2}
          rx="3"
          ry="3"
        />
        <Text
          strokeWidth="2"
          fill={primaryColor}
          textAnchor="middle"
          letterSpacing="0"
          // fontStyle="italic"
          fontSize={boxSize / 3.2}
          fontWeight="bold"
          x={boxSize / 2 - 2}
          y={boxSize / 2 - (largeBarHeight / 2) + boxSize / 3.0}>
          <TSpan textAnchor="middle">{[shorthand]}</TSpan>
        </Text>
        <Rect
          fill={primaryColor}
          x="0"
          y={boxSize - smallBarHeight - 1}
          width={boxSize - 3}
          height={smallBarHeight}
          rx="3"
          ry="3"
        />
      </Svg>
    </>
  );
};
