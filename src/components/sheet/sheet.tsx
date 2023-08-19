import {useIsKeyboardShown} from 'hooks/common.hooks';
import React, {ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppThemeColors, useSetSheet, useSheet} from 'state/appState';
import {Consts, GS, normalizeHeight} from 'utils/globalStyles';
import {SheetType} from 'utils/types';
import {CreateExpenseSheet} from './createExpenseSheet';
import {EditExpenseSheet} from './editExpenseSheet';
import {FilterExpenseSheet} from './filterExpensesSheet';

const dismissThreshold = 60;

const disableCloseOutsideTypes: SheetType[] = [];

export const Sheet = () => {
  const touchMove = useRef({x: 0, y: 0});
  const sheet = useSheet();
  const {closeSheet} = useSetSheet();

  return (
    <Animated.View
      onTouchEnd={e => {
        Math.max(
          Math.abs(touchMove.current.x - e.nativeEvent.locationX),
          Math.abs(touchMove.current.y - e.nativeEvent.locationY),
        ) < dismissThreshold &&
          !disableCloseOutsideTypes.includes(sheet.type!) &&
          sheet.canCloseOutside &&
          closeSheet();
      }}
      onStartShouldSetResponder={_event => true}
      onTouchStart={e => {
        touchMove.current = {
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
        };
        e.stopPropagation();
      }}
      style={[
        GS.absolute,
        GS.alignSelfCenter,
        GS.justifyEnd,
        GS.bgBlack,
        styles.actionSheet,
        sheet.darkenBackground ? GS.modalBg : GS.bgTrans,
        !sheet.finishCloseAnimation ? GS.displayFlex : GS.displayNone,
      ]}>
      {!sheet.finishCloseAnimation && <Sheets />}
    </Animated.View>
  );
};

export interface SheetContentWrapProps {
  children: ReactNode;
  header?: string;
  style?: StyleProp<ViewStyle>;
}

export const SheetContentWrap = ({children, style}: SheetContentWrapProps) => {
  const [height, setHeight] = useState(0);
  const appColors = useAppThemeColors();
  const marginBottom = useSharedValue(-1000);
  const {isOpen} = useSheet();
  const isKeyboardOpen = useIsKeyboardShown();
  const {hideSheet} = useSetSheet();
  const {bottom} = useSafeAreaInsets();

  const onLayoutEvent = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    !height && setHeight(layout.height);
  };

  useEffect(() => {
    if (height) {
      marginBottom.value = -height;
      marginBottom.value = withTiming(0, {duration: 300});
    }
  }, [height, hideSheet, marginBottom]);

  useEffect(() => {
    if (!isOpen) {
      marginBottom.value = withTiming(-height, {duration: 300}, () =>
        runOnJS(hideSheet)(),
      );
    }
  }, [height, hideSheet, isOpen, marginBottom]);

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: marginBottom.value,
  }));

  return (
    <Animated.View
      onStartShouldSetResponder={_event => true}
      onTouchEnd={e => {
        e.stopPropagation();
      }}
      onLayout={onLayoutEvent}
      style={[
        GS.center,
        GS.fullWidth,
        GS.alignSelfCenter,
        GS.screenWidth,
        GS.paddingHorizontal16,
        styles.sheetContentWrap,
        animatedStyle,
        {
          backgroundColor: appColors.SecondaryBG,
          paddingTop: normalizeHeight(16),
          paddingBottom: isKeyboardOpen ? normalizeHeight(16) : bottom,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

const Sheets = () => {
  const {type} = useSheet();

  const sheet = useMemo(() => {
    switch (type) {
      case 'CraeteExpense': {
        return <CreateExpenseSheet />;
      }
      case 'EditExpense': {
        return <EditExpenseSheet />;
      }
      case 'FilterExpenses': {
        return <FilterExpenseSheet />;
      }
      default:
        return null;
    }
  }, [type]);

  return sheet;
};

const styles = StyleSheet.create({
  actionSheet: {
    width: Consts.windowHeight,
    height: Consts.windowHeight,
    bottom: 0,
  },
  sheetContentWrap: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
