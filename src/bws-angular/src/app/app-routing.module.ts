import { PaymentEditComponent } from './payment/payment-edit.component';
import { PaymentComponent } from './payment/payment.component';
import { CalculationComponent } from './calculation/calculation.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrokersComponent } from './brokers/brokers.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { BrokerEditComponent } from './brokers/broker-edit.component';
import { SalesSummaryEditComponent } from './sales-summary/sales-summary-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'brokers', component: BrokersComponent },
      { path: 'brokers/add', component: BrokerEditComponent },
      { path: 'brokers/edit/:id', component: BrokerEditComponent },
      { path: 'summary', component: SalesSummaryComponent },
      { path: 'summary/add', component: SalesSummaryEditComponent },
      { path: 'summary/edit/:id', component: SalesSummaryEditComponent },
      {
        path: 'calculation',
        children: [
          {
            path: 'COMMN',
            component: CalculationComponent,
          },
          {
            path: 'BONUS',
            component: CalculationComponent,
          },
        ],
      },
      { path: 'payment', component: PaymentComponent },
      { path: 'payment/add', component: PaymentEditComponent },
      { path: 'payment/edit/:id', component: PaymentEditComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
