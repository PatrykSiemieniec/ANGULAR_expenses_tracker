import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expenses.model';
import { Observable, Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadExpenses,
  removeExpense,
} from 'src/app/store/expenses/expenses.action';
import { AppState } from 'src/app/store/app.state';
import { selectAllExpenses } from 'src/app/store/expenses/expenses.selectors';

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

  allExpenses$ = this.store.select(selectAllExpenses);

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formSubscription = this.expensesService.isFormOpen.subscribe(
      (isEditMode) => {
        this.isFormOpened = isEditMode;
      }
    );
    this.store.dispatch(loadExpenses());
  }
  onRemove(index: number) {
    this.store.dispatch(removeExpense({ id: index }));
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
    this.formSubscription.unsubscribe();
  }
}
