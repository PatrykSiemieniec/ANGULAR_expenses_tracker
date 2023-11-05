import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Budget{
    monthly: number,
    weekly: number,
    daily: number
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  monthly = new BehaviorSubject<Budget>(this.getSettings());

  setSettings(monthlyBudget: number) {
    localStorage.setItem('monthlyBudget', JSON.stringify(monthlyBudget));
    this.monthly.next(this.calculateWeeklyAndDaily(monthlyBudget));
  }
  getSettings() {
    const storedMonthlyBudget = localStorage.getItem('monthlyBudget');
    let budget;
    if (storedMonthlyBudget) {
      budget = JSON.parse(storedMonthlyBudget);
    }
    return this.calculateWeeklyAndDaily(budget);
  }

  private calculateWeeklyAndDaily(monthlyBudget: number) {
    const weekly = monthlyBudget / 4;
    const daily = +(monthlyBudget / 30).toFixed(2)

    return {monthly: monthlyBudget, weekly, daily};
  }
}
