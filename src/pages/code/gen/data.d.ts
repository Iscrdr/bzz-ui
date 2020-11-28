export interface TableListItem {
  key: number;
  id: number;
  tableName: string;
  comments?: string;
  className: string;
  classNameLower?: string;
  columnList?: [];
  createTime?: Date;

}

export interface TableListPagination {
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface TableListData {
  list?: TableListItem[];
  pagination?: Partial<TableListPagination>;
}

export interface TableListParams {
  // sorter?: string;
  // status?: string;
  tableName?: string;
  // desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
  createTime?: [];
}
