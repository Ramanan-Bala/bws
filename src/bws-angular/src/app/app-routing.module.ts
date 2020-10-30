import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrokersComponent } from './brokers/brokers.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'brokers', component: BrokersComponent },
      { path: 'brokers/add', component: AddEditComponent },
      { path: 'brokers/edit/:id', component: AddEditComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
