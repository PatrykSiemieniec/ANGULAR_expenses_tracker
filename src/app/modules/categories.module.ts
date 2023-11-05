import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../components/categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
