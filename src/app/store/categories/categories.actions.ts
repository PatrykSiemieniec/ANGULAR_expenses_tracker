import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

export const initCategories = createAction('[Categories Page] Init Categories');

export const addCategory = createAction(
  '[Categories Page] Add Category',
  props<{ category: string }>()
);
export const deleteCategory = createAction(
  '[Categories Page] Delete Category',
  props<{ ID: number }>()
);
export const editCategory = createAction(
  '[Categories Page] Delete Category',
  props<{ idToEdit: number; editedCategory: string }>()
);
