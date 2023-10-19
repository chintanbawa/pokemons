import React, {ReactNode} from 'react';
import {StyleSheet, Text as RNText, TextStyle} from 'react-native';

//colors
import Colors from 'constants/colors';
//styles
const styles = StyleSheet.create({
  defaultText: {
    color: Colors.primary,
    fontSize: 18,
  },
});

export const Text = ({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: TextStyle;
}) => {
  const textStyles: TextStyle[] = [styles.defaultText];
  textStyles.push(style);
  return <RNText style={textStyles}>{children}</RNText>;
};
