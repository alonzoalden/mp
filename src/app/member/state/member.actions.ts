import { Action } from '@ngrx/store';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { Member } from 'app/shared/class/member';

export enum MemberActionTypes {
  LoadMembers = '[Company] Load Members',
  LoadMembersSuccess = '[Company] Load Members Success',
  LoadMembersFail = '[Company] Load Members Fail',
  LoadMemberByInviteGUID = '[Company] Load Member By Invite GUID',
  LoadMemberByInviteGUIDSuccess = '[Company] Load Member By Invite GUID Success',
  LoadMemberByInviteGUIDFail = '[Company] Load Member By Invite GUID Fail',
  SendConfirmationMember = '[Company] Send Confirmation Member',
  SendConfirmationMemberSuccess = '[Company] Send Confirmation Member Success',
  SendConfirmationMemberFail = '[Company] Send Confirmation Member Fail',
  EditMemberRegistration = '[Company] Edit Member Registration',
  EditMemberRegistrationSuccess = '[Company] Edit Member Registration Success',
  EditMemberRegistrationFail = '[Company] Edit Member Registration Fail',
  DeleteMember = '[Company] Delete Member',
  DeleteMemberSuccess = '[Company] Delete Member Success',
  DeleteMemberFail = '[Company] Delete Member Fail',
  EditMember = '[Company] Edit Member',
  EditMemberSuccess = '[Company] Edit Member Success',
  EditMemberFail = '[Company] Edit Member Fail',
  SetVendorAttachmentID = '[Company] Set Vendor Attachment ID',
}

// Action Creators

export class SetVendorAttachmentID implements Action {
  readonly type = MemberActionTypes.SetVendorAttachmentID;
  constructor(public payload: number) { }
}
export class LoadMembers implements Action {
  readonly type = MemberActionTypes.LoadMembers;
}
export class LoadMembersSuccess implements Action {
  readonly type = MemberActionTypes.LoadMembersSuccess;
  constructor(public payload: Member[]) { }
}
export class LoadMembersFail implements Action {
  readonly type = MemberActionTypes.LoadMembersFail;
  constructor(public payload: string) { }
}
export class LoadMemberByInviteGUID implements Action {
  readonly type = MemberActionTypes.LoadMemberByInviteGUID;
  constructor(public payload: string) { }
}
export class LoadMemberByInviteGUIDSuccess implements Action {
  readonly type = MemberActionTypes.LoadMemberByInviteGUIDSuccess;
  constructor(public payload: Member) { }
}
export class LoadMemberByInviteGUIDFail implements Action {
  readonly type = MemberActionTypes.LoadMemberByInviteGUIDFail;
  constructor(public payload: string) { }
}
export class SendConfirmationMember implements Action {
  readonly type = MemberActionTypes.SendConfirmationMember;
  constructor(public payload: Member) { }
}
export class SendConfirmationMemberSuccess implements Action {
  readonly type = MemberActionTypes.SendConfirmationMemberSuccess;
  constructor(public payload: Member) { }
}
export class SendConfirmationMemberFail implements Action {
  readonly type = MemberActionTypes.SendConfirmationMemberFail;
  constructor(public payload: string) { }
}
export class EditMemberRegistration implements Action {
  readonly type = MemberActionTypes.EditMemberRegistration;
  constructor(public payload: Member) { }
}
export class EditMemberRegistrationSuccess implements Action {
  readonly type = MemberActionTypes.EditMemberRegistrationSuccess;
  constructor(public payload: Member) { }
}
export class EditMemberRegistrationFail implements Action {
  readonly type = MemberActionTypes.EditMemberRegistrationFail;
  constructor(public payload: string) { }
}
export class DeleteMember implements Action {
  readonly type = MemberActionTypes.DeleteMember;
  constructor(public payload: Member) { }
}
export class DeleteMemberSuccess implements Action {
  readonly type = MemberActionTypes.DeleteMemberSuccess;
  constructor(public payload: Member) { }
}
export class DeleteMemberFail implements Action {
  readonly type = MemberActionTypes.DeleteMemberFail;
  constructor(public payload: string) { }
}

export class EditMember implements Action {
  readonly type = MemberActionTypes.EditMember;
  constructor(public payload: Member) { }
}
export class EditMemberSuccess implements Action {
  readonly type = MemberActionTypes.EditMemberSuccess;
  constructor(public payload: Member) { }
}
export class EditMemberFail implements Action {
  readonly type = MemberActionTypes.EditMemberFail;
  constructor(public payload: string) { }
}

// Union the valid types
export type MemberActions = LoadMembers
  | LoadMembersSuccess
  | LoadMembersFail
  | LoadMemberByInviteGUID
  | LoadMemberByInviteGUIDSuccess
  | LoadMemberByInviteGUIDFail
  | EditMemberRegistration
  | EditMemberRegistrationSuccess
  | EditMemberRegistrationFail
  | DeleteMember
  | DeleteMemberSuccess
  | DeleteMemberFail
  | EditMember
  | EditMemberSuccess
  | EditMemberFail
  | SetVendorAttachmentID;
  
  
  
  
  
  

