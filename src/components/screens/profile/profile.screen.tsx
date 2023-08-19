import {AppText} from 'components/basic/texts';
import {ScreenView} from 'components/basic/views';
import {useAppNavigation} from 'hooks/common.hooks';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useAppThemeColors} from 'state/appState';
import {
  useExpenseIds,
  useExpensesCount,
  useSetExpense,
  useSetExpenseFilters,
} from 'state/expenseState';
import {useSetUser} from 'state/userState';
import {SCREEN} from 'utils/enums';
import {Consts, GS} from 'utils/globalStyles';
import {Strings} from 'utils/strings';

export const ProfileScreen = () => {
  const {navigate} = useAppNavigation();
  const expenseIds = useExpenseIds();
  const {deleteExpense} = useSetExpense();
  const setFilters = useSetExpenseFilters();
  const setUser = useSetUser();
  const appColors = useAppThemeColors();
  const expensesCount = useExpensesCount();

  const goToExpenses = () => {
    navigate(SCREEN.Home);
  };

  const signOut = async () => {
    setUser(Consts.emptyUser);
    setFilters(Consts.emptyExpenseFilters);
    expenseIds.forEach(id => deleteExpense(id));
  };

  return (
    <ScreenView dismissKeyboardOnTouch>
      <View style={[GS.flexOne, GS.justifyCenter]}>
        <TouchableOpacity
          style={[
            GS.borderBottom1,
            GS.marginHorizontal24,
            GS.marginBottom24,
            {borderColor: appColors.Border},
          ]}
          onPress={goToExpenses}>
          <View style={[GS.row, GS.justifySpaceBetween, GS.marginBottom8]}>
            <AppText variant="bodySemibold18">{Strings.totalItems}</AppText>
            <AppText>{expensesCount}</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            GS.borderBottom1,
            GS.marginHorizontal24,
            {borderColor: appColors.Border},
          ]}
          onPress={signOut}>
          <View style={[GS.marginBottom8]}>
            <AppText style={[GS.alignSelfStart]} variant="bodySemibold18">
              {Strings.signOut}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};
