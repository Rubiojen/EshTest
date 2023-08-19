import {AppInput} from 'components/basic/texts';
import React, {RefObject, useCallback, useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import {validateName} from 'utils/helpers';
import {Expense, ExpenseFilters} from 'utils/types';

type Props<T> = {
  nextInputRef?: RefObject<TextInput>;
  keyboardType?: KeyboardTypeOptions;
  inputRef?: RefObject<TextInput>;
  defaultValue?: string;
  validateFunc?: (name: string) => boolean;
  setExpense: React.Dispatch<React.SetStateAction<T>>;
  updateKey: keyof T;
  expense: T;
  placeholder?: string;
  setErrorOnChange?: boolean;
  autoComplete?: string;
};

export const InputExpense = <T extends Expense | ExpenseFilters>({
  nextInputRef,
  inputRef,
  updateKey,
  keyboardType,
  defaultValue = '',
  placeholder,
  expense,
  setExpense,
  autoComplete,
  setErrorOnChange = false,
  validateFunc = validateName,
}: Props<T>) => {
  const [err, setErr] = useState('');

  const onChangeText = useCallback(
    (name: string) => {
      if (!validateFunc(name)) {
        setErrorOnChange && setErr('Invalid name');
      } else {
        setErr('');
      }
      setExpense(exp => ({...exp, [updateKey]: name}));
    },
    [validateFunc, setExpense, setErrorOnChange, updateKey],
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
      autoComplete={autoComplete as any}
      keyboardType={keyboardType}
      nextInputRef={nextInputRef}
      withError
      value={(expense?.[updateKey] as string) || defaultValue}
      errorMess={err}
      onChangeText={onChangeText}
    />
  );
};

export const InputDate = <T extends Expense | ExpenseFilters>({
  nextInputRef,
  inputRef,
  updateKey,
  keyboardType,
  defaultValue = '',
  placeholder,
  expense,
  setExpense,
  autoComplete,
}: Props<T>) => {
  const onChangeText = useCallback(
    (dateString: string) => {
      if (
        (dateString.length === 2 || dateString.length === 5) &&
        dateString.length - expense.date.length === 1
      ) {
        setExpense(exp => ({...exp, [updateKey]: dateString + '.'}));
      } else if (
        expense.date.length < 10 &&
        dateString.length - expense.date.length === 1
      ) {
        setExpense(exp => ({...exp, [updateKey]: dateString}));
      }
    },
    [expense?.date, setExpense, updateKey],
  );

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace') {
      setExpense(exp => ({...exp, [updateKey]: ''}));
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setExpense(exp => ({...exp, [updateKey]: defaultValue}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <AppInput
      placeholder={placeholder}
      inputRef={inputRef}
      autoComplete={autoComplete as any}
      keyboardType={keyboardType}
      nextInputRef={nextInputRef}
      withError
      value={(expense?.[updateKey] as string) || defaultValue}
      onKeyPress={onKeyPress}
      onChangeText={onChangeText}
    />
  );
};
