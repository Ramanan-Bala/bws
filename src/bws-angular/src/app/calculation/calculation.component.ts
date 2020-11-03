import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Calculation } from '../_models';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styles: [],
})
export class CalculationComponent implements OnInit {
  wagesReport: Calculation[] = [];

  constructor(private message: NzMessageService, private client: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }
  delData(data: number): void {
    this.client
      .delete('https://localhost:5001/Calculation/' + data)
      .subscribe((_) => {
        this.loadData();
      });
    this.message.create('success', `Summary Successfully Deleted`);
  }
  loadData(): void {
    this.client
      .get<Calculation[]>('https://localhost:5001/Calculation')
      .subscribe(
        (res) => {
          this.wagesReport = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
