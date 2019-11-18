import {Action} from '@ngrx/store';
import {Member} from '../../../shared/class/member';
import {Vendor} from '../../../shared/class/vendor';

export enum UserManangementActionTypes {
    LoadMemberList = '[UserManagement] Load MemberList',
    LoadMemberListSuccess = '[UserManagement] Load MemberList Success',
    LoadMemberListFail = '[UserManagement] Load MemberList Fail',
    SetCurrentMember = '[UserManagement] Set Current Member',
    SetCurrentMemberSuccess = '[UserManagement] Set Current Member Success',
    SetCurrentMemberFail = '[UserManagement] Set Current Member Fail',
    LoadCurrentMemberRelatedVendors = '[UserManagement] Load Current Member RelatedVendors',
    LoadCurrentMemberRelatedVendorsSuccess = '[UserManagement] Load Current Member RelatedVendors Success',
    LoadCurrentMemberRelatedVendorsFail = '[UserManagement] Load Current Member RelatedVendors Fail',
    LoadCurrentMemberUnRelatedVendors = '[UserManagement] Load Current Member UnRelatedVendors',
    LoadCurrentMemberUnRelatedVendorsSuccess = '[UserManagement] Load Current Member UnRelatedVendors Success',
    LoadCurrentMemberUnRelatedVendorsFail = '[UserManagement] Load Current Member UnRelatedVendors Fail',
    AddVendorRelationToMember = '[UserManagement] Add Vendor Relation To Member',
    AddVendorRelationToMemberSuccess = '[UserManagement] Add Vendor Relation To Member Success',
    AddVendorRelationToMemberFail = '[UserManagement] Add Vendor Relation To Member Fail',
    RemoveVendorRelationToMember = '[UserManagement] Remove Vendor Relation To Member',
    RemoveVendorRelationToMemberSuccess = '[UserManagement] Remove Vendor Relation To Member Success',
    RemoveVendorRelationToMemberFail = '[UserManagement] Remove Vendor Relation To Member Fail',

}

export class LoadMemberList implements Action {
    readonly type = UserManangementActionTypes.LoadMemberList;
}

export class LoadMemberListSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadMemberListSuccess;

    constructor(public payload: Member[]) {
    }
}

export class LoadMemberListFail implements Action {
    readonly type = UserManangementActionTypes.LoadMemberListFail;

    constructor(public payload: string) {
    }
}

export class LoadCurrentMemberRelatedVendors implements Action {
    readonly type = UserManangementActionTypes.LoadCurrentMemberRelatedVendors;

    constructor(public payload: string) {
    }
}

export class LoadCurrentMemberRelatedVendorsSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadCurrentMemberRelatedVendorsSuccess;

    constructor(public payload: Vendor[]) {
    }
}

export class LoadCurrentMemberRelatedVendorsFail implements Action {
    readonly type = UserManangementActionTypes.LoadCurrentMemberRelatedVendorsFail;

    constructor(public payload: string) {
    }
}

export class LoadCurrentMemberUnRelatedVendors implements Action {
    readonly type = UserManangementActionTypes.LoadCurrentMemberUnRelatedVendors;

    constructor(public payload: string) {
    }
}

export class LoadCurrentMemberUnRelatedVendorsSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadCurrentMemberUnRelatedVendorsSuccess;

    constructor(public payload: Vendor[]) {
    }
}

export class LoadCurrentMemberUnRelatedVendorsFail implements Action {
    readonly type = UserManangementActionTypes.LoadCurrentMemberUnRelatedVendorsFail;

    constructor(public payload: string) {
    }
}

export class AddVendorRelationToMember implements Action {
    readonly type = UserManangementActionTypes.AddVendorRelationToMember;

    constructor(public payload: { Vendor: Vendor, MemberID: string }) {
    }
}

export class AddVendorRelationToMemberSuccess implements Action {
    readonly type = UserManangementActionTypes.AddVendorRelationToMemberSuccess;
}

export class AddVendorRelationToMemberFail implements Action {
    readonly type = UserManangementActionTypes.AddVendorRelationToMemberFail;

    constructor(public payload: string) {
    }
}

export class RemoveVendorRelationToMember implements Action {
    readonly type = UserManangementActionTypes.RemoveVendorRelationToMember;

    constructor(public payload: { Vendor: Vendor, MemberID: string }) {
    }
}

export class RemoveVendorRelationToMemberSuccess implements Action {
    readonly type = UserManangementActionTypes.RemoveVendorRelationToMemberSuccess;
}

export class RemoveVendorRelationToMemberFail implements Action {
    readonly type = UserManangementActionTypes.RemoveVendorRelationToMemberFail;

    constructor(public payload: string) {
    }
}

export type UsermanagementActions =
    | LoadMemberList
    | LoadMemberListSuccess
    | LoadMemberListFail
    | LoadCurrentMemberRelatedVendorsSuccess
    | LoadCurrentMemberRelatedVendorsFail
    | LoadCurrentMemberRelatedVendors
    | LoadCurrentMemberUnRelatedVendors
    | LoadCurrentMemberUnRelatedVendorsSuccess
    | LoadCurrentMemberUnRelatedVendorsFail
    | AddVendorRelationToMember
    | AddVendorRelationToMemberSuccess
    | AddVendorRelationToMemberFail
    | RemoveVendorRelationToMember
    | RemoveVendorRelationToMemberSuccess
    | RemoveVendorRelationToMemberFail
    ;
