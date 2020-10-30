import { Component, OnInit } from '@angular/core';

import { Broker } from '../_models';
//import { SearchfilterPipe } from '../_pipes';

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

  search() {
    this.searchValue = this.sValue;
  }

  delData(data: number): void {
    this.brokers.splice(data, 1);
    const brokersJson: string = JSON.stringify(this.brokers);
    localStorage.setItem('brokers', brokersJson);
  }

  constructor() {}

  ngOnInit() {
    this.brokers = JSON.parse(localStorage.getItem('brokers')) || [];
  }
}
