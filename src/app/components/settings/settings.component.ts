import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Budget, SettingsService } from '../../services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(private settingsService: SettingsService) {}

  @ViewChild('settings') settingsForm!: NgForm;

  monthlyBudgetSubscription!: Subscription

  monthly!: number;
  weekly!: number;
  daily!: number;

  onSubmit() {
    this.settingsService.setSettings(this.settingsForm.value.monthly);
  }

  ngOnInit(): void {
    this.monthlyBudgetSubscription = this.settingsService.monthly.subscribe((budget: Budget) => {
      this.monthly = budget.monthly;
      this.weekly = budget.weekly;
      this.daily = budget.daily;
    });
  }
  ngOnDestroy(): void {
      this.monthlyBudgetSubscription.unsubscribe()
  }
}
