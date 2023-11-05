import { createReducer, on } from '@ngrx/store';
import { setExpense, updateExpense } from './setLocalStorage.actions';
import { Expense } from '../models/expenses.model';

const initialState: Expense[] = [];
export const setLocalStorgeReducer = createReducer(
  initialState,
  on(setExpense, (state, { newExpense }) => {
    let prevExpenses = localStorage.getItem('expenses');
    let prevExpensesParsed: Expense[] = [];
    if (prevExpenses) {
      prevExpensesParsed = JSON.parse(prevExpenses);
    }
    const expense = [...prevExpensesParsed, newExpense];
    localStorage.setItem('expenses', JSON.stringify(expense));
    return state;
  }),
  on(updateExpense, (state, { updatedExpenses }) => {
    localStorage.removeItem('expenses');
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    return state;
  })
);
