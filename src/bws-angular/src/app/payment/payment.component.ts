import { Component, OnInit } from '@angular/core';
import { Payment } from '../_models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  loading = false;
  payment: Payment[] = [];
  constructor() {}

  ngOnInit(): void {}
  delData(id: number): void {}
}
