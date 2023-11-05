import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expenses.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  expenses!: Expense[];
  expenseSubscription!: Subscription;
  formSubscription!: Subscription;
  isFormOpened = false;
  filterValue: string = '';

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.expenseSubscription = this.expensesService.expensesChanged.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
      }
    );
    this.expenses = this.expensesService.getExpenses();

    this.formSubscription = this.expensesService.isFormOpen.subscribe(
      (isEditMode) => {
        this.isFormOpened = isEditMode;
      }
    );
  }
  onRemove(index: number) {
    this.expensesService.removeExpense(index);
  }
  onAddExpense() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
    });
    this.expensesService.isFormOpen.next(true);
  }
  onStartEditing(index: number) {
    this.router.navigate([index, 'edit'], { relativeTo: this.route });
    this.expensesService.isFormOpen.next(true);
  }
  filterExpenses() {
    this.expensesService.filterExpense(this.filterValue);
  }
  onSelectFilterTime(time: string) {
    this.expensesService.filterExpenseByTime(time);
  }
  ngOnDestroy(): void {
    // this.expenseSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }
}
