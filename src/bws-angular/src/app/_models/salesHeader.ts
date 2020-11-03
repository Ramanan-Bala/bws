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
    sortFn: null,
    sortDirections: [null],
  },
  {
    name: 'Bill Date',
    sortOrder: null,
    sortDirections: [null],
    sortFn: null,
  },
  {
    name: 'Bill Quantity',
    sortOrder: null,
    sortFn: (a: Sales, b: Sales) => a.billQuantity - b.billQuantity,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Bill Amount',
    sortOrder: null,
    sortFn: (a: Sales, b: Sales) => a.billAmount - b.billAmount,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Action',
    sortOrder: null,
    sortDirections: [null],
    sortFn: null,
  },
];
