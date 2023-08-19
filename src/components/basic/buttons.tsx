import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useAppThemeColors} from 'state/appState';
import {Consts, GS, normalizeSize, normalizeWidth} from 'utils/globalStyles';
import {AppColorType, TextVariant} from 'utils/types';
import {AppText} from './texts';
import {AnimatedIconProp, AnimatedVectorIcon} from './vectorIcon';

type AppButtonProps = {
  text?: string;
  bgColor?: AppColorType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: AnimatedIconProp;
  textColor?: AppColorType;
  textStyle?: StyleProp<TextStyle>;
  variant?: TextVariant;
  fullWidth?: boolean;
  noGB?: boolean;
};
export const AppButton = ({
  text,
  bgColor,
  noGB,
  onPress,
  disabled,
  loading,
  icon,
  style,
  textColor,
  variant,
  textStyle,
  fullWidth = false,
}: AppButtonProps) => {
  const isDisabled = loading || disabled;
  const appColors = useAppThemeColors();

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        GS.borderRadius50,
        GS.center,
        GS.paddingVertical12,
        {
          backgroundColor: bgColor
            ? appColors[bgColor]
            : appColors.SecondaryColor,
          width: normalizeWidth(148),
        },
        noGB && GS.bgTrans,
        GS.alignSelfCenter,
        fullWidth && GS.fullWidth,
        isDisabled && {backgroundColor: appColors.SecondaryText},
        style,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={appColors.MainText} size={'small'} />
      ) : (
        <View style={[GS.row, GS.center, GS.paddingHorizontal24]}>
          {!!icon && (
            <AnimatedVectorIcon
              size={icon.size || normalizeSize(20)}
              color={icon.color || 'MainText'}
              style={[GS.marginRight8]}
              name={icon.name}
              type={icon.type}
            />
          )}
          <AppText
            variant={variant || 'bodyBold16'}
            color={textColor || (noGB ? 'InvertText' : 'MainText')}
            style={[textStyle]}>
            {text}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

type IconButtonProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  icon: AnimatedIconProp;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  hasShadow?: boolean;
};

export const IconButton = ({
  onPress,
  icon,
  style,
  disabled,
  hasShadow,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[hasShadow && GS.baseShadow, style]}
      hitSlop={Consts.hitSlop10}
      onPress={onPress}>
      <AnimatedVectorIcon
        color={icon.color || 'InvertText'}
        size={icon?.size || normalizeSize(28)}
        name={icon.name}
        type={icon.type}
        style={[icon.style]}
      />
    </TouchableOpacity>
  );
};

type PlusButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const PlusButton = ({onPress, style}: PlusButtonProps) => {
  const appColors = useAppThemeColors();

  return (
    <IconButton
      icon={{
        name: 'plus',
        type: 'Feather',
        size: normalizeSize(32),
        color: 'MainText',
      }}
      onPress={onPress}
      style={[
        GS.center,
        {
          backgroundColor: appColors.PrimaryColor,
          shadowColor: appColors.InvertBG,
          width: Consts.plusButtonSize,
          height: Consts.plusButtonSize,
          borderRadius: Consts.plusButtonSize / 2,
        },
        GS.alignSelfCenter,
        GS.marginBottom16,
        GS.baseShadow,
        style,
      ]}
    />
  );
};
