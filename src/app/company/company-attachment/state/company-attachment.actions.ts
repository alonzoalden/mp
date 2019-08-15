import { Action } from '@ngrx/store';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';

export enum CompanyAttachmentActionTypes {
  // RegisterMatTableElements = '[Company] Register Mat Table',
  LoadVendorAttachments = '[Company] Load Vendor Attachments',
  LoadVendorAttachmentsSuccess = '[Company] Load Vendor Attachments Success',
  LoadVendorAttachmentsFail = '[Company] Load Vendor Attachments Fail',
  SetVendorAttachmentID = '[Company] Set Vendor Attachment ID',
  DeleteVendorAttachment = '[Company] Delete Vendor Attachment',
  DeleteVendorAttachmentSuccess = '[Company] Delete Vendor Attachment Success',
  DeleteVendorAttachmentFail = '[Company] Delete Vendor Attachment Fail',
}

// Action Creators

export class SetVendorAttachmentID implements Action {
  readonly type = CompanyAttachmentActionTypes.SetVendorAttachmentID;
  constructor(public payload: number) { }
}
export class LoadVendorAttachments implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorAttachments;
}
export class LoadVendorAttachmentsSuccess implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorAttachmentsSuccess;
  constructor(public payload: VendorAttachment[]) { }
}
export class LoadVendorAttachmentsFail implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorAttachmentsFail;
  constructor(public payload: string) { }
}
export class DeleteVendorAttachment implements Action {
  readonly type = CompanyAttachmentActionTypes.DeleteVendorAttachment;

  constructor(public payload: number) { }
}
export class DeleteVendorAttachmentSuccess implements Action {
  readonly type = CompanyAttachmentActionTypes.DeleteVendorAttachmentSuccess;

  constructor(public payload: number) { }
}
export class DeleteVendorAttachmentFail implements Action {
  readonly type = CompanyAttachmentActionTypes.DeleteVendorAttachmentFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type CompanyAttachmentActions = LoadVendorAttachments
  | LoadVendorAttachmentsSuccess
  | LoadVendorAttachmentsFail
  | SetVendorAttachmentID
  | DeleteVendorAttachment
  | DeleteVendorAttachmentSuccess
  | DeleteVendorAttachmentFail;
  
  
  
  
  
  

