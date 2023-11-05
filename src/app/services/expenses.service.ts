import { Injectable } from '@angular/core';
import { Expense } from '../models/expenses.model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { getExpense } from '../store/getLocalStorage.actions';
import { setExpense, updateExpense } from '../store/setLocalStorage.actions';
@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expenses: Expense[] = []
  // [
  //   new Expense('TV', 4000, 'AGD', new Date('11-03-2023'), 'Samsun Smart TV'),
  //   new Expense(
  //     'Chair',
  //     800,
  //     'Furniture',
  //     new Date('11-25-2023'),
  //     'Wooden Chair'
  //   ),
  //   new Expense(
  //     'Laptop',
  //     3500,
  //     'Electronic',
  //     new Date('11-05-2023'),
  //     'Acer Nitro 5'
  //   ),
  //   new Expense('Mirror', 150, 'Furniture', new Date('11-03-2023')),
  // ];

  expensesChanged = new Subject<Expense[]>();
  isFormOpen = new Subject<boolean>();
  sumOfPrices = new BehaviorSubject<number>(this.getAllPrices());
  sumOfDailyPrices = new BehaviorSubject<number>(this.getCurrentDayPrices());
  sumOfWeeklyPrices = new BehaviorSubject<number>(this.getCurrentWeekPrices());
  sumOfMonthlyPrices = new BehaviorSubject<number>(
    this.getCurrentMonthPrices()
  );

  constructor(private store: Store<{ getLocalStorage: Expense[] }>) {
    this.isFormOpen.next(false);
    this.store.dispatch(getExpense());
    this.store
      .select('getLocalStorage')
      .pipe(
        map((expense) => {
          return expense.map(
            (expense) =>
              new Expense(
                expense.name,
                expense.price,
                expense.category,
                new Date(expense.date),
                expense.description
              )
          );
        })
      )
      .subscribe((expenses) => (this.expenses = expenses));
  }

  getExpenses() {
    return this.expenses.slice();
  }

  getExpense(index: number) {
    return this.expenses[index];
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

  removeExpense(index: number) {
    const filteredExpenses = this.expenses.filter((item, idx) => idx !== index);
    this.store.dispatch(updateExpense({ updatedExpenses: filteredExpenses }));
    this.store.dispatch(getExpense());
    this.expensesChanged.next(this.expenses.slice());
    this.sumOfPrices.next(this.getAllPrices());
    this.sumOfDailyPrices.next(this.getCurrentDayPrices());
    this.sumOfWeeklyPrices.next(this.getCurrentWeekPrices());
    this.sumOfMonthlyPrices.next(this.getCurrentWeekPrices());
  }

  addExpense(expense: Expense) {
    this.expenses.push(
      new Expense(
        expense.name,
        expense.price,
        expense.category,
        new Date(expense.date),
        expense.description
      )
    );
    this.expensesChanged.next(this.expenses.slice());
    this.sumOfPrices.next(this.getAllPrices());
    this.sumOfDailyPrices.next(this.getCurrentDayPrices());
    this.sumOfWeeklyPrices.next(this.getCurrentWeekPrices());
    this.sumOfMonthlyPrices.next(this.getCurrentMonthPrices());
    this.store.dispatch(setExpense({ newExpense: expense }));
    this.store.dispatch(getExpense());
  }
  updateExpense(index: number, editedExpense: Expense) {
    this.expenses[index] = new Expense(
      editedExpense.name,
      editedExpense.price,
      editedExpense.category,
      new Date(editedExpense.date),
      editedExpense.description
    );
    this.store.dispatch(updateExpense({ updatedExpenses: this.expenses }));
    this.store.dispatch(getExpense());
    this.expensesChanged.next(this.expenses.slice());
    this.sumOfPrices.next(this.getAllPrices());
    this.sumOfDailyPrices.next(this.getCurrentDayPrices());
    this.sumOfWeeklyPrices.next(this.getCurrentWeekPrices());
    this.sumOfMonthlyPrices.next(this.getCurrentMonthPrices());
  }

  filterExpense(searchValue: string) {
    const filteredExpenses = this.expenses.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    this.expensesChanged.next(filteredExpenses);
  }
  filterExpenseByTime(time: string) {
    switch (time) {
      case 'day':
        const filteredExpensesByDay = this.expenses.filter(
          (item) => item.date.getDate() === new Date().getDate()
        );
        this.expensesChanged.next(filteredExpensesByDay);
        break;
      case 'week':
        const filteredExpensesByWeek = this.expenses.filter((item) =>
          this.isInCurrentWeek(item.date)
        );
        this.expensesChanged.next(filteredExpensesByWeek);
        break;
      case 'month':
        const filteredExpensesByMonth = this.expenses.filter(
          (item) => item.date.getMonth() === new Date().getMonth()
        );
        this.expensesChanged.next(filteredExpensesByMonth);
        break;
      case 'all':
        this.expensesChanged.next(this.expenses);
        break;
      default:
        return;
    }
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
