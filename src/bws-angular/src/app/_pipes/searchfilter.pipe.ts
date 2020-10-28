import { Broker } from '../_models/broker';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(broker: Broker[], searchValue: string): any {
    if (!broker || !searchValue) {
      return broker;
    }
    return broker.filter(
      // tslint:disable-next-line: no-shadowed-variable
      (broker) =>
        broker.brokerId
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        broker.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.addressLine1.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.addressLine2.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.mobileNumber
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
  }
}

// For numbers
// employees.phoneNo.toString().toLowerCase().includes(searchValue.toLowerCase());
