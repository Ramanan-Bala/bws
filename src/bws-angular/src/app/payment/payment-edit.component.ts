import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Broker, Payment, ToBePaid } from '../_models';
import { toDateString } from '../_helpers';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css'],
})
export class PaymentEditComponent implements OnInit {
  id = undefined;
  title: string;

  brokerId: number = null;
  paymentField: string = null;
  toBePaid: number;

  validateForm!: FormGroup;
  submitted = false;

  disabled = true;

  brokers: Broker[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private client: HttpClient
  ) {
    this.id = this.route.snapshot.params.id;
    this.validateForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      paymentField: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]],
      paymentAmount: ['', [Validators.required]],
    });

    if (this.id === undefined) {
      this.disabled = false;
    }

    this.client
      .get<Broker[]>('https://localhost:5001/broker')
      .subscribe((res) => {
        this.brokers = res;
      });

    // tslint:disable-next-line: triple-equals
  }

  ngOnInit(): void {
    // tslint:disable-next-line: typedef
    if (this.id == undefined) {
      this.title = 'Add payment';
      this.f.paymentDate.setValue(toDateString(new Date()));
    } else if (this.id >= 0) {
      this.title = 'Edit payment';
      this.client
        .get<Payment>('https://localhost:5001/Payment/' + this.id)
        .subscribe((res) => {
          this.f.brokerId.setValue(res.brokerId);
          this.f.paymentField.setValue(res.paymentField);
          this.f.paymentDate.setValue(res.paymentDate);
          this.f.paymentAmount.setValue(res.paymentAmount);
          this.paymentField = res.paymentField;
          this.brokerId = res.brokerId;
          this.client
            .get<ToBePaid>(
              `https://localhost:5001/payment/balance/${this.brokerId}/${this.paymentField}`
            )
            // tslint:disable-next-line: no-shadowed-variable
            .subscribe((res) => {
              this.toBePaid = res.balance;
            });
        });
    }
  }

  bId(result: number): void {
    this.brokerId = result;
    if (this.brokerId != null && this.paymentField != null) {
      this.client
        .get<ToBePaid>(
          `https://localhost:5001/payment/balance/${this.brokerId}/${this.paymentField}`
        )
        .subscribe((res) => {
          this.toBePaid = res.balance;
        });
    }
  }

  pField(result: string): void {
    this.paymentField = result;
    if (this.brokerId != null && this.paymentField != null) {
      this.client
        .get<ToBePaid>(
          `https://localhost:5001/payment/balance/${this.brokerId}/${this.paymentField}`
        )
        .subscribe((res) => {
          this.toBePaid = res.balance;
        });
    }
  }

  onChange(): void {
    if (this.brokerId != null && this.paymentField != null) {
      this.client
        .get<ToBePaid>(
          `https://localhost:5001/payment/balance/${this.brokerId}/${this.paymentField}`
        )
        .subscribe((res) => {
          this.toBePaid = res.balance;
        });
    }
  }

  compareFun(b1: number | string, b2: number): boolean {
    if (b1) {
      // console.log('compare', b1, b2, typeof b1);
      return b1 === b2; // typeof b1 === 'string' ? b1 === b2.brokerName : b1.id === b2.id;
    } else {
      return false;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validateForm.controls;
  }

  submitForm(): void {
    this.submitted = true;

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // console.log(this.f.billDate.value);

    if (this.validateForm.invalid) {
      return;
    } else {
      // tslint:disable-next-line: triple-equals
      if (this.id == undefined) {
        const data: Payment = {
          brokerId: this.f.brokerId.value,
          paymentField: this.f.paymentField.value,
          paymentDate: toDateString(this.f.paymentDate.value),
          paymentAmount: this.f.paymentAmount.value,
        };
        console.log('Date', data.paymentDate);
        this.client
          .post('https://localhost:5001/payment', data)
          .subscribe((_) => {
            this.router.navigate(['/payment']);
            this.message.create('success', `Payment Successfully Added`);
          });
      } else {
        const data: Payment = {
          id: this.id,
          brokerId: this.f.brokerId.value,
          paymentField: this.f.paymentField.value,
          paymentDate: toDateString(this.f.paymentDate.value),
          paymentAmount: this.f.paymentAmount.value,
        };
        // console.log('EDIT', data.brokerId);
        this.client
          .put('https://localhost:5001/Payment/' + this.id, data)
          .subscribe((_) => {
            this.router.navigate(['/payment']);
            this.message.create('success', `Payment Successfully Edited`);
          });
      }
    }
  }
  cancelForm(): void {
    this.router.navigate(['/payment']);
  }
}
