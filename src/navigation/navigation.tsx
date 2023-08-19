import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from 'components/screens/splash/splash.screen';
import {WelcomeScreen} from 'components/screens/welcome/welcome.screen';
import React, {useRef} from 'react';
import {StatusBar} from 'react-native';
import {
  useAppIsDarkMode,
  useAppIsRtl,
  useAppShowSplashScreen,
  useAppThemeColors,
  useSetAppNavigationRef,
} from 'state/appState';
import {useUserIsLoggedIn} from 'state/userState';
import {SCREEN, Stacks} from 'utils/enums';
import {RootNavigationProps} from 'utils/types';
import {BottomTabs} from './bottomTabs';
const Stack = createNativeStackNavigator();

type NavigationProps = {
  navigationRef: NavigationContainerRefWithCurrent<RootNavigationProps>;
};

export const Navigation = ({navigationRef}: NavigationProps) => {
  const isUserLoggedIn = useUserIsLoggedIn();
  const appIsRtl = useAppIsRtl();
  const appColors = useAppThemeColors();
  const showSplashScreen = useAppShowSplashScreen();
  const isDarkMode = useAppIsDarkMode();
  const routeNameRef = useRef('');
  const setAppNavigationRef = useSetAppNavigationRef();

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setAppNavigationRef(navigationRef);
        routeNameRef.current =
          navigationRef.getCurrentRoute()?.name || 'undefined';
      }}
      theme={
        isDarkMode
          ? DarkTheme
          : {
              ...DefaultTheme,
              colors: {...DefaultTheme.colors, background: appColors.PrimaryBG},
            }
      }>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={appColors.SecondaryBG}
        translucent
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: appIsRtl ? 'slide_from_left' : 'slide_from_right',
        }}>
        {isUserLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name={Stacks.BottomTabs}
              component={BottomTabs}
              options={{headerShown: false}}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name={SCREEN.Welcome} component={WelcomeScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
