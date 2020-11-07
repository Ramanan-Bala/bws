import { Broker, Sort } from '.';

export const brokerHeader: Sort[] = [
  {
    name: 'Broker Name',
    sortOrder: null,
    sortFn: (a: Broker, b: Broker) => a.brokerName.localeCompare(b.brokerName),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Address Line 1',
    sortOrder: null,
    sortFn: null,
    sortDirections: [null],
  },
  {
    name: 'Address Line 2',
    sortOrder: null,
    sortFn: null,
    sortDirections: [null],
  },
  {
    name: 'City',
    sortOrder: null,
    sortFn: (a: Broker, b: Broker) => a.city.localeCompare(b.city),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Mobile',
    sortOrder: null,
    sortFn: null,
    sortDirections: [null],
  },
  {
    name: 'Note',
    sortOrder: null,
    sortFn: null,
    sortDirections: [null],
  },
  {
    name: 'Actions',
    sortOrder: null,
    sortFn: null,
    sortDirections: [null],
  },
];
