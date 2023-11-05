import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('newCategory') newCategory!: ElementRef;
  categories!: Category[];
  categoriesForm!: FormGroup;
  selectedCategories: number[] = [];
  isEditingStarted = false;
  idToEdit!: number;
  categoryNameToEdit!: string;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
    this.categoriesService.categoriesChanges.subscribe((categories) => {
      this.categories = categories;
      this.updateFormControls();
    });
    this.updateFormControls();
  }

  private updateFormControls() {
    const formControls: { [key: string]: FormControl } = {};
    this.categories.forEach((category) => {
      formControls[category.ID] = new FormControl(false);
    });

    this.categoriesForm = new FormGroup(formControls);
  }

  onEditCategory(ID: number, newCategory: HTMLInputElement) {
    this.isEditingStarted = true;
    this.idToEdit = ID;
    this.categoryNameToEdit = newCategory.value;
  }
  onConfirmEditing() {
    this.categoriesService.editCategory(this.idToEdit, this.categoryNameToEdit);
    this.isEditingStarted = false;
  }

  onDelete() {
    this.selectedCategories = Object.keys(this.categoriesForm.value)
      .filter((key) => this.categoriesForm.value[key])
      .map((key) => parseInt(key));

    if (this.selectedCategories.length > 1) {
      this.categoriesService.deleteCategories(this.selectedCategories);
    } else if (this.selectedCategories.length === 1) {
      this.categoriesService.deleteCategory(this.selectedCategories[0]);
    }
  }

  onAdd() {
    this.categoriesService.addCategory(this.newCategory.nativeElement.value);
  }
}
