/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlusButton} from 'components/basic/buttons';
import {AnimatedVectorIcon} from 'components/basic/vectorIcon';
import {HomeScreen} from 'components/screens/home/home.screen';
import {ProfileScreen} from 'components/screens/profile/profile.screen';
import React from 'react';
import {View} from 'react-native';
import {useAppIsRtl, useAppThemeColors, useSetSheet} from 'state/appState';
import {SCREEN, Stacks} from 'utils/enums';
import {Consts, GS, normalizeHeight, normalizeSize} from 'utils/globalStyles';
import {Strings} from 'utils/strings';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  const appIsRtl = useAppIsRtl();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: appIsRtl ? 'slide_from_left' : 'slide_from_right',
      }}>
      <Stack.Screen name={SCREEN.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name={SCREEN.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  const appColors = useAppThemeColors();
  const {openSheet} = useSetSheet();

  const createExpense = () => {
    openSheet({type: 'CraeteExpense'});
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          GS.center,
          GS.absolute,
          Consts.isAndroid && {height: normalizeHeight(64)},
          {
            backgroundColor: appColors.PrimaryBG,
            borderTopWidth: 1,
            borderTopColor: appColors.Border,
          },
        ],
      }}>
      <Tab.Screen
        name={Stacks.Home}
        component={HomeStack}
        options={{
          tabBarLabel: Strings.home,
          tabBarLabelStyle: [GS.bodyBold12, GS.paddingVerticalZero],
          tabBarActiveTintColor: appColors.PrimaryColor,
          tabBarInactiveTintColor: appColors.InvertSecondBG,
          tabBarIconStyle: [{width: normalizeSize(26)}],
          tabBarIcon: ({focused}) => (
            <AnimatedVectorIcon
              type={'Ionicons'}
              name={'home'}
              color={focused ? 'PrimaryColor' : 'InvertSecondBG'}
              size={normalizeSize(26)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CustomButtonTab"
        component={View} // This can be an empty view since we're using it as a button
        options={{
          tabBarLabel: () => null, // Hide the label
          tabBarIcon: () => (
            <PlusButton
              style={[GS.absolute, {top: -Consts.plusButtonSize / 2}]}
              onPress={createExpense}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Stacks.Profile}
        component={ProfileStack}
        options={{
          tabBarLabel: Strings.profile,
          tabBarLabelStyle: [GS.bodyBold12, GS.paddingVerticalZero],
          tabBarActiveTintColor: appColors.PrimaryColor,
          tabBarInactiveTintColor: appColors.InvertSecondBG,
          tabBarIconStyle: [{width: normalizeSize(26)}],
          tabBarIcon: ({focused}) => (
            <AnimatedVectorIcon
              type={'MaterialIcons'}
              name={'account-circle'}
              color={focused ? 'PrimaryColor' : 'InvertSecondBG'}
              size={normalizeSize(26)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
