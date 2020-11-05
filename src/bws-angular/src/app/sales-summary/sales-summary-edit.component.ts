import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Sales, Broker } from '../_models';
import { toDateString } from '../_helpers';

@Component({
  selector: 'app-sales-summary-edit',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sales-summary-edit.component.html',
  styleUrls: ['./sales-summary-edit.component.css'],
})
export class SalesSummaryEditComponent implements OnInit {
  id = undefined;
  title: string;
  dateFormat = 'yyyy-MM-dd';
  validateForm!: FormGroup;
  submitted = false;
  selectedValue = null;
  brokers: Broker[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private client: HttpClient
  ) {
    this.id = this.route.snapshot.params.id;

    this.client
      .get<Broker[]>('https://localhost:5001/broker')
      .subscribe((res) => {
        this.brokers = res;
      });

    // tslint:disable-next-line: triple-equals
    if (this.id == undefined) {
      this.title = 'Add Summary';
    } else if (this.id >= 0) {
      this.title = 'Edit Summary';
      this.client
        .get<Sales>('https://localhost:5001/SalesSummary/' + this.id)
        .subscribe((res) => {
          this.f.brokerId.setValue(res.brokerId);
          this.f.billNumber.setValue(res.billNumber);
          this.f.billDate.setValue(res.billDate);
          this.f.billQuantity.setValue(res.billQuantity);
          this.f.billAmount.setValue(res.billAmount);
        });
    }
  }

  onChange(result: Date): void {
    // console.log(result.getUTCDate());
  }

  // compareFun(b1: Broker | string, b2: Broker): boolean {
  //   if (b1) {
  //     return typeof b1 === 'string' ? b1 === b2.brokerName : b1.id === b2.id;
  //   } else {
  //     return false;
  //   }
  // }

  compareFun(b1: number | string, b2: number): boolean {
    if (b1) {
      console.log('compare', b1, b2, typeof b1);
      return b1 === b2; // typeof b1 === 'string' ? b1 === b2.brokerName : b1.id === b2.id;
    } else {
      return false;
    }
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.validateForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      billNumber: ['', [Validators.required]],
      billDate: ['', [Validators.required]],
      billQuantity: ['', [Validators.required]],
      billAmount: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validateForm.controls;
  }

  updateDeptId(id: number): void {
    this.brokers[id].id = id;
    console.log(id);
  }

  submitForm(): void {
    this.submitted = true;

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.f.billDate.value);

    if (this.validateForm.invalid) {
      return;
    } else {
      // tslint:disable-next-line: triple-equals
      if (this.id == undefined) {
        const data: Sales = {
          brokerId: this.f.brokerId.value,
          billNumber: this.f.billNumber.value,
          billDate: toDateString(this.f.billDate.value),
          billQuantity: this.f.billQuantity.value,
          billAmount: this.f.billAmount.value,
        };
        // console.log('ADD', data.brokerId);
        this.client
          .post('https://localhost:5001/SalesSummary', data)
          .subscribe((_) => {
            this.router.navigate(['/summary']);
            this.message.create('success', `Summary Successfully Added`);
          });
      } else {
        const data: Sales = {
          id: this.id,
          brokerId: this.f.brokerId.value,
          billNumber: this.f.billNumber.value,
          billDate: toDateString(this.f.billDate.value),
          billQuantity: this.f.billQuantity.value,
          billAmount: this.f.billAmount.value,
        };
        // console.log('EDIT', data.brokerId);
        this.client
          .put('https://localhost:5001/SalesSummary/' + this.id, data)
          .subscribe((_) => {
            this.router.navigate(['/summary']);
            this.message.create('success', `Summary Successfully Edited`);
          });
      }
    }
  }
  cancelForm(): void {
    this.router.navigate(['/summary']);
  }
}
