import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrokerComponent } from './brokers/broker.component';

import { AppRoutingModule } from './app-routing.module';

import { SearchfilterPipe } from './brokers/searchfilter.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [AppComponent, BrokerComponent, SearchfilterPipe],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    OrderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
