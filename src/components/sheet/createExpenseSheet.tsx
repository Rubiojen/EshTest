import {AppButton} from 'components/basic/buttons';
import {AppText} from 'components/basic/texts';
import {InputDate, InputExpense} from 'components/widgets/inputs/inputExpense';
import React, {useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import 'react-native-get-random-values';
import {useSetSheet} from 'state/appState';
import {useSetExpense} from 'state/expenseState';
import {Consts, GS} from 'utils/globalStyles';
import {Strings} from 'utils/strings';
import {v4 as uuidv4} from 'uuid';
import {SheetContentWrap} from './sheet';

export const CreateExpenseSheet = () => {
  const [newExpense, setNewExpense] = useState(Consts.emptyExpense);
  const {createExpense} = useSetExpense();
  const {closeSheet} = useSetSheet();

  const createNewExpense = () => {
    createExpense({...newExpense, id: uuidv4()});
    closeSheet();
  };

  const disabled =
    !newExpense.amount || !newExpense.title || !(newExpense.date.length === 10);

  return (
    <KeyboardAvoidingView style={[GS.center]}>
      <SheetContentWrap style={[GS.fullModalHeight, GS.justifyStart]}>
        <AppText style={[GS.marginBottom24, GS.marginTop16]} variant="title20">
          {Strings.createExpense}
        </AppText>
        <InputExpense
          placeholder={Strings.title}
          expense={newExpense}
          setExpense={setNewExpense}
          updateKey={'title'}
        />
        <InputExpense
          placeholder={Strings.amount}
          expense={newExpense}
          keyboardType="numeric"
          validateFunc={amount => Number(amount) > 0}
          setExpense={setNewExpense}
          updateKey={'amount'}
        />
        <InputDate
          placeholder={Strings.date}
          expense={newExpense}
          keyboardType="numeric"
          setExpense={setNewExpense}
          updateKey={'date'}
        />
        <AppButton
          disabled={disabled}
          onPress={createNewExpense}
          text={Strings.create}
        />
      </SheetContentWrap>
    </KeyboardAvoidingView>
  );
};
