/* NgRx */
import { Action } from '@ngrx/store';
import { Member } from '../class/member';


export enum UserActionTypes {
  GetCurrentUser = '[User] Get Current User',
  GetCurrentUserSuccess = '[User] Get Current User Successful',
  GetCurrentUserFail = '[User] Get Current User Failed',
}

export class GetCurrentUser implements Action {
  readonly type = UserActionTypes.GetCurrentUser;
}

export class GetCurrentUserSuccess implements Action {
  readonly type = UserActionTypes.GetCurrentUserSuccess;

  constructor(public payload: Member) { }
}

export class GetCurrentUserFail implements Action {
  readonly type = UserActionTypes.GetCurrentUserFail;

  constructor(public payload: string) { }
}

export type UserActions = GetCurrentUser
  | GetCurrentUserSuccess
  | GetCurrentUserFail;
