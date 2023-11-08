import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

export const setCategories = createAction(
  '[Set Categories] SetCategory',
  props<{ newCategory: Category }>()
);

