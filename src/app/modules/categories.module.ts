import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../components/categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriesItemComponent } from '../components/categories/categories-item/categories-item.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];

@NgModule({
  declarations: [CategoriesComponent, CategoriesItemComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
