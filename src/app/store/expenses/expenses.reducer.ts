import { createReducer, on } from '@ngrx/store';
import { Expense } from 'src/app/models/expenses.model';
import {
  addExpense,
  filterExpense,
  loadExpenses,
  removeExpense,
  updateExpense,
} from './expenses.action';

export const initialState: Expense[] = [];

export const expensesReducer = createReducer(
  initialState,
  on(loadExpenses, (state) => {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
      state = JSON.parse(expenses);
    }
    return state;
  }),
  on(addExpense, (state, { expense }) => {
    const updatedEpenses = [...state, expense];
    localStorage.setItem('expenses', JSON.stringify(updatedEpenses));
    return updatedEpenses;
  }),
  on(removeExpense, (state, { id }) => {
    const updatedExpenses = [...state.filter((_, idx) => idx !== id)];
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    return updatedExpenses;
  }),
  on(updateExpense, (state, { newExpense, id }) => {
    const updatedExpense = [...state];
    updatedExpense[id] = newExpense;
    localStorage.setItem('expenses', JSON.stringify(updatedExpense));
    return updatedExpense;
  }),
  on(filterExpense, (state, { filteredExpense }) => {
    return filteredExpense;
  })
);
