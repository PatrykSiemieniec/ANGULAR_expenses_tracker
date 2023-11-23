import { Injectable } from '@angular/core';
import { Expense } from '../models/expenses.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  isFormOpen = new Subject<boolean>();

  constructor() {
    this.isFormOpen.next(false);
  }

  getExpenses(): Expense[] {
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
