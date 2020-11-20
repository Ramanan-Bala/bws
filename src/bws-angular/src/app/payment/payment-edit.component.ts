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
import { differenceInCalendarDays, format } from 'date-fns';

import { environment } from '../../environments/environment';

import { Broker, Payment, Calculation, ToBePaid } from '../_models';
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

  confirmPayment = true;

  validateForm!: FormGroup;
  submitted = false;

  disabled = true;

  brokers: Broker[] = [];
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
    // tslint:disable-next-line: semicolon
  };

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
      .get<Broker[]>(`${environment.apiUrl}/brokers`)
      .subscribe((res) => {
        this.brokers = res;
      });

    // tslint:disable-next-line: triple-equals
  }

  ngOnInit(): void {
    // tslint:disable-next-line: triple-equals
    if (this.id == undefined) {
      this.title = 'Add payment';
      this.f.paymentDate.setValue(format(new Date(), 'yyyy-MM-dd'));
    } else if (this.id >= 0) {
      this.title = 'Edit payment';
      this.client
        .get<Payment>(`${environment.apiUrl}/payments/${this.id}`)
        .subscribe((res) => {
          this.f.brokerId.setValue(res.brokerId);
          this.f.paymentField.setValue(res.paymentField);
          this.f.paymentDate.setValue(res.paymentDate);
          this.f.paymentAmount.setValue(res.paymentAmount);
          this.paymentField = res.paymentField;
          this.brokerId = res.brokerId;
          this.client
            .get<ToBePaid>(
              `${environment.apiUrl}/payments/balance/${this.brokerId}/${this.paymentField}`
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
          `${environment.apiUrl}/payments/balance/${this.brokerId}/${this.paymentField}`
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
          `${environment.apiUrl}/payments/balance/${this.brokerId}/${this.paymentField}`
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
          `${environment.apiUrl}/payments/balance/${this.brokerId}/${this.paymentField}`
        )
        .subscribe((res) => {
          this.toBePaid = res.balance;
        });
    }
  }

  compareFun(b1: number | string, b2: number): boolean {
    if (b1) {
      return b1 === b2;
    } else {
      return false;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validateForm.controls;
  }

  confirm(): void {
    // tslint:disable-next-line: triple-equals
    if (this.id == undefined) {
      const data: Payment = {
        brokerId: this.f.brokerId.value,
        paymentField: this.f.paymentField.value,
        paymentDate: toDateString(this.f.paymentDate.value),
        paymentAmount: this.f.paymentAmount.value,
      };
      this.client
        .post(`${environment.apiUrl}/payments`, data)
        .subscribe((_) => {
          this.router.navigate(['/payment']);
          this.message.create('success', `Payment Successfully Added`);
        });
    }
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
      // tslint:disable-next-line: triple-equals
      if (this.id == undefined) {
        if (this.f.paymentAmount.value > this.toBePaid) {
          this.confirmPayment = false;
        }
      } else {
        const data: Payment = {
          id: this.id,
          brokerId: this.f.brokerId.value,
          paymentField: this.f.paymentField.value,
          paymentDate: toDateString(this.f.paymentDate.value),
          paymentAmount: this.f.paymentAmount.value,
        };
        this.client
          .put(`${environment.apiUrl}/payments/` + this.id, data)
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
