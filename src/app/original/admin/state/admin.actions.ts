import { Action } from '@ngrx/store';
import { Member, MemberInsert } from '../../../shared/class/member';
import { VendorList } from '../../../shared/class/vendor';

export enum AdminActionTypes {
  LoadMembers = '[Admin] Load Members',
  LoadMembersSuccess = '[Admin] Load Members Success',
  LoadMembersFail = '[Admin] Load Members Fail',
  LoadMember = '[Admin] Load Current Member',
  LoadMemberSuccess = '[Admin] Load Current Member Success',
  LoadMemberFail = '[Admin] Load Current Member Fail',
  SetMemberID = '[Admin] Set MemberID',
  AddMember = '[Admin] Add Current Member',
  AddMemberSuccess = '[Admin] Add Current Member Success',
  AddMemberFail = '[Admin] Add Current Member Fail',
  EditMember = '[Admin] Edit Current Member',
  EditMemberSuccess = '[Admin] Edit Current Member Success',
  EditMemberFail = '[Admin] Edit Current Member Fail',
  LoadVendorList = '[Admin] Load Vendor List',
  LoadVendorListSuccess = '[Admin] Load Vendor List Success',
  LoadVendorListFail = '[Admin] Load Vendor List Fail',
}

// Action Creators

export class SetMemberID implements Action {
  readonly type = AdminActionTypes.SetMemberID;
  constructor(public payload: number) { }
}
export class LoadMembers implements Action {
  readonly type = AdminActionTypes.LoadMembers;
}

export class LoadMembersSuccess implements Action {
  readonly type = AdminActionTypes.LoadMembersSuccess;
  constructor(public payload: Member[]) { }
}

export class LoadMembersFail implements Action {
  readonly type = AdminActionTypes.LoadMembersFail;
  constructor(public payload: string) { }
}

export class LoadMember implements Action {
  readonly type = AdminActionTypes.LoadMember;
  constructor(public payload: number) { }
}

export class LoadMemberSuccess implements Action {
  readonly type = AdminActionTypes.LoadMemberSuccess;
  constructor(public payload: Member) { }
}

export class LoadMemberFail implements Action {
  readonly type = AdminActionTypes.LoadMemberFail;
  constructor(public payload: string) { }
}

export class AddMember implements Action {
  readonly type = AdminActionTypes.AddMember;
  constructor(public payload: MemberInsert) { }
}

export class AddMemberSuccess implements Action {
  readonly type = AdminActionTypes.AddMemberSuccess;
  constructor(public payload: Member) { }
}

export class AddMemberFail implements Action {
  readonly type = AdminActionTypes.AddMemberFail;
  constructor(public payload: string) { }
}

export class EditMember implements Action {
  readonly type = AdminActionTypes.EditMember;
  constructor(public payload: Member) { }
}

export class EditMemberSuccess implements Action {
  readonly type = AdminActionTypes.EditMemberSuccess;
  constructor(public payload: Member) { }
}

export class EditMemberFail implements Action {
  readonly type = AdminActionTypes.EditMemberFail;
  constructor(public payload: string) { }
}
export class LoadVendorList implements Action {
  readonly type = AdminActionTypes.LoadVendorList;
}

export class LoadVendorListSuccess implements Action {
  readonly type = AdminActionTypes.LoadVendorListSuccess;
  constructor(public payload: VendorList[]) { }
}

export class LoadVendorListFail implements Action {
  readonly type = AdminActionTypes.LoadVendorListFail;
  constructor(public payload: string) { }
}

// Union the valid types
export type AdminActions = SetMemberID
| LoadMembers
| LoadMembersSuccess
| LoadMembersFail
| LoadMember
| LoadMemberSuccess
| LoadMemberFail
| EditMember
| EditMemberSuccess
| EditMemberFail
| AddMember
| AddMemberSuccess
| AddMemberFail
| LoadVendorList
| LoadVendorListSuccess
| LoadVendorListFail;
