import React from 'react';
import {IHeadingProps, ITextProps, Text} from 'native-base';

export const NBText = (props: ITextProps) => {
  return <Text {...props}>{props.children}</Text>;
};

export const NBHeading = (props: IHeadingProps) => {
  return <Text {...props}>{props.children}</Text>;
};
