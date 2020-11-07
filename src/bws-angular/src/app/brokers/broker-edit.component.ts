import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Broker } from '../_models';

@Component({
  selector: 'app-broker-edit',
  templateUrl: './broker-edit.component.html',
  styleUrls: ['./broker-edit.component.css'],
})
export class BrokerEditComponent implements OnInit {
  id = undefined;
  title: string;
  validateForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private client: HttpClient
  ) {
    this.id = this.route.snapshot.params.id;

    // tslint:disable-next-line: triple-equals
    if (this.id == undefined) {
      this.title = 'Add Broker';
    } else if (this.id >= 0) {
      this.title = 'Edit Broker';
      this.client
        .get<Broker>('https://localhost:5001/broker/' + this.id)
        .subscribe((res) => {
          this.f.name.setValue(res.brokerName);
          this.f.addressLine1.setValue(res.addressLine1);
          this.f.addressLine2.setValue(res.addressLine2);
          this.f.city.setValue(res.city);
          this.f.contactNumber.setValue(res.contactNumber);
          this.f.note.setValue(res.note);
        });
    }
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9,]*$'),
          Validators.minLength(10),
          Validators.maxLength(24),
        ],
      ],
      note: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.validateForm.controls;
  }

  submitForm(): void {
    this.submitted = true;

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    } else {
      // tslint:disable-next-line: triple-equals
      if (this.id == undefined) {
        console.log('ADD');
        const data: Broker = {
          brokerName: this.f.name.value,
          addressLine1: this.f.addressLine1.value,
          addressLine2: this.f.addressLine2.value,
          city: this.f.city.value,
          contactNumber: this.f.contactNumber.value,
          note: this.f.note.value,
        };
        this.client
          .post('https://localhost:5001/broker', data)
          .subscribe((_) => {
            this.router.navigate(['/brokers']);
            this.message.create('success', `Broker Successfully Added`);
          });
      } else {
        const data: Broker = {
          id: this.id,
          brokerName: this.f.name.value,
          addressLine1: this.f.addressLine1.value,
          addressLine2: this.f.addressLine2.value,
          city: this.f.city.value,
          contactNumber: this.f.contactNumber.value,
          note: this.f.note.value,
        };
        this.client
          .put('https://localhost:5001/broker/' + this.id, data)
          .subscribe((_) => {
            this.router.navigate(['/brokers']);
            this.message.create('success', `Broker Successfully Edited`);
          });
      }
    }
  }
  cancelForm(): void {
    this.router.navigate(['/brokers']);
  }
}
