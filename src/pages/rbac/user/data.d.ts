export interface TableListItem {
  key: number;
  id: number;
  userName: string;
  password?: string;
  nickName: string;
  workNum?: number;
  email?: string;
  phone?: string;
  mobile?: string;
  userType?: number;
  avatar?: string;
  birthDay?: Date;
  // signature?: string;
  // title?: string;
  // address?: string;
  // accountNonExpired?: boolean;
  // accountNonLocked?: boolean;
  // credentialsNonExpired?: boolean;
  // enabled?: boolean;
  createTime?: Date;
  // updateTime?: Date;
  // createBy?: String;
  // updateBy?: String;
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
  userName?: string;
  // desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
  createTime?: [];
}
