import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Broker, brokerHeader, Sort } from '../_models';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
})
export class BrokersComponent implements OnInit {
  brokers: Broker[] = [];
  sort: Sort[] = brokerHeader;

  loading = true;

  searchValue: string;

  constructor(private message: NzMessageService, private client: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  delData(data: number): void {
    this.client
      .delete(`${environment.apiUrl}/broker/` + data)
      .subscribe((_) => {
        this.loadData();
      });
    this.message.create('success', `Broker Successfully Deleted`);
  }

  loadData(): void {
    this.client.get<Broker[]>(`${environment.apiUrl}/broker`).subscribe(
      (res) => {
        this.brokers = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
