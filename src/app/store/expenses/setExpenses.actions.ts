import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expenses.model';

export const setExpense = createAction(
  '[Set Expenses] SetExpense',
  props<{ newExpense: Expense }>()
);
export const updateExpense = createAction(
  '[Set Expenses] UpdateExpense',
  props<{ updatedExpenses: Expense[] }>()
);
