import { createReducer, on } from '@ngrx/store';
import { getCategories } from '../categories/getCategories.actions';
import { Category } from 'src/app/models/category.model';

const initialState: Category[] = [];
export const getCategoriesReducer = createReducer(
  initialState,
  on(getCategories, (state) => {
    const fetchedCategories = localStorage.getItem('categories');
    if (fetchedCategories === null) {
      return [];
    } else {
      const categories = JSON.parse(fetchedCategories);
      return [...categories];
    }
  })
);
