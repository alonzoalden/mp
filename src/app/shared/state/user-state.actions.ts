import { Action } from '@ngrx/store';
import { Member } from '../class/member';

export enum UserActionTypes {
    LoadCurrentUser = '[User] Load Current User',
    LoadCurrentUserSuccess = '[User] Load Current User Successful',
    LoadCurrentUserFail = '[User] Load Current User Failed',
    EditToFirstVendor = '[User] Edit To First Vendor',
    EditToFirstVendorSuccess = '[User] Edit To First Vendor Successful',
    EditToFirstVendorFail = '[User] Edit To First Vendor Failed',
    SetCurrentUser = '[User] Set Current User',
}
export class LoadCurrentUser implements Action {
    readonly type = UserActionTypes.LoadCurrentUser;
}
export class LoadCurrentUserSuccess implements Action {
    readonly type = UserActionTypes.LoadCurrentUserSuccess;
    constructor(public payload: Member) { }
}
export class LoadCurrentUserFail implements Action {
    readonly type = UserActionTypes.LoadCurrentUserFail;
    constructor(public payload: string) { }
}
export class EditToFirstVendor implements Action {
    readonly type = UserActionTypes.EditToFirstVendor;
}
export class EditToFirstVendorSuccess implements Action {
    readonly type = UserActionTypes.EditToFirstVendorSuccess;
    constructor(public payload: Member) { }
}
export class EditToFirstVendorFail implements Action {
    readonly type = UserActionTypes.EditToFirstVendorFail;
    constructor(public payload: string) { }
}
export class SetCurrentUser implements Action {
    readonly type = UserActionTypes.SetCurrentUser;
    constructor(public payload: Member) { }
}

export type UserActions = LoadCurrentUser
    | LoadCurrentUserSuccess
    | LoadCurrentUserFail
    | EditToFirstVendor
    | EditToFirstVendorSuccess
    | EditToFirstVendorFail
    | SetCurrentUser;
