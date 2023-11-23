import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Settings } from 'src/app/models/settings.model';

export const selectSettingsState = (state: AppState): Settings =>
  state.settings;

export const selectSettings = createSelector(
  selectSettingsState,
  (settings: Settings) => settings
);
export const selectBudget = createSelector(
  selectSettingsState,
  (settings: Settings) => settings.budget
);
export const selectCurrency = createSelector(
  selectSettingsState,
  (settings: Settings) => settings.currency
);

export const selectCalculatedBudgets = createSelector(
  selectSettingsState,
  (settings: Settings) => {
    const monthly = settings.budget ? settings.budget : 0;

    const weekly = monthly / 4;
    const daily = +(monthly / 30).toFixed(2);

    return { monthly, weekly, daily };
  }
);
