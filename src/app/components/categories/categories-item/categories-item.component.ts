import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import { Category } from 'src/app/models/category.model';

import {
  deleteCategory,
  editCategory,
} from 'src/app/store/categories/categories.actions';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css'],
})
export class CategoriesItemComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Input() category!: Category;
  isEditingStarted = false;
  originalCategoryName: string = '';
  editedCategoryName: string = '';

  onEditCategory() {
    this.isEditingStarted = true;
    this.originalCategoryName = this.category.name;
    console.log(this.category.name);
  }

  onDeleteCategory(idToDelete: number) {
    this.store.dispatch(deleteCategory({ ID: idToDelete }));
  }

  onSaveEditCategory(ID: number, name: HTMLInputElement) {
   console.log(ID)
    this.store.dispatch(
      editCategory({ idToEdit: ID, editedCategory: name.value })
    );
  }
  onCancelEditCategory() {
    this.editedCategoryName = this.originalCategoryName;
    this.isEditingStarted = false;
  }
  ngOnInit(): void {
    this.originalCategoryName = this.category.name;
    this.editedCategoryName = this.category.name;
  }
}
