import { Expense } from '../models/expenses.model';

export const reducePrice = (expenses: Expense[]): number => {
  if (expenses.length === 0) return 0;
  return expenses
    .map((expense) => expense.price)
    .reduce((prev, curr) => prev + curr, 0);
};
