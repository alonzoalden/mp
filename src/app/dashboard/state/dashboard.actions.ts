import { Action } from '@ngrx/store';
import { Member, MemberInsert } from 'app/shared/class/member';

export enum DashboardActionTypes {
  LoadMembers = '[Admin] Load Members',
  LoadMembersSuccess = '[Admin] Load Members Success',
  LoadMembersFail = '[Admin] Load Members Fail',
}

// Action Creators
export class LoadMembers implements Action {
  readonly type = DashboardActionTypes.LoadMembers;
}

export class LoadMembersSuccess implements Action {
  readonly type = DashboardActionTypes.LoadMembersSuccess;
  constructor(public payload: Member[]) { }
}

export class LoadMembersFail implements Action {
  readonly type = DashboardActionTypes.LoadMembersFail;
  constructor(public payload: string) { }
}

export type DashboardActions = LoadMembers
| LoadMembersSuccess
| LoadMembersFail;