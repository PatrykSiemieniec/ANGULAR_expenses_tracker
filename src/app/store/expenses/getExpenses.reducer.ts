import { createReducer, on } from '@ngrx/store';
import { getExpense } from './getExpenses.actions';
import { Expense } from 'src/app/models/expenses.model';

const initialState: Expense[] = [];
export const getExpensesReducer = createReducer(
  initialState,
  on(getExpense, (state) => {
    console.log('get')
    const fetchedExpenses = localStorage.getItem('expenses');
    if (fetchedExpenses === null) {
      return [];
    } else {
      
      const expenses = JSON.parse(fetchedExpenses);
      return [...expenses];
    }
     
  }),

  //change-test
);
