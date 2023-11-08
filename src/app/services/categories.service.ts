import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Subject, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCategories } from '../store/categories/setCategories.actions';
import { getCategories } from '../store/categories/getCategories.actions';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: Category[] = [
    new Category(0, 'Electronics'),
    new Category(1, 'Food'),
    new Category(2, 'Home'),
    new Category(3, 'Fuel'),
    new Category(4, 'Other'),
    new Category(5, 'Restaurant'),
    new Category(6, 'Going out'),
  ];
  categoriesChanges = new Subject<Category[]>();
  lastId: number = this.categories?.length - 1;

  constructor(private store: Store<{ getCategories: Category[] }>) {
    this.store.dispatch(getCategories());
    this.store
      .select('getCategories')
      .pipe(
        map((category) => {
          return category.map(
            (category) => new Category(category.ID, category.name)
          );
        })
      )
      .subscribe((categories) => (this.categories = categories));
  }

  getCategories() {
    return this.categories.slice();
  }
  addCategory(category: string) {
    this.resetId();
    if (category) {
      const newCategories = new Category(this.lastId + 1, category);
      this.store.dispatch(setCategories({ newCategory: newCategories }));
      this.store.dispatch(getCategories());
      this.categoriesChanges.next(this.categories.slice());
      // this.categories.push();
    }
  }
  editCategory(ID: number, newCategory: string) {
    this.categories[ID].name = newCategory;
    this.categoriesChanges.next(this.categories.slice());
  }
  deleteCategory(index: number) {
    const oneExpenseDeleted = this.categories.filter(
      (item) => item.ID !== index
    );

    this.categories = oneExpenseDeleted;
    this.resetId();

    this.categoriesChanges.next(this.categories.slice());
  }
  deleteCategories(indexes: number[]) {
    const multipleExpensesDeleted = this.categories.filter(
      (category) => !indexes.includes(category.ID)
    );

    this.categories = multipleExpensesDeleted;
    this.resetId();
    this.categoriesChanges.next(this.categories.slice());
  }

  private resetId() {
    const newCategories = this.categories.map(
      (category, index) => new Category(index, category.name)
    );
    this.lastId = this.categories.length - 1;
    this.categories = newCategories;
  }
}
