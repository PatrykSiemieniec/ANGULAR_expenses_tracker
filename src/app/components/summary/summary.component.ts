import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatedBudget, SummaryService } from '../../services/summary.service';
import { Budget, SettingsService } from '../../services/settings.service';
import { ExpensesService } from '../../services/expenses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  constructor(
    private summaryService: SummaryService,
    private settingsService: SettingsService,
    private expenseService: ExpensesService
  ) {}

  totalExpensesSub!: Subscription;
  monthlyExpensesSub!: Subscription;
  weeklyExpensesSub!: Subscription;
  dailyExpensesSub!: Subscription;

  totalExpenses$!: number;
  monthlyExpenses$!: number;
  weeklyExpenses$!: number;
  dailyExpenses$!: number;

  budget!: Budget;

  monthlyBudget!: CalculatedBudget;
  weeklyBudget!: CalculatedBudget;
  dailyBudget!: CalculatedBudget;

  ngOnInit(): void {
    this.totalExpensesSub = this.expenseService.sumOfPrices.subscribe(
      (prices: number) => {
        this.totalExpenses$ = prices;
      }
    );
    this.dailyExpensesSub = this.expenseService.sumOfDailyPrices.subscribe(
      (prices: number) => {
        this.dailyExpenses$ = prices;
      }
    );
    this.weeklyExpensesSub = this.expenseService.sumOfWeeklyPrices.subscribe(
      (prices: number) => {
        this.weeklyExpenses$ = prices;
      }
    );
    this.monthlyExpensesSub = this.expenseService.sumOfMonthlyPrices.subscribe(
      (prices: number) => {
        this.monthlyExpenses$ = prices;
      }
    );

    this.budget = this.settingsService.getSettings();

    this.monthlyBudget = this.summaryService.calculateBudget(
      this.budget.monthly,
      this.monthlyExpenses$
    );
    this.weeklyBudget = this.summaryService.calculateBudget(
      this.budget.weekly,
      this.weeklyExpenses$
    );
    this.dailyBudget = this.summaryService.calculateBudget(
      this.budget.daily,
      this.dailyExpenses$
    );
  }
  ngOnDestroy(): void {
    this.totalExpensesSub.unsubscribe();
    this.monthlyExpensesSub.unsubscribe();
    this.weeklyExpensesSub.unsubscribe();
    this.dailyExpensesSub.unsubscribe();
  }
}
