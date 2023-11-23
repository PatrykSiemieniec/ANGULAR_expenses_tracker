import { Category } from '../models/category.model';
import { Expense } from '../models/expenses.model';
import { Settings } from '../models/settings.model';

export interface AppState {
  expenses: Expense[];
  categories: Category[];
  settings: Settings;
}
