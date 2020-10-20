import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BrokerComponent } from './brokers/broker.component';

const routes: Routes = [{ path: '', component: BrokerComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
