import {AppHeader} from 'components/basic/appHeader';
import {AppButton} from 'components/basic/buttons';
import {AppText} from 'components/basic/texts';
import {ScreenView} from 'components/basic/views';
import {Amount} from 'components/widgets/amount/amount';
import {ExpensesFilterList} from 'components/widgets/expense/expensesFilterList';
import React from 'react';
import {View} from 'react-native';
import {useSetSheet} from 'state/appState';
import {useTotalExpenses} from 'state/expenseState';
import {useUserName} from 'state/userState';
import {GS} from 'utils/globalStyles';
import {Strings} from 'utils/strings';

export const HomeScreen = () => {
  const userName = useUserName();
  const totalExpenses = useTotalExpenses();
  const {openSheet} = useSetSheet();

  const openFilters = () => {
    openSheet({type: 'FilterExpenses'});
  };

  return (
    <ScreenView dismissKeyboardOnTouch>
      <AppHeader title={userName} hasBack={false} />
      <View style={[GS.row, GS.paddingHorizontal16, GS.marginTop32]}>
        <AppText variant="title18" style={[GS.marginRight16]}>
          {Strings.totalExpenses}
        </AppText>
        <Amount amount={totalExpenses} />
      </View>
      <AppButton
        onPress={openFilters}
        text={Strings.filters}
        style={[
          GS.marginTop32,
          GS.alignSelfEnd,
          GS.marginBottom16,
          GS.marginHorizontal16,
          {width: 'auto'},
        ]}
        textColor="InvertText"
        bgColor="Border"
        icon={{type: 'Ionicons', name: 'filter', color: 'InvertText'}}
      />
      <ExpensesFilterList />
    </ScreenView>
  );
};
