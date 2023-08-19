import {AppText} from 'components/basic/texts';
import React from 'react';
import {SectionList, TouchableOpacity, View} from 'react-native';
import {useAppThemeColors, useSetSheet} from 'state/appState';
import {useFilteredExpenses, useSetExpense} from 'state/expenseState';
import {AnimateLayout, GS} from 'utils/globalStyles';
import {convertToISOFormat, parseDate} from 'utils/helpers';
import {Expense} from 'utils/types';
import {Amount} from '../amount/amount';
import {SwipeItem} from '../swipeRow';

interface GroupedExpenses {
  [date: string]: Expense[];
}

interface Section {
  title: string;
  data: Expense[];
}

const aggregateByDate = (expenses: Expense[]): Section[] => {
  const grouped = expenses.reduce<GroupedExpenses>((acc, expense) => {
    const dateStr = convertToISOFormat(expense.date);
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(expense);
    return acc;
  }, {});

  // Sort the keys of the grouped object using the parseDate function
  const sortedKeys = Object.keys(grouped).sort(
    (a, b) => parseDate(b).getTime() - parseDate(a).getTime(),
  );

  // Map the sorted keys to the Section array and sort the expenses within each section
  return sortedKeys.map<Section>(dateStr => ({
    title: dateStr,
    data: grouped[dateStr],
  }));
};
export const ExpensesFilterList = () => {
  const appColors = useAppThemeColors();
  const expenses = useFilteredExpenses();
  const {openSheet} = useSetSheet();
  const {deleteExpense} = useSetExpense();

  const editExpense = (id: string) => {
    openSheet({type: 'EditExpense', data: id});
  };

  const removeFromList = (id: string) => {
    AnimateLayout();
    deleteExpense(id);
  };

  return (
    <View style={[GS.flexOne]}>
      <SectionList
        sections={aggregateByDate(expenses)}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <ExpenseItem
            edit={editExpense}
            remove={removeFromList}
            item={item}
            index={index}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={[
              {backgroundColor: appColors.SecondaryBG},
              GS.paddingHorizontal16,
              GS.paddingVertical4,
            ]}>
            <AppText style={[GS.alignSelfStart]} variant="bodyMedium16">
              {title}
            </AppText>
          </View>
        )}
      />
    </View>
  );
};

type ExpenseItemProps = {
  item: Expense;
  index: number;
  remove: (id: string) => void;
  edit: (id: string) => void;
};

const ExpenseItem = ({item, index, remove, edit}: ExpenseItemProps) => {
  const appColors = useAppThemeColors();

  return (
    <SwipeItem onDoneRemove={() => remove(item.id)}>
      <TouchableOpacity
        onPress={() => edit(item.id)}
        style={[
          GS.row,
          GS.fullWidth,
          GS.justifySpaceBetween,
          GS.paddingHorizontal16,
          GS.paddingVertical12,
          index > 0 && GS.borderTop1,
          {borderColor: appColors.Border},
        ]}>
        <AppText variant="bodySemibold18">{item.title}</AppText>
        <Amount amount={Number(item.amount).toFixed(2)} />
      </TouchableOpacity>
    </SwipeItem>
  );
};
