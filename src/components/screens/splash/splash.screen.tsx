import {GetLottie} from 'components/basic/lottie';
import LottieView from 'lottie-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppThemeColors, useSetAppshowSplashScreen} from 'state/appState';
import {LottieFiles, normalizeWidth} from 'utils/globalStyles';

export const SplashScreen = () => {
  const appColors = useAppThemeColors();
  const setShowSplash = useSetAppshowSplashScreen();
  const fade = useSharedValue(1);
  const [lottieRef, setLottieRef] = useState<LottieView | null>(null);

  const hideSplash = useCallback(() => {
    setShowSplash(false);
  }, [setShowSplash]);

  const hideSplashScreenAnimated = useCallback(async () => {
    fade.value = withTiming(
      0,
      {duration: 200},
      isFinished => isFinished && runOnJS(hideSplash)(),
    );
  }, [fade, hideSplash]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  useEffect(() => {
    lottieRef?.play();
  }, [lottieRef]);

  return (
    <Animated.View
      style={[
        styles.splashContainer,
        {backgroundColor: appColors.PrimaryBG},
        fadeStyle,
      ]}>
      <GetLottie
        source={LottieFiles.SPLASH}
        loop={false}
        setLottieRef={setLottieRef}
        onAnimationFinish={hideSplashScreenAnimated}
        width={normalizeWidth(200)}
        height={normalizeWidth(100)}
      />
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
