import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Expense } from 'src/app/models/expenses.model';
import { isInCurrentWeek } from 'src/app/shared/is-in-current-week';
import { reducePrice } from 'src/app/shared/reduce-price';

export const selectExpensesState = (state: AppState): Expense[] =>
  state.expenses;

export const selectAllExpenses = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => expenses
);

export const selectExpenseByIndex = (index: number) =>
  createSelector(selectExpensesState, (expenses: Expense[]) =>
    index >= 0 && index < expenses.length ? expenses[index] : null
  );

export const selectFilteredExpenses = (searchValue: string) =>
  createSelector(selectExpensesState, (expenses: Expense[]) => {
    if (!searchValue || searchValue.trim() === '') {
      return expenses;
    }
    return expenses.filter((expense) =>
      expense.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

export const selectFilteredExpensesByTime = (time: string) =>
  createSelector(selectExpensesState, (expenses: Expense[]) => {
    switch (time) {
      case 'day':
        return expenses.filter(
          (item) => new Date(item.date).getDate() === new Date().getDate()
        );
      case 'week':
        return expenses.filter((item) => isInCurrentWeek(new Date(item.date)));
      case 'month':
        return expenses.filter(
          (item) => new Date(item.date).getMonth() === new Date().getMonth()
        );
      case 'all':
        return expenses;
      default:
        return expenses;
    }
  });

export const selectExpensesPrices = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => {
    return reducePrice(expenses);
  }
);

export const selectMonthExpenses = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => {
    if (expenses.length === 0) return 0;
    const currentMonth = new Date().getMonth();
    const filteredExpensesByMonth = expenses.filter(
      (item) => new Date(item.date).getMonth() === currentMonth
    );
    if (filteredExpensesByMonth.length === 0) {
      return 0;
    } else {
      return reducePrice(filteredExpensesByMonth);
    }
  }
);

export const selectWeekExpenses = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => {
    if (expenses.length === 0) return 0;
    const filteredExpensesByWeek = expenses.filter((item) =>
      isInCurrentWeek(new Date(item.date))
    );
    if (filteredExpensesByWeek.length === 0) {
      return 0;
    } else {
      return reducePrice(filteredExpensesByWeek);
    }
  }
);

export const selectDailyExpenses = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => {
    const currentDate = new Date().getDate();
    const filteredExpensesByDay = expenses.filter(
      (item) => new Date(item.date).getDate() === currentDate
    );
    if (filteredExpensesByDay.length === 0) {
      return 0;
    } else {
      return reducePrice(filteredExpensesByDay);
    }
  }
);

export const selectBudget = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => {
    const currentDate = new Date().getDate();
    const filteredExpensesByDay = expenses.filter(
      (item) => new Date(item.date).getDate() === currentDate
    );
    if (filteredExpensesByDay.length === 0) {
      return 0;
    } else {
      return reducePrice(filteredExpensesByDay);
    }
  }
);
