import { Commission } from './../_models';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { toDateString } from '../_helpers';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css'],
})
export class CommissionComponent implements OnInit {
  loading = false;
  hideTable = false;
  searchValue: string;
  calcField: string;
  commission: Commission[] = [];
  from: string;
  to: string;
  date = null;
  dates: Date[] = [];

  constructor(private client: HttpClient) {}

  ngOnInit(): void {}

  loadData(): void {
    console.log('From', this.from);
    console.log('To', this.to);
    this.client
      .get<Commission[]>(
        'https://localhost:5001/calculation?calcField=COMMN&from=' +
          this.from +
          '&to=' +
          this.to
      )
      .subscribe((res) => {
        this.commission = res;
        this.hideTable = true;
      });
  }
  onSubmit(): void {
    this.client
      .post<Commission[]>(
        'https://localhost:5001/calculation?calcField=COMMN&from=' +
          this.from +
          '&to=' +
          this.to,
        this.commission
      )
      .subscribe((_) => {
        this.hideTable = false;
      });
  }

  onChange(result: Date[]): void {
    this.from = toDateString(result[0]);
    this.to = toDateString(result[1]);
  }
}
