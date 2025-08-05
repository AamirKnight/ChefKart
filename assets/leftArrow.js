// components/LeftArrowIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftArrowIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M9.34299 4.93074L4 9.96535L9.34299 15"
      stroke="#1C1C1C"
      strokeWidth="2"
    />
  </Svg>
);

export default LeftArrowIcon;
