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
  return (
    <>
      <Svg height={boxSize} width={boxSize}>
        <Defs>
          <LinearGradient
            id="defaultUnits"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor={secondaryColor} stopOpacity="1" />
            <Stop
              offset="100%"
              stopColor={secondaryColor}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Defs>
          <LinearGradient
            id="defaultUnitsDark"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
            <Stop
              offset="100%"
              stopColor={primaryColor}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Rect
          fill="url(#defaultUnits)"
          x="0"
          y="0"
          width={boxSize - 3}
          height={6}
          rx="3"
          ry="3"
        />
        <Defs>
          <LinearGradient
            id="text-stroke-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%">
            <Stop
              offset="0%"
              stopColor={secondaryColor}
              stopOpacity="1"
            />
            <Stop offset="100%" stopColor={secondaryColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect
          fill="#fff"
          x="0"
          y={10}
          width={boxSize - 3}
          height={22}
          rx="3"
          ry="3"
        />
        <Text
          stroke="url(#text-stroke-grad)"
          strokeWidth="2"
          fill={primaryColor}
          fontSize="16"
          fontWeight="bold"
          x={boxSize / 2 - 2}
          y={boxSize / 2 + 6}>
          <TSpan textAnchor="middle">{[shorthand]}</TSpan>
        </Text>
        <Rect
          fill="url(#defaultUnitsDark)"
          x="0"
          y={boxSize - 6}
          width={boxSize - 3}
          height={6}
          rx="3"
          ry="3"
        />
      </Svg>
    </>
  );
};
