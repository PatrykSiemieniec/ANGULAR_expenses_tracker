import { createReducer, on } from '@ngrx/store';
import { setExpense, updateExpense } from './setExpenses.actions';
import { Expense } from 'src/app/models/expenses.model';

const initialState: Expense[] = [];
export const setExpensesReducer = createReducer(
  initialState,
  on(setExpense, (state, { newExpense }) => {
    console.log('set')
    let prevExpenses = localStorage.getItem('expenses');
    let prevExpensesParsed: Expense[] = [];
    if (prevExpenses) {
      prevExpensesParsed = JSON.parse(prevExpenses);
    }
    const expense = [...prevExpensesParsed, newExpense];
    localStorage.setItem('expenses', JSON.stringify(expense));
    return expense;
  }),
  on(updateExpense, (state, { updatedExpenses }) => {
    localStorage.removeItem('expenses');
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    return updatedExpenses;
  })
);
