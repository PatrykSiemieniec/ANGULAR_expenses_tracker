import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ExpensesModule } from './modules/expenses.module';
import { CategoriesModule } from './modules/categories.module';
import { SummaryModule } from './modules/summary.module';
import { SettingsModule } from './modules/settings.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';

import { expensesReducer } from './store/expenses/expenses.reducer';
import { ExpensesEffects } from './store/expenses/expenses.effects';
import { settingsReducer } from './store/settings/settings.reducer';
import { categoriesReducer } from './store/categories/categories.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExpensesModule,
    CategoriesModule,
    SummaryModule,
    FormsModule,
    SettingsModule,
    StoreModule.forRoot({
      expenses: expensesReducer,
      categories: categoriesReducer,
      settings: settingsReducer,
    }),
    EffectsModule.forRoot([ExpensesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
