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
  UploadVendorAttachment = '[Company] Upload Vendor Attachment',
  UploadVendorAttachmentSuccess = '[Company] Upload Vendor Attachment Success',
  UploadVendorAttachmentFail = '[Company] Upload Vendor Attachment Fail',
  EditVendorAttachment = '[Company] Edit Vendor Attachment',
  EditVendorAttachmentSuccess = '[Company] Edit Vendor Attachment Success',
  EditVendorAttachmentFail = '[Company] Edit Vendor Attachment Fail',

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
export class UploadVendorAttachment implements Action {
  readonly type = CompanyAttachmentActionTypes.UploadVendorAttachment;
  constructor(public payload: { form: FormData, title: string }) { }
}
export class UploadVendorAttachmentSuccess implements Action {
  readonly type = CompanyAttachmentActionTypes.UploadVendorAttachmentSuccess;
  constructor(public payload: VendorAttachment) { }
}
export class UploadVendorAttachmentFail implements Action {
  readonly type = CompanyAttachmentActionTypes.UploadVendorAttachmentFail;

  constructor(public payload: string) { }
}
export class EditVendorAttachment implements Action {
  readonly type = CompanyAttachmentActionTypes.EditVendorAttachment;

  constructor(public payload: VendorAttachment) { }
}
export class EditVendorAttachmentSuccess implements Action {
  readonly type = CompanyAttachmentActionTypes.EditVendorAttachmentSuccess;

  constructor(public payload: VendorAttachment) { }
}
export class EditVendorAttachmentFail implements Action {
  readonly type = CompanyAttachmentActionTypes.EditVendorAttachmentFail;

  constructor(public payload: string) { }
}


// Union the valid types
export type CompanyAttachmentActions = LoadVendorAttachments
  | LoadVendorAttachmentsSuccess
  | LoadVendorAttachmentsFail
  | SetVendorAttachmentID
  | DeleteVendorAttachment
  | DeleteVendorAttachmentSuccess
  | DeleteVendorAttachmentFail
  | UploadVendorAttachment
  | UploadVendorAttachmentSuccess
  | UploadVendorAttachmentFail
  | EditVendorAttachment
  | EditVendorAttachmentSuccess
  | EditVendorAttachmentFail;
  
  
  
  
  
  

