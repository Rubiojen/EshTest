import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import Animated, {AnimatedStyle} from 'react-native-reanimated';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useAppThemeColors} from 'state/appState';
import {AppColorType, ICON_TYPES} from 'utils/types';

const AnimatedFeatherIcon = Animated.createAnimatedComponent(FeatherIcons);

const IoniconsIcon = Animated.createAnimatedComponent(Ionicons);
const MaterialCommunityIcons =
  Animated.createAnimatedComponent(MaterialCommunity);
const MaterialIcons = Animated.createAnimatedComponent(Material);

export interface AnimatedIconProp extends TextStyle {
  size?: number;
  name: string;
  color?: AppColorType;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  type: ICON_TYPES;
}

export const AnimatedVectorIcon = ({
  color = 'InvertText',
  style,
  ...props
}: AnimatedIconProp) => {
  const appColors = useAppThemeColors();

  switch (props.type) {
    case 'Feather': {
      return (
        <AnimatedFeatherIcon
          {...props}
          style={style}
          color={appColors[color]}
        />
      );
    }
    case 'Ionicons': {
      return <IoniconsIcon {...props} style={style} color={appColors[color]} />;
    }
    case 'MaterialCommunityIcons': {
      return (
        <MaterialCommunityIcons
          {...props}
          style={style}
          color={appColors[color]}
        />
      );
    }
    case 'MaterialIcons': {
      return (
        <MaterialIcons {...props} style={style} color={appColors[color]} />
      );
    }
    default: {
      return <View />;
    }
  }
};
