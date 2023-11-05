import { createReducer, on } from '@ngrx/store';
import { getExpense } from './getLocalStorage.actions';
import { Expense } from '../models/expenses.model';

const initialState: Expense[] = [];
export const getLocalStorgeReducer = createReducer(
  initialState,
  on(getExpense, (state) => {
    const fetchedExpenses = localStorage.getItem('expenses');
    if (fetchedExpenses === null) {
      return [];
    } else {
      const expenses = JSON.parse(fetchedExpenses);
      return [ ...expenses];
    }
  }),
  
);
