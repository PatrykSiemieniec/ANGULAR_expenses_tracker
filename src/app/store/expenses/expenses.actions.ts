import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expenses.model';

export const loadExpenses = createAction('[Expense Page] Load Expenses');

export const addExpense = createAction(
  '[Expense Page] Add Expense',
  props<{ expense: Expense }>()
);

export const removeExpense = createAction(
  '[Expense Page] Remove Expense',
  props<{ id: number }>()
);

export const updateExpense = createAction(
  '[Expense Page] Update Expense',
  props<{ newExpense: Expense; id: number }>()
);

export const filterExpense = createAction(
  '[Expense Page] Filter Expense',
  props<{ providedString: string }>()
);

export const loadExpensesSuccess = createAction(
  '[Expense API] Expenses Load Success',
  props<{ expenses: Expense[] }>()
);
