import React from 'react';
import {Box} from 'native-base';

//types
import {IShadowBox} from 'types';

const ShadowBox = ({
  children,
  shadow = 3,
  bgColor = 'white',
  gap = 3,
  borderRadius = 10,
}: IShadowBox) => {
  return (
    <Box
      _ios={{shadow, style: {backgroundColor: bgColor}}}
      _android={{
        style: {
          elevation: shadow,
          backgroundColor: bgColor,
        },
      }}
      borderRadius={borderRadius}
      m={gap}>
      {children}
    </Box>
  );
};

export default ShadowBox;
