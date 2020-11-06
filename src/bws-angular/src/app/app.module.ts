import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { BrokersComponent } from './brokers/brokers.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { BrokerEditComponent } from './brokers/broker-edit.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';

import { AppRoutingModule } from './app-routing.module';

import { BrokerSearchPipe, SalesSearchPipe } from './_pipes';

import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { SalesSummaryEditComponent } from './sales-summary/sales-summary-edit.component';
import { CalculationComponent } from './calculation/calculation.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentEditComponent } from './payment/payment-edit.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    BrokersComponent,
    BrokerSearchPipe,
    SalesSearchPipe,
    DefaultLayoutComponent,
    BrokerEditComponent,
    SalesSummaryComponent,
    SalesSummaryEditComponent,
    CalculationComponent,
    PaymentComponent,
    PaymentEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgZorroAntdModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
