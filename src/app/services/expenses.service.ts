import { Injectable } from '@angular/core';
import { Expense } from '../models/expenses.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllExpenses } from '../store/expenses/expenses.selectors';
import { AppState } from '../store/app.state';
import { filterExpense } from '../store/expenses/expenses.action';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expenses: Expense[] = [];

  isFormOpen = new Subject<boolean>();
  sumOfPrices = new BehaviorSubject<number>(this.getAllPrices());
  sumOfDailyPrices = new BehaviorSubject<number>(this.getCurrentDayPrices());
  sumOfWeeklyPrices = new BehaviorSubject<number>(this.getCurrentWeekPrices());
  sumOfMonthlyPrices = new BehaviorSubject<number>(
    this.getCurrentMonthPrices()
  );

  constructor(private store: Store<AppState>) {
    this.store.select(selectAllExpenses).subscribe((expenses) => {
      return (this.expenses = expenses.map(
        (expense: Expense) =>
          new Expense(
            expense.name,
            expense.price,
            expense.category,
            new Date(expense.date)
          )
      ));
    });
    this.isFormOpen.next(false);
    this.updateData();
  }

  getAllPrices(): number {
    if (this.expenses.length === 0) return 0;
    return this.reducePrice(this.expenses);
  }

  getCurrentDayPrices() {
    const currentDate = new Date().getDate();
    const filteredExpensesByDay = this.expenses.filter(
      (item) => item.date.getDate() === currentDate
    );
    if (filteredExpensesByDay.length === 0) {
      return 0;
    } else {
      return this.reducePrice(filteredExpensesByDay);
    }
  }

  getCurrentWeekPrices() {
    if (this.expenses.length === 0) return 0;
    const filteredExpensesByWeek = this.expenses.filter((item) =>
      this.isInCurrentWeek(item.date)
    );
    if (filteredExpensesByWeek.length === 0) {
      return 0;
    } else {
      return this.reducePrice(filteredExpensesByWeek);
    }
  }

  getCurrentMonthPrices() {
    if (this.expenses.length === 0) return 0;
    const currentMonth = new Date().getMonth();
    const filteredExpensesByMonth = this.expenses.filter(
      (item) => item.date.getMonth() === currentMonth
    );
    if (filteredExpensesByMonth.length === 0) {
      return 0;
    } else {
      return this.reducePrice(filteredExpensesByMonth);
    }
  }

  filterExpense(searchValue: string) {
    const filteredExpenses = this.expenses.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
  }
  filterExpenseByTime(time: string) {
    switch (time) {
      case 'day':
        const filteredExpensesByDay = this.expenses.filter(
          (item) => item.date.getDate() === new Date().getDate()
        );
        this.store.dispatch(
          filterExpense({ filteredExpense: filteredExpensesByDay })
        );
        break;
      case 'week':
        const filteredExpensesByWeek = this.expenses.filter((item) =>
          this.isInCurrentWeek(item.date)
        );
        this.store.dispatch(
          filterExpense({ filteredExpense: filteredExpensesByWeek })
        );
        break;
      case 'month':
        const filteredExpensesByMonth = this.expenses.filter(
          (item) => item.date.getMonth() === new Date().getMonth()
        );
        this.store.dispatch(
          filterExpense({ filteredExpense: filteredExpensesByMonth })
        );
        break;
      case 'all':
        this.store.dispatch(filterExpense({ filteredExpense: this.expenses }));
        break;
      default:
        return;
    }
  }

  private updateData() {
    this.sumOfPrices.next(this.getAllPrices());
    this.sumOfDailyPrices.next(this.getCurrentDayPrices());
    this.sumOfWeeklyPrices.next(this.getCurrentWeekPrices());
    this.sumOfMonthlyPrices.next(this.getCurrentMonthPrices());
  }

  private reducePrice(expenses: Expense[]) {
    if (this.expenses.length === 0) return 0;
    return expenses
      .map((expense) => expense.price)
      .reduce((prev, curr) => {
        return prev + curr;
      });
  }

  private isInCurrentWeek(date: Date) {
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setHours(0, 0, 0, 0);
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 7);
    return date >= currentWeekStart && date <= currentWeekEnd;
  }
}
