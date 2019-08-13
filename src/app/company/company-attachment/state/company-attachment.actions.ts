import { CompanyInfo } from '../../../shared/class/company-info';
import { AddressCountry, AddressState } from '../../../shared/class/address';
import { Action } from '@ngrx/store';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { MatTableDataSource } from '@angular/material';

export enum CompanyAttachmentActionTypes {
  LoadVendorAttachments = '[Company] Load Vendor Attachments',
  LoadVendorAttachmentsSuccess = '[Company] Load Vendor Attachments Success',
  LoadVendorAttachmentsFail = '[Company] Load Vendor Attachments Fail',
  SetVendorAttachmentID = '[Company] Set Vendor Attachment ID',
  
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
  constructor(public payload: MatTableDataSource<VendorAttachment>) { }
}

export class LoadVendorAttachmentsFail implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorAttachmentsFail;
  constructor(public payload: string) { }
}


// Union the valid types
export type CompanyAttachmentActions = LoadVendorAttachments
  | LoadVendorAttachmentsSuccess
  | LoadVendorAttachmentsFail
  | SetVendorAttachmentID;
  
  
  
  
  
  

