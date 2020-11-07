import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  date = null;

  submitted = false;
  validateForm!: FormGroup;

  brokerId: number;
  paymentField: string;
  from: string;
  to: string;

  brokers: Broker[] = [];
  payment: Payment[] = [];

  constructor(
    private client: HttpClient,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {
    if (this.brokers.length > 0) {
      this.hideTable = true;
    }
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      field: ['', [Validators.required]],
      rangePicker: ['', [Validators.required]],
    });
  }

  onChange(result: any): void {
    this.from = toDateString(result[0]);
    this.to = toDateString(result[1]);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validateForm.controls;
  }

  loadData(): void {
    this.submitted = true;

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    } else {
      this.brokerId = this.f.brokerId.value;
      this.paymentField = this.f.field.value;
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
  }

  delData(id: number): void {
    this.client
      .delete(`https://localhost:5001/Payment/${id}`)
      .subscribe((_) => {
        this.loadData();
      });
    this.message.create('success', `Summary Successfully Deleted`);
  }
}
