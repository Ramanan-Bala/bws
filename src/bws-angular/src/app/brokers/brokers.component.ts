import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Broker } from '../_models';

@Component({
  selector: 'app-welcome',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
})
export class BrokersComponent implements OnInit {
  brokers: Broker[] = [];
  index = -1;
  sValue: string;
  searchValue: string;

  visible = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  search(): void {
    this.searchValue = this.sValue;
  }

  delData(data: number): void {
    this.brokers.splice(data, 1);
    const brokersJson: string = JSON.stringify(this.brokers);
    localStorage.setItem('brokers', brokersJson);
    this.visible = false;
    this.message.create('success', `Broker Successfully Deleted`);
  }

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    this.brokers = JSON.parse(localStorage.getItem('brokers')) || [];
  }
}
