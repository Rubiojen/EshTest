/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useNavigationContainerRef} from '@react-navigation/native';
import {LogStateUpdates} from 'components/logStateUpdates';
import {Sheet} from 'components/sheet/sheet';
import React from 'react';
import {I18nManager, LogBox, Platform, UIManager} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from 'react-native-recoil-persist';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import {GS} from 'utils/globalStyles';
import {RootNavigationProps} from 'utils/types';
import {Navigation} from './src/navigation/navigation';

LogBox.ignoreAllLogs();

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  const navigationRef = useNavigationContainerRef<RootNavigationProps>();

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
          {__DEV__ && <LogStateUpdates />}
          <GestureHandlerRootView style={[GS.flexOne]}>
            <Navigation navigationRef={navigationRef} />
            <Sheet />
          </GestureHandlerRootView>
        </ReactNativeRecoilPersistGate>
      </RecoilRoot>
    </SafeAreaProvider>
  );
};

export default App;
