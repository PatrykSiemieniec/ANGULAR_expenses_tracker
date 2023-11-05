import { createAction, props } from '@ngrx/store';
import { Expense } from '../models/expenses.model';

export const setExpense = createAction(
  '[Set Local Storage] SetExpense',
  props<{newExpense: Expense}>()
);
export const updateExpense = createAction(
  '[Set Local Storage] UpdateExpense',
  props<{updatedExpenses: Expense[]}>()
)
