import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ExpensesService } from '../../services/expenses.service';

import {
  loadExpenses,
  removeExpense,
} from 'src/app/store/expenses/expenses.actions';

import {
  selectAllExpenses,
  selectFilteredExpenses,
  selectFilteredExpensesByTime,
} from 'src/app/store/expenses/expenses.selectors';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit, OnDestroy {
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
    this.allExpenses$ = this.store.select(
      selectFilteredExpenses(this.filterValue)
    );
  }

  onSelectFilterTime(time: string) {
    this.allExpenses$ = this.store.select(selectFilteredExpensesByTime(time));
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
