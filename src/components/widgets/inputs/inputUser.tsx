import {AppInput} from 'components/basic/texts';
import React, {
  Dispatch,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {KeyboardTypeOptions, TextInput} from 'react-native';
import {validateName} from 'utils/helpers';
import {User} from 'utils/types';

type UserKey = keyof User;

type Props = {
  nextInputRef?: RefObject<TextInput>;
  updateKey: UserKey;
  keyboardType?: KeyboardTypeOptions;
  inputRef?: RefObject<TextInput>;
  defaultValue?: string;
  validateFunc?: (name: string) => boolean;
  user: User;
  setUser: Dispatch<React.SetStateAction<User>>;
  placeholder?: string;
  setErrorOnChange?: boolean;
};

export const InputUser = ({
  nextInputRef,
  inputRef,
  updateKey,
  keyboardType,
  defaultValue = '',
  placeholder,
  user,
  setUser,
  setErrorOnChange = false,
  validateFunc = validateName,
}: Props) => {
  const [err, setErr] = useState('');

  const onChangeText = useCallback(
    (name: string) => {
      if (!validateFunc(name)) {
        setErrorOnChange && setErr('Invalid name');
      } else {
        setErr('');
      }
      setUser(usr => ({...usr, [updateKey]: name}));
    },
    [validateFunc, setUser, setErrorOnChange, updateKey],
  );

  useEffect(() => {
    if (defaultValue) {
      onChangeText(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <AppInput
      placeholder={placeholder}
      inputRef={inputRef}
      autoComplete={'name'}
      keyboardType={keyboardType}
      nextInputRef={nextInputRef}
      withError
      value={(user?.[updateKey] as string) || defaultValue}
      errorMess={err}
      onChangeText={onChangeText}
    />
  );
};
