import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import { Category } from '../../models/category.model';

import {
  addCategory,
  initCategories,
} from 'src/app/store/categories/categories.actions';
import { selectAllCategories } from 'src/app/store/categories/categories.selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('newCategory') newCategory!: ElementRef<HTMLInputElement>;

  categories$ = this.store.select(selectAllCategories);
  categories!: Category[];

  avoidDuplicationMsg: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(initCategories());
    this.categories$.subscribe((categories) => (this.categories = categories));
  }

  onAdd() {
    const newCategory = this.newCategory.nativeElement.value;

    const isCategoryDuplicate = this.categories
      .map((item) => item.name)
      .includes(newCategory);

    if (isCategoryDuplicate) {
      this.avoidDuplicationMsg = `Category of name ${newCategory} exists. `;
      return;
    }
    this.avoidDuplicationMsg = '';
    this.store.dispatch(addCategory({ category: newCategory }));
  }
  onChange() {
    this.avoidDuplicationMsg = '';
  }
}
