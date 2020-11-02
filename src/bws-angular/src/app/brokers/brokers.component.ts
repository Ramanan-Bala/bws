import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Broker } from '../_models';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
})
export class BrokersComponent implements OnInit {
  brokers: Broker[] = [];
  searchValue: string;
  visible = false;

  constructor(private message: NzMessageService, private client: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  delData(data: number): void {
    this.client
      .delete('https://localhost:5001/broker/' + data)
      .subscribe((_) => {
        this.loadData();
      });
    this.message.create('success', `Broker Successfully Deleted`);
  }

  loadData(): void {
    this.client.get<Broker[]>('https://localhost:5001/broker').subscribe(
      (res) => {
        this.brokers = res;
        // console.log(this.brokers);
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
