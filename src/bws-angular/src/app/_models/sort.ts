import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface Sort {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  sortDirections: NzTableSortOrder[];
}
