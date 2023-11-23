import { Category } from 'src/app/models/category.model';
import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectCategoriesState = (state: AppState): Category[] =>
  state.categories;

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (categories: Category[]) => categories
);
