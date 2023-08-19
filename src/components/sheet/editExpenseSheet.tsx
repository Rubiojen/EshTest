import {AppButton} from 'components/basic/buttons';
import {AppText} from 'components/basic/texts';
import {InputDate, InputExpense} from 'components/widgets/inputs/inputExpense';
import React, {useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import 'react-native-get-random-values';
import {useSetSheet, useSheet} from 'state/appState';
import {useExpense, useSetExpense} from 'state/expenseState';
import {GS} from 'utils/globalStyles';
import {Strings} from 'utils/strings';
import {SheetContentWrap} from './sheet';

export const EditExpenseSheet = () => {
  const sheet = useSheet();
  const expenseId = sheet.data as string;
  const expense = useExpense(expenseId);
  const [updatedExpense, setUpdatedExpense] = useState(expense);
  const {updateExpense} = useSetExpense();
  const {closeSheet} = useSetSheet();

  const createNewExpense = () => {
    updateExpense(updatedExpense.id, updatedExpense);
    closeSheet();
  };

  const disabled =
    !updatedExpense.amount ||
    !updatedExpense.title ||
    !(updatedExpense.date.length === 10);

  return (
    <KeyboardAvoidingView style={[GS.center]}>
      <SheetContentWrap style={[GS.fullModalHeight, GS.justifyStart]}>
        <AppText style={[GS.marginBottom24, GS.marginTop16]} variant="title20">
          {Strings.editExpense}
        </AppText>
        <InputExpense
          placeholder={Strings.title}
          expense={updatedExpense}
          defaultValue={updatedExpense.title}
          setExpense={setUpdatedExpense}
          updateKey={'title'}
        />
        <InputExpense
          placeholder={Strings.amount}
          expense={updatedExpense}
          defaultValue={updatedExpense.amount.toString()}
          keyboardType="numeric"
          validateFunc={amount => Number(amount) > 0}
          setExpense={setUpdatedExpense}
          updateKey={'amount'}
        />
        <InputDate
          placeholder={Strings.date}
          expense={updatedExpense}
          defaultValue={updatedExpense.date}
          keyboardType="numeric"
          setExpense={setUpdatedExpense}
          updateKey={'date'}
        />
        <AppButton
          disabled={disabled}
          onPress={createNewExpense}
          text={Strings.save}
        />
      </SheetContentWrap>
    </KeyboardAvoidingView>
  );
};
