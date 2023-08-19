import React, {ReactNode, RefObject, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import {useAppIsDarkMode, useAppIsRtl, useAppThemeColors} from 'state/appState';
import {GS, normalizeHeight, normalizeWidth} from 'utils/globalStyles';
import {AppColorType, TextVariant} from 'utils/types';
import {AnimatedIconProp} from './vectorIcon';

export interface AppTextProps extends TextProps {
  children: ReactNode;
  isBold?: boolean;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
  color?: AppColorType;
  isDark?: boolean;
  selectable?: boolean;
}

export const AppText = ({
  children,
  isBold,
  variant = 'title20',
  style,
  color,
  isDark,
  selectable = false,
  ...props
}: AppTextProps) => {
  const appColors = useAppThemeColors();
  return (
    <Text
      style={[
        GS.textAlignCenter,
        GS.removeFontPadding,
        GS[variant],
        isBold && GS.bold,
        {
          color: color
            ? appColors[color]
            : isDark
            ? appColors.MainText
            : appColors.InvertText,
        },
        style,
      ]}
      selectable={selectable}
      {...props}>
      {children}
    </Text>
  );
};

interface AppInputProps extends TextInputProps {
  inputRef?: RefObject<TextInput>;
  value: string;
  style?: StyleProp<TextStyle>;
  errorMess?: string;
  variant?: TextVariant;
  withError?: boolean;
  containerStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  withBorder?: boolean;
  placeholderTextColor?: AppColorType;
  label?: string;
  icon?: AnimatedIconProp;
  prefixStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  nextInputRef?: RefObject<TextInput>;
  prefix?: string;
}

export const AppInput = ({
  inputRef,
  value,
  style,
  autoFocus,
  withBorder = true,
  errorMess = '',
  onEndEditing,
  onSubmitEditing,
  editable,
  containerStyle,
  placeholder = '',
  multiline = false,
  nextInputRef,
  variant = 'bodyRegular16',
  placeholderTextColor = 'SecondaryText',
  prefixStyle,
  prefix,
  ...props
}: AppInputProps) => {
  const isRtl = useAppIsRtl();
  const isDark = useAppIsDarkMode();
  const appColors = useAppThemeColors();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const onFocusInput = () => {
    setIsInputFocused(true);
  };

  const onBlurInput = () => {
    setIsInputFocused(false);
  };

  const onSubmit = (e: any) => {
    onSubmitEditing && onSubmitEditing(e);
    nextInputRef?.current?.focus();
  };

  return (
    <>
      <View
        onTouchStart={e => {
          e.stopPropagation();
        }}
        onStartShouldSetResponder={(_event: any) => true}
        style={[
          GS.fullWidth,
          GS.center,
          GS.row,
          styles.input,
          withBorder && styles.border,
          withBorder && {
            borderColor: isInputFocused
              ? appColors.PrimaryColor
              : appColors.Border,
          },
          containerStyle,
        ]}>
        {/* {!!label && (
        <AppText color="MainText" variant="bodyBold16" style={[style]}>
          {label}
        </AppText>
      )} */}
        {!!prefix && (
          <AppText
            color="PrimaryColor"
            variant="bodySemibold18"
            style={[GS.paddingLeft12, prefixStyle]}>
            {prefix}
          </AppText>
        )}
        <TextInput
          style={[
            GS.fullWidth,
            GS.removeFontPadding,
            !!prefix && GS.paddingLeft8,
            GS[variant],
            isRtl ? GS.textAlignRight : GS.textAlignLeft,
            {color: appColors.InvertText},
            style,
          ]}
          keyboardAppearance={isDark ? 'dark' : 'light'}
          scrollEnabled={false}
          placeholderTextColor={appColors[placeholderTextColor]}
          multiline={multiline}
          autoFocus={autoFocus}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          ref={inputRef}
          value={value}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmit}
          placeholder={placeholder}
          editable={editable}
          {...props}
        />
      </View>
      <AppText
        variant="bodyRegular16"
        color="Error"
        style={[GS.marginLeft8, GS.marginTop8, styles.errMsg]}>
        {errorMess || ''}
      </AppText>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    width: '80%',
  },
  input: {
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
  },
  border: {
    borderWidth: 1,
    borderRadius: 12,
  },
  errMsg: {
    textAlign: 'left',
  },
});
