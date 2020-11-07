import { Sales, Sort } from '.';

export const salesHeader: Sort[] = [
  {
    name: 'Broker Name',
    sortOrder: null,
    sortFn: (a: Sales, b: Sales) => a.brokerName.localeCompare(b.brokerName),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Bill Number',
    sortOrder: null,
    sortFn: (a: Sales, b: Sales) => a.billNumber.localeCompare(b.billNumber),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Bill Date',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Sales, b: Sales) => a.billDate.localeCompare(b.billDate),
  },
  {
    name: 'Quantity',
    sortOrder: null,
    sortFn: (a: Sales, b: Sales) => a.billQuantity - b.billQuantity,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Amount',
    sortOrder: null,
    sortFn: (a: Sales, b: Sales) => a.billAmount - b.billAmount,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Actions',
    sortOrder: null,
    sortDirections: [null],
    sortFn: null,
  },
];
