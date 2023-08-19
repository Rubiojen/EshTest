import {useEffect} from 'react';
import {useSheet} from 'state/appState';
import {
  useExpenseFilters,
  useExpenseIds,
  useExpenses,
} from 'state/expenseState';
import {useUser} from 'state/userState';
import {logWithColor} from 'utils/helpers';

export const LogStateUpdates = () => {
  const user = useUser();
  const sheet = useSheet();
  const expenses = useExpenses();
  const expenseIds = useExpenseIds();
  const expenseFilters = useExpenseFilters();

  useEffect(() => {
    logWithColor('Recoil ExpenseState (expenses):', expenses);
  }, [expenses]);

  useEffect(() => {
    logWithColor('Recoil ExpenseState (expenseFilters):', expenseFilters);
  }, [expenseFilters]);

  useEffect(() => {
    logWithColor('Recoil ExpenseState (expenseIds):', expenseIds);
  }, [expenseIds]);

  useEffect(() => {
    logWithColor('Recoil UserState (user):', user);
  }, [user]);

  useEffect(() => {
    logWithColor('Recoil AppState (sheet):', sheet);
  }, [sheet]);

  return null;
};
