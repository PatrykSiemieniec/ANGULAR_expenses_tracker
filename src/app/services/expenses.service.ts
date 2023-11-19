import { Injectable } from '@angular/core';
import { Expense } from '../models/expenses.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  from,
  map,
  of,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllExpenses,
  selectFilteredExpenses,
} from '../store/expenses/expenses.selectors';
import { AppState } from '../store/app.state';
import { filterExpense } from '../store/expenses/expenses.actions';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  isFormOpen = new Subject<boolean>();

  constructor() {
    this.isFormOpen.next(false);
  }

  getExpenses() {
    const expenses = localStorage.getItem('expenses');
    let parsedExpenses: Expense[];
    if (expenses) {
      parsedExpenses = JSON.parse(expenses);
    } else {
      parsedExpenses = [];
    }

    return parsedExpenses;
  }
}
