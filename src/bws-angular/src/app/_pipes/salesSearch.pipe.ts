import { Sales } from '../_models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salesSearch',
})
export class SalesSearchPipe implements PipeTransform {
  transform(sales: Sales[], searchValue: string): any {
    if (!sales || !searchValue) {
      return sales;
    }
    return sales.filter(
      // tslint:disable-next-line: no-shadowed-variable
      (sales) =>
        sales.brokerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        sales.billNumber
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        sales.billDate
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        sales.billQuantity
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        sales.billAmount
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
  }
}

// For numbers
// employees.phoneNo.toString().toLowerCase().includes(searchValue.toLowerCase());
