import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Sales, salesHeader, Sort } from '../_models';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.css'],
})
export class SalesSummaryComponent implements OnInit {
  salesSummary: Sales[] = [];
  searchValue: string;
  visible = false;
  loading = true;
  sort: Sort[] = salesHeader;

  constructor(private message: NzMessageService, private client: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  clickMe(): void {
    this.visible = false;
  }

  delData(data: number): void {
    this.client
      .delete(`${environment.apiUrl}/SalesSummary/` + data)
      .subscribe((_) => {
        this.loadData();
      });
    this.message.create('success', `Summary Successfully Deleted`);
  }

  loadData(): void {
    this.client.get<Sales[]>(`${environment.apiUrl}/SalesSummary`).subscribe(
      (res) => {
        this.salesSummary = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
