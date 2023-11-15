import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Expense } from 'src/app/models/expenses.model';

export const selectExpensesState = (state: AppState): Expense[] => state.expenses;

export const selectAllExpenses = createSelector(
  selectExpensesState,
  (expenses: Expense[]) => expenses
);

export const selectExpenseByIndex = (index: number) => createSelector(
  selectExpensesState,
  (expenses: Expense[]) => (index >= 0 && index < expenses.length) ? expenses[index] : null
);