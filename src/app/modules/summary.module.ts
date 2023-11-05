import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../components/summary/summary.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'summary',
    component: SummaryComponent,
  },
];

@NgModule({
  declarations: [SummaryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SummaryModule {}
