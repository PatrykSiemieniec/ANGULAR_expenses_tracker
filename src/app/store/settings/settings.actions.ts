import { createAction, props } from '@ngrx/store';

export const initSettings = createAction('[Settings Page] Init Settings');

export const setBudget = createAction(
  '[Settings Page] Set Budget',
  props<{ budget: number }>()
);

export const setCurrency = createAction(
  '[Settings Page] Set Currency',
  props<{ currency: string }>()
);
