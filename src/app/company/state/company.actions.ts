import { CompanyInfo } from '../../shared/class/company-info';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { AddressCountry, AddressState } from '../../shared/class/address';
import { Action } from '@ngrx/store';

export enum CompanyActionTypes {
  LoadVendorBrands = '[Company] Load Vendor Brands',
  LoadVendorBrandsSuccess = '[Company] Load Vendor Brands Success',
  LoadVendorBrandsFail = '[Company] Load Vendor Brands Fail',
  
  LoadCompanyInfo = '[Company] Load Company Info',
  LoadCompanyInfoSuccess = '[Company] Load Company Info Success',
  LoadCompanyInfoFail = '[Company] Load Company Info Fail',

  LoadAddressCountry = '[Company] Load Address Country',
  LoadAddressCountrySuccess = '[Company] Load Address Country Success',
  LoadAddressCountryFail = '[Company] Load Address Country Fail',

  LoadShippingAddressState = '[Company] Load Shipping Address State',
  LoadShippingAddressStateSuccess = '[Company] Load Shipping Address State Success',
  LoadShippingAddressStateFail = '[Company] Load Shipping Address State Fail',

  LoadBillingAddressState = '[Company] Load Billing Address State',
  LoadBillingAddressStateSuccess = '[Company] Load Billing Address State Success',
  LoadBillingAddressStateFail = '[Company] Load Billing Address State Fail',
}

// Action Creators
export class LoadVendorBrands implements Action {
  readonly type = CompanyActionTypes.LoadVendorBrands;
}

export class LoadVendorBrandsSuccess implements Action {
  readonly type = CompanyActionTypes.LoadVendorBrandsSuccess;
  constructor(public payload: VendorBrand[]) { }
}

export class LoadVendorBrandsFail implements Action {
  readonly type = CompanyActionTypes.LoadVendorBrandsFail;
  constructor(public payload: string) { }
}

export class LoadCompanyInfo implements Action {
  readonly type = CompanyActionTypes.LoadCompanyInfo;
}

export class LoadCompanyInfoSuccess implements Action {
  readonly type = CompanyActionTypes.LoadCompanyInfoSuccess;
  constructor(public payload: CompanyInfo) { }
}

export class LoadCompanyInfoFail implements Action {
  readonly type = CompanyActionTypes.LoadCompanyInfoFail;
  constructor(public payload: string) { }
}
export class LoadAddressCountry implements Action {
  readonly type = CompanyActionTypes.LoadAddressCountry;
}

export class LoadAddressCountrySuccess implements Action {
  readonly type = CompanyActionTypes.LoadAddressCountrySuccess;
  constructor(public payload: AddressCountry[]) { }
}

export class LoadAddressCountryFail implements Action {
  readonly type = CompanyActionTypes.LoadAddressCountryFail;
  constructor(public payload: string) { }
}
export class LoadShippingAddressState implements Action {
  readonly type = CompanyActionTypes.LoadShippingAddressState;
  constructor(public payload: string) { }
}

export class LoadShippingAddressStateSuccess implements Action {
  readonly type = CompanyActionTypes.LoadShippingAddressStateSuccess;
  constructor(public payload: AddressState[]) { }
}

export class LoadShippingAddressStateFail implements Action {
  readonly type = CompanyActionTypes.LoadShippingAddressStateFail;
  constructor(public payload: string) { }
}
export class LoadBillingAddressState implements Action {
  readonly type = CompanyActionTypes.LoadBillingAddressState;
  constructor(public payload: string) { }
}

export class LoadBillingAddressStateSuccess implements Action {
  readonly type = CompanyActionTypes.LoadBillingAddressStateSuccess;
  constructor(public payload: AddressState[]) { }
}

export class LoadBillingAddressStateFail implements Action {
  readonly type = CompanyActionTypes.LoadBillingAddressStateFail;
  constructor(public payload: string) { }
}

// Union the valid types
export type CompanyActions = LoadVendorBrands
  | LoadVendorBrandsSuccess
  | LoadVendorBrandsFail
  | LoadAddressCountry
  | LoadAddressCountrySuccess
  | LoadAddressCountryFail
  | LoadShippingAddressState
  | LoadShippingAddressStateSuccess
  | LoadShippingAddressStateFail
  | LoadBillingAddressState
  | LoadBillingAddressStateSuccess
  | LoadBillingAddressStateFail
  | LoadCompanyInfo
  | LoadCompanyInfoSuccess
  | LoadCompanyInfoFail;
  
  
  
  
  
  

