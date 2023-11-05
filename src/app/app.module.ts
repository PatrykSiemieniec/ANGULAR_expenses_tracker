import { NgModule } from '@angular/core';
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
import { setLocalStorgeReducer } from './store/setLocalStorage.reducer';
import { getLocalStorgeReducer } from './store/getLocalStorage.reducer';

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
      setLocalStorage: setLocalStorgeReducer,
      getLocalStorage: getLocalStorgeReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
