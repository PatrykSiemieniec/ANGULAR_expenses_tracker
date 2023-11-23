import { createReducer, on } from '@ngrx/store';
import { Settings } from 'src/app/models/settings.model';
import { initSettings, setBudget, setCurrency } from './settings.actions';

export const initialState: Settings = {
  currency: 'PLN',
  budget: 1000,
};

export const settingsReducer = createReducer(
  initialState,
  on(initSettings, (state) => {
    const prevSettings = localStorage.getItem('settings');

    if (prevSettings) {
      state = JSON.parse(prevSettings);
    } else {
      state = initialState;
      localStorage.setItem('settings', JSON.stringify(initialState));
    }

    return state;
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
