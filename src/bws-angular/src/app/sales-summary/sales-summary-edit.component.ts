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
import { differenceInCalendarDays } from 'date-fns';

import { environment } from 'src/environments/environment';

import { Sales, Broker } from '../_models';
import { toDateString } from '../_helpers';
// import { dateLessThan, toDateString } from '../_helpers';

@Component({
  selector: 'app-sales-summary-edit',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sales-summary-edit.component.html',
  styleUrls: ['./sales-summary-edit.component.css'],
})
export class SalesSummaryEditComponent implements OnInit {
  id = undefined;
  title: string;
  searchValue: string;
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

    this.validateForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      billNumber: ['', [Validators.required]],
      billDate: ['', [Validators.required]],
      billQuantity: ['', [Validators.required]],
      billAmount: ['', [Validators.required]],
    });

    this.client
      .get<Broker[]>(`${environment.apiUrl}/broker`)
      .subscribe((res) => {
        this.brokers = res;
      });
  }

  ngOnInit(): void {
    // tslint:disable-next-line: triple-equals
    if (this.id == undefined) {
      this.title = 'Add Summary';
      this.f.billDate.setValue(toDateString(new Date()));
    } else if (this.id >= 0) {
      this.title = 'Edit Summary';
      this.client
        .get<Sales>(`${environment.apiUrl}/SalesSummary/` + this.id)
        .subscribe((res) => {
          this.f.brokerId.setValue(res.brokerId);
          this.f.billNumber.setValue(res.billNumber);
          this.f.billDate.setValue(res.billDate);
          this.f.billQuantity.setValue(res.billQuantity);
          this.f.billAmount.setValue(res.billAmount);
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

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  };

  updateDeptId(id: number): void {
    this.brokers[id].id = id;
  }

  submitForm(): void {
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
        const data: Sales = {
          brokerId: this.f.brokerId.value,
          billNumber: this.f.billNumber.value,
          billDate: toDateString(this.f.billDate.value),
          billQuantity: this.f.billQuantity.value,
          billAmount: this.f.billAmount.value,
        };
        this.client
          .post(`${environment.apiUrl}/SalesSummary`, data)
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
        this.client
          .put(`${environment.apiUrl}/SalesSummary/` + this.id, data)
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
