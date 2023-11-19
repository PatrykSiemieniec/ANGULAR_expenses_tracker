import { Component, OnDestroy, OnInit } from '@angular/core';

import { Budget, SettingsService } from '../../services/settings.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDailyExpenses,
  selectExpensesPrices,
  selectMonthExpenses,
  selectWeekExpenses,
} from 'src/app/store/expenses/expenses.selectors';
import { loadExpenses } from 'src/app/store/expenses/expenses.actions';
import { AppState } from 'src/app/store/app.state';
import {
  CalculatedBudget,
  calculateBudget,
} from 'src/app/shared/calculate-budget';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private store: Store<AppState>
  ) {}

  totalExpenses$!: Observable<number>;
  monthlyExpenses$!: Observable<number>;
  weeklyExpenses$!: Observable<number>;
  dailyExpenses$!: Observable<number>;

  budget!: Budget;

  monthlyBudget!: CalculatedBudget;
  weeklyBudget!: CalculatedBudget;
  dailyBudget!: CalculatedBudget;

  ngOnInit(): void {
    this.store.dispatch(loadExpenses());
    this.totalExpenses$ = this.store.select(selectExpensesPrices);
    this.monthlyExpenses$ = this.store.select(selectMonthExpenses);
    this.weeklyExpenses$ = this.store.select(selectWeekExpenses);
    this.dailyExpenses$ = this.store.select(selectDailyExpenses);

    this.budget = this.settingsService.getSettings();

    this.monthlyExpenses$.subscribe((monthlyExpense) => {
      this.monthlyBudget = calculateBudget(this.budget.monthly, monthlyExpense);
    });

    this.weeklyExpenses$.subscribe((weeklyExpense) => {
      this.weeklyBudget = calculateBudget(this.budget.weekly, weeklyExpense);
    });

    this.dailyExpenses$.subscribe((dailyExpense) => {
      this.dailyBudget = calculateBudget(this.budget.weekly, dailyExpense);
    });
  }
}
