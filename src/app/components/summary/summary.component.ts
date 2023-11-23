import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import {
  selectDailyExpenses,
  selectExpensesPrices,
  selectMonthExpenses,
  selectWeekExpenses,
} from 'src/app/store/expenses/expenses.selectors';
import { selectCalculatedBudgets } from 'src/app/store/settings/settings.selectors';

import { loadExpenses } from 'src/app/store/expenses/expenses.actions';
import { initSettings } from 'src/app/store/settings/settings.actions';

import { calculateBudget } from 'src/app/shared/calculate-budget';
import { Budget, CalculatedBudget } from 'src/app/shared/types';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  totalExpenses$!: Observable<number>;
  monthlyExpenses$!: Observable<number>;
  weeklyExpenses$!: Observable<number>;
  dailyExpenses$!: Observable<number>;
  budget$!: Observable<Budget>;

  monthlyBudget!: CalculatedBudget;
  weeklyBudget!: CalculatedBudget;
  dailyBudget!: CalculatedBudget;
  budget!: Budget;

  budgetSubscription!: Subscription;
  monthlyBudgetSubscription!: Subscription;
  weeklyBudgetSubscription!: Subscription;
  dailyBudgetSubscription!: Subscription;

  ngOnInit(): void {
    this.store.dispatch(loadExpenses());
    this.store.dispatch(initSettings());
    this.totalExpenses$ = this.store.select(selectExpensesPrices);
    this.monthlyExpenses$ = this.store.select(selectMonthExpenses);
    this.weeklyExpenses$ = this.store.select(selectWeekExpenses);
    this.dailyExpenses$ = this.store.select(selectDailyExpenses);
    this.budget$ = this.store.select(selectCalculatedBudgets);

    this.budgetSubscription = this.budget$.subscribe((budget) => {
      this.budget = budget;
    });

    this.monthlyBudgetSubscription = this.monthlyExpenses$.subscribe(
      (monthlyExpense) => {
        this.monthlyBudget = calculateBudget(
          this.budget.monthly,
          monthlyExpense
        );
      }
    );

    this.weeklyBudgetSubscription = this.weeklyExpenses$.subscribe(
      (weeklyExpense) => {
        this.weeklyBudget = calculateBudget(this.budget.weekly, weeklyExpense);
      }
    );

    this.dailyBudgetSubscription = this.dailyExpenses$.subscribe(
      (dailyExpense) => {
        this.dailyBudget = calculateBudget(this.budget.weekly, dailyExpense);
      }
    );
  }

  ngOnDestroy(): void {
    this.budgetSubscription.unsubscribe();
    this.monthlyBudgetSubscription.unsubscribe();
    this.weeklyBudgetSubscription.unsubscribe();
    this.dailyBudgetSubscription.unsubscribe();
  }
}
