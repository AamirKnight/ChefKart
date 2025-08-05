



import React from 'react';
import Svg, { Rect, Defs, Pattern, Image } from 'react-native-svg';

const CustomSVG = () => (
  <Svg width={165} height={198} viewBox="0 0 165 198" fill="none">
    <Defs>
      <Pattern
        id="pattern0_1_2972"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Image
          href={require('./ingre.png')} // Replace with your actual image
          width={596.537}
          height={716.194}
          transform="matrix(0.00167598 0 0 0.00139665 -0.0027933 0)"
        />
      </Pattern>
    </Defs>
    <Rect width={165} height={198} fill="url(#pattern0_1_2972)" />
  </Svg>
);

export default CustomSVG;
