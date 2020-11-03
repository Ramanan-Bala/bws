import { Broker, Sales } from '../_models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brokerSearch',
})
export class BrokerSearchPipe implements PipeTransform {
  transform(broker: Broker[], searchValue: string): any {
    if (!broker || !searchValue) {
      return broker;
    }
    return broker.filter(
      // tslint:disable-next-line: no-shadowed-variable
      (broker) =>
        broker.brokerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.addressLine1.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.addressLine2.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        broker.contactNumber
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
  }
}

// For numbers
// employees.phoneNo.toString().toLowerCase().includes(searchValue.toLowerCase());
