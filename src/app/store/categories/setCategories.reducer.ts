import { createReducer, on } from '@ngrx/store';
import { setCategories } from '../categories/setCategories.actions';
import { Category } from 'src/app/models/category.model';

const initialState: Category[] = [];
export const setCategoriesReducer = createReducer(
  initialState,
  on(setCategories, (state, { newCategory }) => {
    let prevCategories = localStorage.getItem('categories');
    let prevCategoriesParsed: Category[] = [];
    if (prevCategories) {
      prevCategoriesParsed = JSON.parse(prevCategories);
    }
    const expense = [...prevCategoriesParsed, newCategory];
    localStorage.setItem('categories', JSON.stringify(expense));
    return expense;
  })
);
