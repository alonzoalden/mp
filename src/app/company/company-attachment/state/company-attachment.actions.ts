import { CompanyInfo } from '../../../shared/class/company-info';
import { VendorBrand } from '../../../shared/class/vendor-brand';
import { AddressCountry, AddressState } from '../../../shared/class/address';
import { Action } from '@ngrx/store';

export enum CompanyAttachmentActionTypes {
  LoadVendorBrands = '[Company] Load Vendor Brands',
  LoadVendorBrandsSuccess = '[Company] Load Vendor Brands Success',
  LoadVendorBrandsFail = '[Company] Load Vendor Brands Fail',
  SetVendorAttachmentID = '[Company] Set Vendor Attachment ID',
  
}

// Action Creators
export class SetVendorAttachmentID implements Action {
  readonly type = CompanyAttachmentActionTypes.SetVendorAttachmentID;
  constructor(public payload: number) { }
}
export class LoadVendorBrands implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorBrands;
}

export class LoadVendorBrandsSuccess implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorBrandsSuccess;
  constructor(public payload: VendorBrand[]) { }
}

export class LoadVendorBrandsFail implements Action {
  readonly type = CompanyAttachmentActionTypes.LoadVendorBrandsFail;
  constructor(public payload: string) { }
}


// Union the valid types
export type CompanyAttachmentActions = LoadVendorBrands
  | LoadVendorBrandsSuccess
  | LoadVendorBrandsFail
  | SetVendorAttachmentID;
  
  
  
  
  
  

