import { Action } from '@ngrx/store';
import { Member, MemberVendor } from 'app/shared/class/member';

export enum SettingActionTypes {
  LoadMemberVendors = '[Admin] Load Member Vendors',
  LoadMemberVendorsSuccess = '[Admin] Load Member Vendors Success',
  LoadMemberVendorsFail = '[Admin] Load Member Vendors Fail',
  EditCurrentMember = '[Admin] Edit Current Member',
  EditCurrentMemberSuccess = '[Admin] Edit Current Member Success',
  EditCurrentMemberFail = '[Admin] Edit Current Member Fail',
}

// Action Creators
export class LoadMemberVendors implements Action {
  readonly type = SettingActionTypes.LoadMemberVendors;
}

export class LoadMemberVendorsSuccess implements Action {
  readonly type = SettingActionTypes.LoadMemberVendorsSuccess;
  constructor(public payload: MemberVendor[]) { }
}

export class LoadMemberVendorsFail implements Action {
  readonly type = SettingActionTypes.LoadMemberVendorsFail;
  constructor(public payload: string) { }
}
export class EditCurrentMember implements Action {
  readonly type = SettingActionTypes.EditCurrentMember;
  constructor(public payload: Member) { }
}

export class EditCurrentMemberSuccess implements Action {
  readonly type = SettingActionTypes.EditCurrentMemberSuccess;
  constructor(public payload: Member) { }
}

export class EditCurrentMemberFail implements Action {
  readonly type = SettingActionTypes.EditCurrentMemberFail;
  constructor(public payload: string) { }
}

// Union the valid types
export type SettingActions = LoadMemberVendors
| LoadMemberVendorsSuccess
| LoadMemberVendorsFail
| EditCurrentMember
| EditCurrentMemberSuccess
| EditCurrentMemberFail;