import { createReducer, on } from '@ngrx/store';
import { Settings } from 'src/app/models/settings.model';
import { initSettings, setBudget, setCurrency } from './settings.actions';

export const initialState: Settings = {
  currency: 'PLN',
  budget: 0,
};

export const settingsReducer = createReducer(
  initialState,
  on(initSettings, (state) => {
    const prevSettings = localStorage.getItem('settings');
    let updatedSettings;
    if (prevSettings) {
      updatedSettings = JSON.parse(prevSettings);
    } else {
      updatedSettings = initialState;
      localStorage.setItem('settings', JSON.stringify(initialState));
    }
    return updatedSettings;
  }),
  on(setBudget, (state, { budget }) => {
    const updatedSettings = { ...state, budget };
    localStorage.setItem('settings', JSON.stringify(updatedSettings));

    return { ...state, budget };
  }),
  on(setCurrency, (state, { currency }) => {
    const updatedSettings = { ...state, currency };
    localStorage.setItem('settings', JSON.stringify(updatedSettings));

    return { ...state, currency };
  })
);
