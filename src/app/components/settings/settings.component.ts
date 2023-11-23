import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import { NgForm } from '@angular/forms';

import {
  selectCalculatedBudgets,
  selectCurrency,
  selectSettings,
} from 'src/app/store/settings/settings.selectors';
import {
  initSettings,
  setBudget,
  setCurrency,
} from 'src/app/store/settings/settings.actions';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  @ViewChild('settings') settingsForm!: NgForm;

  settings$ = this.store.select(selectSettings);
  budget$ = this.store.select(selectCalculatedBudgets);

  currency$ = this.store.select(selectCurrency);
  currencySubscription!: Subscription;

  selectedCurrency!: string;

  onSubmit() {
    this.store.dispatch(setBudget({ budget: this.settingsForm.value.monthly }));
  }
  onSelect() {
    this.store.dispatch(setCurrency({ currency: this.selectedCurrency }));
  }

  ngOnInit(): void {
    this.store.dispatch(initSettings());
    this.currencySubscription = this.currency$.subscribe(
      (currency) => (this.selectedCurrency = currency)
    );
  }
  ngOnDestroy(): void {
    this.currencySubscription.unsubscribe();
  }
}
