import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { toDateString } from '../_helpers';
import { Calculation } from '../_models';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
})
export class CalculationComponent implements OnInit {
  loading = false;
  hideTable = false;
  alert = false;

  date = null;

  submitted = false;
  validateForm!: FormGroup;

  field: string;
  title: string;
  from: string;
  to: string;
  calculation: Calculation[] = [];

  constructor(
    private client: HttpClient,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.url.subscribe((val) => (this.field = val[0].path));
    if (this.field === 'COMMN') {
      this.title = 'Commission';
    } else {
      this.title = 'Bonus';
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      rangePicker: ['', [Validators.required]],
    });
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
      this.client
        .get<Calculation[]>(
          `https://localhost:5001/calculation?calcField=${this.field}&from=${this.from}&to=${this.to}`
        )
        .subscribe((res) => {
          this.calculation = res;
          this.hideTable = true;
          this.alert = false;
        });
    }
  }

  onSubmit(): void {
    this.client
      .post<Calculation[]>(
        `https://localhost:5001/calculation?calcField=${this.field}&from=${this.from}&to=${this.to}`,
        this.calculation
      )
      .subscribe((_) => {
        this.hideTable = false;
        this.alert = true;
      });
  }

  onChange(result: Date[]): void {
    this.from = toDateString(result[0]);
    this.to = toDateString(result[1]);
  }
}
