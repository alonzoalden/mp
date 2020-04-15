import {Action} from '@ngrx/store';
import {Member} from '../../../shared/class/member';
import {Vendor} from '../../../shared/class/vendor';
import {MemberRelationItemNode, MemberRelationNode} from '../../../shared/class/member-relation';
import {VendorRegistrationB2B} from '../../../shared/class/vendor-registration';

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
    LoadMemberRelationTree = '[UserManagement] Load MemberRelation Tree',
    LoadMemberRelationTreeSuccess = '[UserManagement] Load MemberRelation Tree Success',
    LoadMemberRelationTreeFail = '[UserManagement] Load MemberRelation Tree Fail',
    UpdateMemberRelationTree = '[UserManagement] Update MemberRelation Tree',
    LoadUnRelatedMemberRelationList = '[UserManagement] Load UnRelated MemberRelationList',
    LoadUnRelatedMemberRelationListSuccess = '[UserManagement] Load UnRelated MemberRelationList Success',
    LoadUnRelatedMemberRelationListFail = '[UserManagement] Load UnRelated MemberRelationList Fail',
    DeleteFromUnRelatedMemberRelationList = '[UserManagement] DeleteFrom UnRelated MemberRelationList',
    AddToUnRelatedMemberRelationList = '[UserManagement] Add To UnRelated MemberRelationList',
    AddRelatedMemberRelationList = '[UserManagement] Add Related MemberRelationList',
    DeleteRelatedMemberRelationList = '[UserManagement] Delete Related MemberRelationList',
    SaveRelatedMemberRelationList = '[UserManagement] Save Related MemberRelationList',
    SaveRelatedMemberRelationListSuccess = '[UserManagement] Save Related MemberRelationList Success',
    SaveRelatedMemberRelationListFail = '[UserManagement] Save Related MemberRelationList Fail',
    LoadCheckVendorList = '[UserManagement] Load CheckVendorList',
    LoadCheckVendorListSuccess = '[UserManagement] Load CheckVendorList Success',
    LoadCheckVendorListFail = '[UserManagement] Load CheckVendorList Fail',
    CreateVendorB2b = '[UserManagement] Load CreateVendorB2b',
    CreateVendorB2bSuccess = '[UserManagement] Load CreateVendorB2b Success',
    CreateVendorB2bFail = '[UserManagement] Load CreateVendorB2b Fail',
    EditCurrentVendorRegistration = '[UserManagement] Edit Current Vendor Registration',
    LoadMemberPMList = '[UserManagement] Load MemberPMList',
    LoadMemberPMListSuccess = '[UserManagement] Load MemberPMList Success',
    LoadMemberPMListFail = '[UserManagement] Load MemberPMList Fail',
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

export class LoadMemberRelationTree implements Action {
    readonly type = UserManangementActionTypes.LoadMemberRelationTree;

    constructor() {
    }
}

export class LoadMemberRelationTreeSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadMemberRelationTreeSuccess;

    constructor(public payload: MemberRelationItemNode[]) {
    }
}

export class LoadMemberRelationTreeFail implements Action {
    readonly type = UserManangementActionTypes.LoadMemberRelationTreeFail;

    constructor(public payload: string) {
    }
}

export class UpdateMemberRelationTree implements Action {
    readonly type = UserManangementActionTypes.UpdateMemberRelationTree;

    constructor(public payload: MemberRelationItemNode[]) {
    }
}

export class LoadUnRelatedMemberRelationList implements Action {
    readonly type = UserManangementActionTypes.LoadUnRelatedMemberRelationList;

    constructor() {
    }
}

export class LoadUnRelatedMemberRelationListSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadUnRelatedMemberRelationListSuccess;

    constructor(public payload: MemberRelationNode[]) {
    }
}

export class LoadUnRelatedMemberRelationListFail implements Action {
    readonly type = UserManangementActionTypes.LoadUnRelatedMemberRelationListFail;

    constructor(public payload: string) {
    }
}

export class DeleteFromUnRelatedMemberRelationList implements Action {
    readonly type = UserManangementActionTypes.DeleteFromUnRelatedMemberRelationList;

    constructor(public payload: MemberRelationNode) {
    }
}

export class AddtoUnRelatedMemberRelationList implements Action {
    readonly type = UserManangementActionTypes.AddToUnRelatedMemberRelationList;

    constructor(public payload: MemberRelationNode[]) {
    }
}

export class AddRelatedMemberRelation implements Action {
    readonly type = UserManangementActionTypes.AddRelatedMemberRelationList;

    constructor(public payload: MemberRelationItemNode) {
    }
}

export class DeleteRelatedMemberRelation implements Action {
    readonly type = UserManangementActionTypes.DeleteRelatedMemberRelationList;

    constructor(public payload: MemberRelationItemNode) {
    }
}

export class SaveRelatedMemberRelationList implements Action {
    readonly type = UserManangementActionTypes.SaveRelatedMemberRelationList;

    constructor(public payload: MemberRelationItemNode[]) {
    }
}

export class SaveRelatedMemberRelationListSuccess implements Action {
    readonly type = UserManangementActionTypes.SaveRelatedMemberRelationListSuccess;

    constructor(public payload: MemberRelationItemNode[]) {
    }
}

export class SaveRelatedMemberRelationListFail implements Action {
    readonly type = UserManangementActionTypes.SaveRelatedMemberRelationListFail;

    constructor(public payload: string) {
    }
}

export class LoadCheckVendorList implements Action {
    readonly type = UserManangementActionTypes.LoadCheckVendorList;
}

export class LoadCheckVendorListSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadCheckVendorListSuccess;

    constructor(public payload: VendorRegistrationB2B[]) {
    }
}

export class LoadCheckVendorListFail implements Action {
    readonly type = UserManangementActionTypes.LoadCheckVendorListFail;

    constructor(public payload: string) {
    }
}

export class CreateVendorB2b implements Action {
    readonly type = UserManangementActionTypes.CreateVendorB2b;

    constructor(public payload: VendorRegistrationB2B) {
    }
}

export class CreateVendorB2bSuccess implements Action {
    readonly type = UserManangementActionTypes.CreateVendorB2bSuccess;

    constructor(public payload: VendorRegistrationB2B) {
    }
}

export class CreateVendorB2bFail implements Action {
    readonly type = UserManangementActionTypes.CreateVendorB2bFail;

    constructor(public payload: string) {
    }
}

export class EditCurrentVendorRegistration implements Action {
    readonly type = UserManangementActionTypes.EditCurrentVendorRegistration;

    constructor(public payload: VendorRegistrationB2B) {
    }
}

export class LoadMemberPMList implements Action {
    readonly type = UserManangementActionTypes.LoadMemberPMList;
}

export class LoadMemberPMListSuccess implements Action {
    readonly type = UserManangementActionTypes.LoadMemberPMListSuccess;

    constructor(public payload: Member[]) {
    }
}

export class LoadMemberPMListFail implements Action {
    readonly type = UserManangementActionTypes.LoadMemberPMListFail;

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
    | LoadMemberRelationTree
    | LoadMemberRelationTreeSuccess
    | LoadMemberRelationTreeFail
    | UpdateMemberRelationTree
    | LoadUnRelatedMemberRelationList
    | LoadUnRelatedMemberRelationListSuccess
    | LoadUnRelatedMemberRelationListFail
    | DeleteFromUnRelatedMemberRelationList
    | AddtoUnRelatedMemberRelationList
    | AddRelatedMemberRelation
    | DeleteRelatedMemberRelation
    | SaveRelatedMemberRelationList
    | SaveRelatedMemberRelationListSuccess
    | SaveRelatedMemberRelationListFail
    | LoadCheckVendorList
    | LoadCheckVendorListFail
    | LoadCheckVendorListSuccess
    | CreateVendorB2b
    | CreateVendorB2bFail
    | CreateVendorB2bSuccess
    | EditCurrentVendorRegistration
    | LoadMemberPMList
    | LoadMemberPMListFail
    | LoadMemberPMListSuccess
    ;
