import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import { ExpensesService } from '../../../services/expenses.service';
import { Category } from '../../../models/category.model';

import {
  addExpense,
  updateExpense,
} from 'src/app/store/expenses/expenses.actions';
import { initCategories } from 'src/app/store/categories/categories.actions';

import { selectExpenseByIndex } from 'src/app/store/expenses/expenses.selectors';
import { selectAllCategories } from 'src/app/store/categories/categories.selectors';

@Component({
  selector: 'app-expenses-edit',
  templateUrl: './expenses-edit.component.html',
  styleUrls: ['./expenses-edit.component.css'],
})
export class ExpensesEditComponent implements OnInit, OnDestroy {
  indexToEdit!: number;
  editMode = false;
  expensesForm!: FormGroup;
  categories$: Observable<Category[]> = this.store.select(selectAllCategories);
  categories!: Category[];
  routeSubscription!: Subscription;

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initCategories());
    this.categories$.subscribe((categories) => (this.categories = categories));

    this.expensesService.isFormOpen.next(true);
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.indexToEdit = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.expensesForm.valid) {
      if (this.editMode) {
        this.expensesService.isFormOpen.next(false);
        this.store.dispatch(
          updateExpense({
            newExpense: this.expensesForm.value,
            id: this.indexToEdit,
          })
        );

        this.router.navigate(['/expenses']);
      } else {
        this.expensesService.isFormOpen.next(false);
        this.store.dispatch(addExpense({ expense: this.expensesForm.value }));
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    }
  }

  private initForm() {
    let expenseName = '';
    let expensePrice = null;
    let expenseCategory = '';
    let expenseDescription: string | undefined = '';
    let expenseDate = new Date();
    if (this.editMode) {
      this.store
        .select(selectExpenseByIndex(this.indexToEdit))
        .subscribe((expense) => {
          if (expense) {
            expenseName = expense.name;
            expensePrice = expense.price;
            expenseCategory = expense.category;
            expenseDescription = expense?.description;
            expenseDate = expense.date;
          }
        });
    }

    this.expensesForm = new FormGroup({
      name: new FormControl(expenseName, Validators.required),
      price: new FormControl(expensePrice, [
        Validators.required,
        Validators.min(0),
      ]),
      category: new FormControl(expenseCategory),
      description: new FormControl(expenseDescription),
      date: new FormControl(expenseDate, Validators.required),
    });
  }
  onCancel() {
    this.router.navigate(['/expenses'], { relativeTo: this.route });
    this.editMode = false;
    this.expensesForm.reset();
  }
  ngOnDestroy(): void {
    this.expensesService.isFormOpen.next(false);
    this.routeSubscription.unsubscribe();
  }
}
