import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEditComponent } from '../components/expenses/expenses-edit/expenses-edit.component';
import { ExpensesComponent } from '../components/expenses/expenses.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'expenses',
    component: ExpensesComponent,
    children: [
      {
        path: 'new',
        component: ExpensesEditComponent,
      },
      {
        path: ':id/edit',
        component: ExpensesEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ExpensesComponent, ExpensesEditComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ExpensesComponent, ExpensesEditComponent],
})
export class ExpensesModule {}
