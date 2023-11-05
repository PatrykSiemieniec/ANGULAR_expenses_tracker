import { Injectable } from '@angular/core';


export interface CalculatedBudget {
  budgetPercent: number;
  budgetPercentString: string;
  isMoreThanBudget: boolean;
  isCloseToBudget: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  calculateBudget(budget: number, totalExpenses: number): CalculatedBudget {
    const budgetPercent = parseFloat(
      ((totalExpenses / budget) * 100).toFixed(2)
    );
    const budgetPercentString =
      ((totalExpenses / budget) * 100).toFixed(2).toString() + '%';

    const isMoreThanBudget = totalExpenses > budget;
    const isCloseToBudget = budgetPercent > 75;

    return {
      budgetPercent,
      budgetPercentString,
      isMoreThanBudget,
      isCloseToBudget,
    };
  }
}
