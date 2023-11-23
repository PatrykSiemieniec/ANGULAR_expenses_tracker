import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import {
  addCategory,
  deleteCategory,
  editCategory,
  initCategories,
} from './categories.actions';

export const initialState: Category[] = [];

export const categoriesReducer = createReducer(
  initialState,
  on(initCategories, (state) => {
    const prevCategories = localStorage.getItem('categories');

    let updatedCategories;
    if (prevCategories) {
      updatedCategories = JSON.parse(prevCategories);
    } else {
      updatedCategories = initialState;
      localStorage.setItem('categories', JSON.stringify(initialState));
    }
    state = updatedCategories;
    return state;
  }),
  on(addCategory, (state, { category }) => {
    const newIndex = state.length;
    const newCategory: Category = {
      ID: newIndex,
      name: category,
    };
    const updatedCategories = [...state, newCategory];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    return updatedCategories;
  }),
  on(deleteCategory, (state, { ID }) => {
    const updatedState = state
      .filter((category) => category.ID !== ID)
      .map((category, index) => ({
        ...category,
        ID: index,
      }));
    localStorage.setItem('categories', JSON.stringify(updatedState));
    return updatedState;
  }),
  on(editCategory, (state, { idToEdit, editedCategory }) => {
    const updatedState = state.map((category, index) => {
      if (index === idToEdit) {
        return {
          ...category,
          name: editedCategory,
        };
      }
      return category;
    });

    localStorage.setItem('categories', JSON.stringify(updatedState));
    return updatedState;
  })
);
