import { Action } from '@ngrx/store';
import { Member, MemberVendor } from 'app/shared/class/member';
import { SalesOrder } from 'app/shared/class/sales-order';

export enum SalesOrderActionTypes {
  LoadSalesOrders = '[Admin] Load Sales Orders',
  LoadSalesOrdersSuccess = '[Admin] Load Sales Orders Success',
  LoadSalesOrdersFail = '[Admin] Load Sales Orders Fail',
  // EditCurrentMember = '[Admin] Edit Current Member',
  // EditCurrentMemberSuccess = '[Admin] Edit Current Member Success',
  // EditCurrentMemberFail = '[Admin] Edit Current Member Fail',
}

// Action Creators
export class LoadSalesOrders implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrders;
  constructor(public payload: { fulfilledby: string, status: string }) { }
}

export class LoadSalesOrdersSuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrdersSuccess;
  constructor(public payload: SalesOrder[]) { }
}

export class LoadSalesOrdersFail implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrdersFail;
  constructor(public payload: string) { }
}
// export class EditCurrentMember implements Action {
//   readonly type = SettingActionTypes.EditCurrentMember;
//   constructor(public payload: Member) { }
// }

// export class EditCurrentMemberSuccess implements Action {
//   readonly type = SettingActionTypes.EditCurrentMemberSuccess;
//   constructor(public payload: Member) { }
// }

// export class EditCurrentMemberFail implements Action {
//   readonly type = SettingActionTypes.EditCurrentMemberFail;
//   constructor(public payload: string) { }
// }

// Union the valid types
export type SalesOrderActions = LoadSalesOrders
| LoadSalesOrdersSuccess
| LoadSalesOrdersFail;