import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpensesService } from 'src/app/services/expenses.service';
import { loadExpenses, loadExpensesSuccess } from './expenses.actions';
import { from } from 'rxjs';
import { switchMap, map, exhaustMap, toArray } from 'rxjs/operators';
@Injectable()
export class ExpensesEffects {
  constructor(
    private actions$: Actions,
    private expensesService: ExpensesService
  ) {}

  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExpenses),
      exhaustMap(() =>
        from(this.expensesService.getExpenses()).pipe(
          toArray(),
          map((expenses) => loadExpensesSuccess({ expenses }))
        )
      )
    )
  );
}
