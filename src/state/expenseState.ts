import {
  AtomEffect,
  atom,
  atomFamily,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {Consts} from 'utils/globalStyles';
import {Expense, ExpenseFilters} from 'utils/types';
import {persistAtom} from './appState';

// ExpenseState
export const expenseStateFamily = atomFamily({
  key: 'expenseStateFamily',
  default: () => Consts.emptyExpense as Expense,
  effects_UNSTABLE: [persistAtom as AtomEffect<Expense>],
});

export const expenseIdsState = atom({
  key: 'expenseIdsState',
  default: [] as string[],
  effects_UNSTABLE: [persistAtom as AtomEffect<string[]>],
});

export const useExpenseIds = () => useRecoilValue(expenseIdsState);
export const useSetExpenseIds = () => useSetRecoilState(expenseIdsState);

// expenseFiltersState
export const expenseFiltersState = atom({
  key: 'expenseFiltersState',
  default: Consts.emptyExpenseFilters as ExpenseFilters,
  // effects_UNSTABLE: [persistAtom as AtomEffect<ExpenseFilters>],
});

export const useExpenseFilters = () => useRecoilValue(expenseFiltersState);
export const useSetExpenseFilters = () =>
  useSetRecoilState(expenseFiltersState);

// expensesCount
const expensesCount = selector({
  key: 'expensesCount',
  get: ({get}) => {
    const expensesIds = get(expenseIdsState);

    return expensesIds.length;
  },
});

export const useExpensesCount = () => useRecoilValue(expensesCount);

export const allExpenses = selector({
  key: 'allExpenses',
  get: ({get}) => {
    const expenses: Expense[] = [];
    const expenseIds = get(expenseIdsState);

    expenseIds.forEach(mid => {
      const expense = get(expenseStateFamily(mid));
      expenses.push(expense);
    });

    return expenses;
  },
});

export const filteredExpenses = selector({
  key: 'filteredExpenses',
  get: ({get}) => {
    const expenses: Expense[] = [];
    const filters = get(expenseFiltersState);
    const expenseIds = get(expenseIdsState);

    expenseIds.forEach(mid => {
      const expense = get(expenseStateFamily(mid));
      expenses.push(expense);
    });

    return expenses.filter(
      ex =>
        (!filters.title || ex.title.includes(filters.title)) &&
        (filters.amount === undefined || ex.amount === filters.amount) &&
        (!filters.date || ex.date === filters.date),
    );
  },
});

// totalExpenses
const totalExpenses = selector({
  key: 'totalExpenses',
  get: ({get}) => {
    const expenses = get(allExpenses);

    return expenses
      .reduce((acc, expense) => acc + Number(expense.amount), 0)
      .toFixed(2);
  },
});

export const useTotalExpenses = () => useRecoilValue(totalExpenses);

// get single expense
export const useExpense = (id: string) =>
  useRecoilValue(expenseStateFamily(id));

// get all expenses
export const useExpenses = () => useRecoilValue(allExpenses);

// get filtered expenses
export const useFilteredExpenses = () => useRecoilValue(filteredExpenses);

// set single expense
export const useSetExpense = () => {
  const setExpenseIds = useSetExpenseIds();
  const createExpense = useRecoilCallback(
    ({set}) =>
      (newExpense: Expense) => {
        set(expenseStateFamily(newExpense.id), {
          ...newExpense,
        });
        setExpenseIds(ids => [...ids, newExpense.id]);
      },
    [],
  );

  const deleteExpense = useRecoilCallback(
    ({reset}) =>
      (expenseId: string) => {
        reset(expenseStateFamily(expenseId));
        setExpenseIds(ids => ids.filter(id => id !== expenseId));
      },
    [],
  );

  const updateExpense = useRecoilCallback(
    ({set}) =>
      (expenseId: string, newExpense: Partial<Expense>) => {
        set(expenseStateFamily(expenseId), currentExpenseData => ({
          ...currentExpenseData,
          ...newExpense,
        }));
      },
    [],
  );

  return {createExpense, deleteExpense, updateExpense};
};
