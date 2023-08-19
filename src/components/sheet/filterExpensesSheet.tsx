import {AppButton} from 'components/basic/buttons';
import {AppText} from 'components/basic/texts';
import {InputDate, InputExpense} from 'components/widgets/inputs/inputExpense';
import React, {useState} from 'react';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import 'react-native-get-random-values';
import {useSetSheet} from 'state/appState';
import {useExpenseFilters, useSetExpenseFilters} from 'state/expenseState';
import {Consts, GS} from 'utils/globalStyles';
import {Strings} from 'utils/strings';
import {ExpenseFilters} from 'utils/types';
import {SheetContentWrap} from './sheet';

export const FilterExpenseSheet = () => {
  const filters = useExpenseFilters();
  const setFilters = useSetExpenseFilters();
  const [expenseFilters, setExpenseFilters] = useState<ExpenseFilters>(filters);
  const {closeSheet} = useSetSheet();

  const saveFilters = () => {
    setFilters(expenseFilters);
    closeSheet();
  };

  const clearFilters = () => {
    setExpenseFilters(Consts.emptyExpenseFilters);
  };

  return (
    <KeyboardAvoidingView style={[GS.center]}>
      <SheetContentWrap style={[GS.filterModalHeight, GS.justifyStart]}>
        <View
          style={[
            GS.marginBottom24,
            GS.marginTop16,
            GS.row,
            GS.fullWidth,
            GS.justifyCenter,
          ]}>
          <TouchableOpacity
            onPress={clearFilters}
            style={[GS.absolute, GS.left8]}>
            <AppText variant="bodyRegular16" color="PrimaryColor">
              {Strings.clear}
            </AppText>
          </TouchableOpacity>
          <AppText variant="title20">{Strings.filters}</AppText>
        </View>
        <InputExpense
          placeholder={Strings.title}
          expense={expenseFilters}
          defaultValue={expenseFilters?.title || ''}
          setExpense={setExpenseFilters}
          updateKey={'title'}
        />
        <InputExpense
          placeholder={Strings.amount}
          expense={expenseFilters}
          defaultValue={expenseFilters?.amount?.toString()}
          keyboardType="numeric"
          validateFunc={amount => Number(amount) > 0}
          setExpense={setExpenseFilters}
          updateKey={'amount'}
        />
        <InputDate
          placeholder={Strings.date}
          expense={expenseFilters}
          defaultValue={expenseFilters?.date}
          keyboardType="numeric"
          setExpense={setExpenseFilters}
          updateKey={'date'}
        />
        <AppButton onPress={saveFilters} text={Strings.filter} />
      </SheetContentWrap>
    </KeyboardAvoidingView>
  );
};
