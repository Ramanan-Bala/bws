import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Broker } from './broker';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css'],
})
export class BrokerComponent implements OnInit {
  searchValue: string;
  key = 'id';
  reverse = false;

  alertSuccess = false;
  alertInfo = false;
  alertType = '';
  alertMsg = '';

  showModal = false;
  title: string;

  angForm: FormGroup;
  submitted = false;

  index = -1;
  brokers: Broker[] = [];

  config: any;

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }
  public setItemsPerPage(event): void {
    this.config.itemsPerPage = event;
  }

  get f(): any {
    return this.angForm.controls;
  }

  createForm(): void {
    this.angForm = this.fb.group({
      brokerId: ['', Validators.required],
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
  }

  delData(data: number): void {
    this.alertType = 'Success';
    this.alertMsg = 'Broker Deleted';
    this.alertSuccess = true;
    this.brokers.splice(data, 1);
    const brokersJson: string = JSON.stringify(this.brokers);
    localStorage.setItem('brokers', brokersJson);
    setTimeout(() => {
      this.alertSuccess = false;
    }, 5000);
  }

  add(): void {
    this.title = 'Add Brokers';
    this.index = -1;
    this.showModal = !this.showModal;
    this.f.brokerId.value = '';
    this.f.name.value = '';
    this.f.addressLine1.value = '';
    this.f.addressLine2.value = '';
    this.f.city.value = '';
    this.f.contactNumber.value = '';
  }

  edit(index: number): void {
    this.index =
      this.config.itemsPerPage * (this.config.currentPage - 1) + index;
    this.title = 'Edit Brokers';
    // console.log(this.index);
    // console.log(this.Brokers[index].first);
    this.f.brokerId.value = this.brokers[this.index].brokerId;
    this.f.name.value = this.brokers[this.index].name;
    this.f.addressLine1.value = this.brokers[this.index].addressLine1;
    this.f.addressLine2.value = this.brokers[this.index].addressLine2;
    this.f.city.value = this.brokers[this.index].city;
    this.f.contactNumber.value = this.brokers[this.index].contactNumber;

    this.showModal = !this.showModal;
  }

  submit(): void {
    this.submitted = true;
    if (this.angForm.invalid) {
      return;
    } else {
      if (this.index === -1) {
        console.log('Submit');
        this.alertType = 'Success';
        this.alertMsg = 'Broker Added';
        this.alertSuccess = true;
        this.brokers.push({
          brokerId: this.f.brokerId.value,
          name: this.f.name.value,
          addressLine1: this.f.addressLine1.value,
          addressLine2: this.f.addressLine2.value,
          city: this.f.city.value,
          contactNumber: this.f.contactNumber.value,
        });

        setTimeout(() => {
          this.alertSuccess = false;
        }, 5000);
      } else {
        // if (this.index >= 0) {
        this.alertType = 'Success';
        this.alertMsg = 'Broker Edited';
        this.alertSuccess = true;
        this.brokers[this.index].brokerId = this.f.brokerId.value;
        this.brokers[this.index].name = this.f.name.value;
        this.brokers[this.index].addressLine1 = this.f.addressLine1.value;
        this.brokers[this.index].addressLine2 = this.f.addressLine2.value;
        this.brokers[this.index].city = this.f.city.value;
        this.brokers[this.index].contactNumber = this.f.contactNumber.value;

        setTimeout(() => {
          this.alertSuccess = false;
        }, 5000);
      }
      this.showModal = !this.showModal;
      const brokersJson: string = JSON.stringify(this.brokers);
      localStorage.setItem('brokers', brokersJson);
      this.submitted = false;
      // tslint:disable-next-line: forin
      for (const i in this.angForm.controls) {
        this.angForm.controls[i].markAsUntouched();
      }
    }
  }

  remAlert(): void {
    this.alertSuccess = false;
    this.alertInfo = false;
  }

  cancel(): void {
    this.showModal = !this.showModal;
    // tslint:disable-next-line: forin
    for (const i in this.angForm.controls) {
      this.angForm.controls[i].markAsUntouched();
    }
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.brokers.length,
    };
  }

  ngOnInit(): void {
    this.brokers = JSON.parse(localStorage.getItem('brokers')) || [];
    console.log(this.brokers);
  }
}
