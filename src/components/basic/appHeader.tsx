import {IconButton} from 'components/basic/buttons';
import {useAppNavigation} from 'hooks/common.hooks';
import React from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import {useAppThemeColors} from 'state/appState';
import {GS, normalizeSize} from 'utils/globalStyles';
import {AppColorType, TextVariant} from 'utils/types';
import {AppText} from './texts';
import {AnimatedIconProp} from './vectorIcon';

type AppHeaderProps = {
  hasBack?: boolean;
  rightIcon?: AnimatedIconProp;
  leftIcon?: AnimatedIconProp;
  addPadding?: boolean;
  onPressRightIcon?: () => void;
  onPressLeftIcon?: () => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleVariant?: TextVariant;
  titleColor?: AppColorType;
  titleLeft?: boolean;
};

export const AppHeader = ({
  hasBack = true,
  rightIcon = {
    type: 'Feather',
    name: 'chevron-left',
    size: normalizeSize(24),
    style: [GS.opacityZero],
  },
  leftIcon = {
    type: 'Feather',
    name: 'chevron-left',
    style: [GS.opacityZero],
  },
  titleVariant = 'title24',
  titleStyle,
  titleLeft,
  titleColor,
  onPressRightIcon,
  onPressLeftIcon,
  title = '',
}: AppHeaderProps) => {
  const {goBack} = useAppNavigation();
  const appColors = useAppThemeColors();

  return (
    <View
      style={[
        GS.row,
        GS.center,
        GS.paddingVertical8,
        GS.paddingHorizontal8,
        {borderColor: appColors.Border},
      ]}>
      <IconButton
        style={[GS.alignEnd]}
        icon={
          hasBack
            ? {
                type: 'Feather',
                name: 'chevron-left',
              }
            : leftIcon
        }
        onPress={onPressLeftIcon || (hasBack ? goBack : undefined)}
      />
      <AppText
        style={[
          GS.flexOne,
          GS.center,
          titleLeft && GS.marginLeft8,
          titleLeft && GS.textAlignLeft,
          titleStyle,
        ]}
        color={titleColor}
        variant={titleVariant}>
        {title}
      </AppText>
      <IconButton
        style={[GS.alignStart, GS.paddingRight8]}
        icon={rightIcon}
        onPress={onPressRightIcon}
      />
    </View>
  );
};
