import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ExpensesModule } from './modules/expenses.module';
import { CategoriesModule } from './modules/categories.module';
import { SummaryModule } from './modules/summary.module';

import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FormsModule } from '@angular/forms';
import { SettingsModule } from './modules/settings.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { expensesReducer } from './store/expenses/expenses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './store/expenses/expenses.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExpensesModule,
    CategoriesModule,
    SummaryModule,
    FormsModule,
    SettingsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      expenses: expensesReducer,
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
