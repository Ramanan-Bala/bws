import { from } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { toDateString } from '../_helpers';
import { Broker, Calculation, Payment } from '../_models';
import { differenceInCalendarDays, format } from 'date-fns';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  loading = false;

  date = null;
  from = format(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
  to = format(new Date(), 'yyyy-MM-dd');

  submitted = false;
  validateForm!: FormGroup;

  brokerId: number;
  paymentField: string;

  brokers: Broker[] = [];
  payment: Payment[] = [];
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
    // tslint:disable-next-line: semicolon
  };

  constructor(
    private client: HttpClient,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      field: ['', [Validators.required]],
      rangePicker: ['', [Validators.required]],
    });
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
    this.f.brokerId.setValue(0);
    this.f.field.setValue('COMMN');
    this.f.rangePicker.setValue([this.from, this.to]);
    this.client
      .get<Payment[]>(
        `https://localhost:5001/payment?id=0&paymentField=COMMN&from=${this.from}&to=${this.to}`
      )
      .subscribe((res) => {
        this.payment = res;
      });
  }

  onChange(result: any): void {
    if (result.length > 0) {
      //  this.fromDate = format(result[0] - 4, 'yyyy-mm-dd');
      this.from = format(result[0], 'yyyy-MM-dd');
      this.to = format(result[1], 'yyyy-MM-dd');
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validateForm.controls;
  }

  loadData(): void {
    this.client
      .get<Payment[]>(
        `https://localhost:5001/payment?id=${this.brokerId}&paymentField=${this.paymentField}&from=${this.from}&to=${this.to}`
      )
      .subscribe((res) => {
        // console.log('payment Get', res);
        this.payment = res;
      });
  }

  onSubmit(): void {
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
        .post<Calculation[]>('https://localhost:5001/calculation/Update', {
          calcField: this.paymentField,
          brokerId: this.brokerId,
          from: this.from,
          to: this.to,
        })
        .subscribe((res) => {
          console.log('Calculated and posted', res);
          this.loadData();
        });
    }
  }

  delData(id: number): void {
    this.client
      .delete(`https://localhost:5001/Payment/${id}`)
      .subscribe((_) => {
        this.loadData();
      });
    this.message.create('success', `Payment Successfully Deleted`);
  }
}
