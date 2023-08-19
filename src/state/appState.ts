import {NavigationContainerRefWithCurrent} from '@react-navigation/native';
import {useCallback} from 'react';
import {Appearance, Keyboard} from 'react-native';
// import push from 'react-native-code-push';
import ReactNativeRecoilPersist from 'react-native-recoil-persist';
import {
  AtomEffect,
  atom,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
// import {CodePushVersion} from 'utils/codePush';
import {Consts, colorsTheme} from 'utils/globalStyles';
import {RootNavigationProps, Sheet} from 'utils/types';

export const persistAtom = ReactNativeRecoilPersist.persistAtom;

const colorScheme = Appearance.getColorScheme();

// FLAGS ######################################################################################################
// showSplashScreen
export const showSplashScreen = atom({
  key: 'showSplashScreen',
  default: true as boolean,
});

export const useAppShowSplashScreen = () => useRecoilValue(showSplashScreen);
export const useSetAppshowSplashScreen = () =>
  useSetRecoilState(showSplashScreen);

// isInitializingAppAtom
export const isInitializingAppAtom = atom({
  key: 'isInitializingAppAtom',
  default: true as boolean,
});

export const useAppIsInit = () => useRecoilValue(isInitializingAppAtom);
export const useSetAppIsInit = () => useSetRecoilState(isInitializingAppAtom);

// isDarkModeAtom
export const isDarkModeAtom = atom({
  key: 'isDarkModeAtom',
  default: (colorScheme !== 'dark') as boolean,
  effects_UNSTABLE: [persistAtom as AtomEffect<boolean>],
});

export const useAppIsDarkMode = () => useRecoilValue(isDarkModeAtom);
export const useSetAppIsDarkMode = () => useSetRecoilState(isDarkModeAtom);

// appColorsAtom
const appColorsAtom = selector({
  key: 'appColorsAtom',
  get: ({get}) => {
    const isDark = get(isDarkModeAtom);

    return colorsTheme[isDark ? 'DARK' : 'LIGHT'];
  },
});

export const useAppThemeColors = () => useRecoilValue(appColorsAtom);

// appIsRtl
export const appIsRtl = atom({
  key: 'appIsRtl',
  default: false,
  effects_UNSTABLE: [persistAtom as AtomEffect<boolean>],
});

export const useAppIsRtl = () => useRecoilValue(appIsRtl);
export const useSetAppIsRtl = () => useSetRecoilState(appIsRtl);

// appNavigationRef
export const appNavigationRef = atom({
  dangerouslyAllowMutability: true,
  key: 'appNavigationRef',
  default:
    null as NavigationContainerRefWithCurrent<RootNavigationProps> | null,
});

export const useAppNavigationRef = () => useRecoilValue(appNavigationRef);
export const useSetAppNavigationRef = () => useSetRecoilState(appNavigationRef);

// appIsLoading
export const appIsLoading = atom({
  key: 'appIsLoading',
  default: false,
});

export const useAppIsLoading = () => useRecoilValue(appIsLoading);
export const useSetAppIsLoading = () => useSetRecoilState(appIsLoading);

// SHEET ######################################################################################################
const sheet = atom({
  key: 'sheet',
  default: Consts.closedSheet as Sheet,
});

export const useSheet = () => useRecoilValue(sheet);
export const useSetSheetOpenRecoil = () => {
  return useSetRecoilState(sheet);
};

export const useSetSheet = () => {
  const setSheet = useSetSheetOpenRecoil();
  const sheetState = useSheet();

  const updateSheet = useCallback(
    (updates: Partial<Sheet>) => {
      setSheet(s => ({...s, ...updates}));
    },
    [setSheet],
  );

  const openSheet = useCallback(
    (shet: Sheet) => {
      setSheet({
        isOpen: true,
        canCloseOutside: shet.canCloseOutside !== false,
        darkenBackground: true,
        finishCloseAnimation: false,
        ...shet,
      });
    },
    [setSheet],
  );

  // finished animation
  const hideSheet = useCallback(() => {
    setSheet(Consts.closedSheet);
  }, [setSheet]);

  // to start closing
  const closeSheet = useCallback(() => {
    Keyboard.dismiss();
    setSheet({...sheetState, isOpen: false, canCloseOutside: true});
  }, [setSheet, sheetState]);

  return {openSheet, closeSheet, hideSheet, updateSheet};
};
