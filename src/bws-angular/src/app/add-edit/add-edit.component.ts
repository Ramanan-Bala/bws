import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Broker } from '../_models';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  index: number;
  title: string;
  brokers: Broker[] = [];
  validateForm!: FormGroup;
  submitted = false;

  get f(): any {
    return this.validateForm.controls;
  }

  submitForm(): void {
    this.submitted = true;

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log('index value', this.index);

    if (this.validateForm.invalid) {
      console.log('Invalid');
      return;
    } else {
      // tslint:disable-next-line: triple-equals
      if (this.index == -1) {
        console.log('valid');
        this.brokers.push({
          brokerId: this.f.brokerId.value,
          name: this.f.name.value,
          addressLine1: this.f.addressLine1.value,
          addressLine2: this.f.addressLine2.value,
          city: this.f.city.value,
          mobileNumber: this.f.mobileNumber.value,
        });
        this.message.create('success', `Broker Successfully Added`);
      } else if (this.index >= 0) {
        console.log(this.brokers[this.index].brokerId);
        this.brokers[this.index].brokerId = this.f.brokerId.value;
        this.brokers[this.index].name = this.f.name.value;
        this.brokers[this.index].addressLine1 = this.f.addressLine1.value;
        this.brokers[this.index].addressLine2 = this.f.addressLine2.value;
        this.brokers[this.index].city = this.f.city.value;
        this.brokers[this.index].mobileNumber = this.f.mobileNumber.value;
        this.message.create('success', `Broker Successfully Edited`);
      }
      const brokersJson: string = JSON.stringify(this.brokers);
      localStorage.setItem('brokers', brokersJson);
      this.router.navigate(['/brokers']);
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.index = this.route.snapshot.params.index;
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.validateForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
    });
    this.brokers = JSON.parse(localStorage.getItem('brokers')) || [];
    if (this.index === -1) {
      this.title = 'Add Broker';
    } else if (this.index >= 0) {
      this.title = 'Edit Broker';
      this.f.brokerId.value = this.brokers[this.index].brokerId;
      this.f.name.value = this.brokers[this.index].name;
      this.f.addressLine1.value = this.brokers[this.index].addressLine1;
      this.f.addressLine2.value = this.brokers[this.index].addressLine2;
      this.f.city.value = this.brokers[this.index].city;
      this.f.mobileNumber.value = this.brokers[this.index].mobileNumber;
    }
  }
}
