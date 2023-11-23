export type Budget = {
  monthly: number;
  weekly: number;
  daily: number;
};
export type CalculatedBudget = {
  budgetPercent: number;
  budgetPercentString: string;
  isMoreThanBudget: boolean;
  isCloseToBudget: boolean;
};
