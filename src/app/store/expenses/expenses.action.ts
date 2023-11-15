import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expenses.model';

export const loadExpenses = createAction('[Expense] Load Expenses');

export const addExpense = createAction(
  '[Expense] Add Expense',
  props<{ expense: Expense }>()
);

export const removeExpense = createAction(
  '[Expense] Remove Expense',
  props<{ id: number }>()
);

export const updateExpense = createAction(
  '[Expense] Update Expense',
  props<{ newExpense: Expense; id: number }>()
);

export const filterExpense = createAction(
  '[Expense] Filter Expense',
  props<{ filteredExpense: Expense[] }>()
);
