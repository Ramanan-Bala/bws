import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { toDateString } from '../_helpers';
import { Broker, Payment } from '../_models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  loading = false;
  hideTable = false;

  brokerId: number;
  paymentField: string;
  date = null;
  from: string;
  to: string;

  brokers: Broker[] = [];
  payment: Payment[] = [];

  constructor(private client: HttpClient) {
    const broker: Broker = {
      id: 0,
      brokerName: 'All',
    };
    this.client
      .get<Broker[]>('https://localhost:5001/broker')
      .subscribe((res) => {
        this.brokers = [broker, ...res];
      });
  }

  ngOnInit(): void {}

  loadData(): void {
    this.client
      .get<Payment[]>(
        `https://localhost:5001/payment?id=${this.brokerId}&paymentField=${this.paymentField}&from=${this.from}&to=${this.to}`
      )
      .subscribe((res) => {
        this.payment = res;
        this.hideTable = true;
        // console.log(this.payment);
      });
  }

  delData(id: number): void {}

  onChange(result: any): void {
    this.from = toDateString(result[0]);
    this.to = toDateString(result[1]);
  }
}
