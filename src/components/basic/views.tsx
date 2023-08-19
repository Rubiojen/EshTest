import React, {FC, ReactNode} from 'react';
import {Keyboard, StyleProp, View, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {useAppThemeColors, useSetSheet} from 'state/appState';
import {GS} from 'utils/globalStyles';

export interface ChildrenView {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  dismissKeyboardOnTouch?: boolean;
  closeSheetOnPress?: boolean;
}

export const ScreenView: FC<ChildrenView> = ({
  children,
  style,
  edges,
  dismissKeyboardOnTouch,
  closeSheetOnPress = true,
}) => {
  const {closeSheet} = useSetSheet();
  const appColors = useAppThemeColors();

  const onTouch = () => {
    dismissKeyboardOnTouch && Keyboard.dismiss();
    closeSheetOnPress && closeSheet();
  };

  return (
    <SafeAreaView
      edges={edges}
      style={[
        GS.flexOne,
        GS.justifyStart,
        {backgroundColor: appColors.PrimaryBG},
        style,
      ]}>
      <View
        onTouchStart={onTouch}
        style={[
          GS.flexOne,
          GS.fullWidth,
          {backgroundColor: appColors.PrimaryBG},
        ]}>
        {children ? children : null}
      </View>
    </SafeAreaView>
  );
};
