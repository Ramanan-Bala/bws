import { Commission } from './../_models';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  fromDate: Date;
  toDate: Date;

  constructor(private client: HttpClient) {}

  ngOnInit(): void {}

  loadData(): void {
    this.client
      .get<Commission[]>(
        'https://localhost:5001/calculation?calcField=COMMN&from=' +
          this.fromDate +
          '&to=' +
          this.toDate
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
          this.fromDate +
          '&to=' +
          this.toDate,
        this.commission
      )
      .subscribe((_) => {
        this.hideTable = false;
      });
  }
}
