import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {RootNavigationProps} from 'utils/types';

export const useAppNavigation = (): RootNavigationProps =>
  useNavigation<RootNavigationProps>();

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (func: any) => useEffect(() => func(), []);

export const useIsKeyboardShown = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
