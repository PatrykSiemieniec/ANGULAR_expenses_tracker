import { Category } from "../models/category.model";
import { Expense } from "../models/expenses.model";

export interface AppState{
    expenses: Expense[];
    category: Category[]
}