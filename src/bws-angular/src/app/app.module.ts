import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { BrokersComponent } from './brokers/brokers.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { BrokerEditComponent } from './brokers/broker-edit.component';

import { AppRoutingModule } from './app-routing.module';

import { SearchfilterPipe } from './_pipes/searchfilter.pipe';

import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NZ_I18N } from 'ng-zorro-antd/i18n';
//import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    BrokersComponent,
    SearchfilterPipe,
    DefaultLayoutComponent,
    BrokerEditComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
