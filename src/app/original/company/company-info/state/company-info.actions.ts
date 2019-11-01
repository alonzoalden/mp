import { CompanyInfo } from '../../../../shared/class/company-info';
import { VendorBrand } from '../../../../shared/class/vendor-brand';
import { AddressCountry, AddressState } from '../../../../shared/class/address';
import { Action } from '@ngrx/store';

export enum CompanyInfoActionTypes {
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
    UpdateCompanyInfoShippingAddress = '[Company] Load Edit Company Info Shipping Address',
    UpdateCompanyInfoShippingAddressSuccess = '[Company] Load Edit Company Info Shipping Address Success',
    UpdateCompanyInfoShippingAddressFail = '[Company] Load Edit Company Info Shipping Address Fail',
    UpdateCompanyInfoBillingAddress = '[Company] Update CompanyInfo Billing Address',
    UpdateCompanyInfoBillingAddressSuccess = '[Company] Update Company Info Billing Address Success',
    UpdateCompanyInfoBillingAddressFail = '[Company] Update Company Info Billing Address Fail',
}

// Action Creators
export class LoadVendorBrands implements Action {
    readonly type = CompanyInfoActionTypes.LoadVendorBrands;
}
export class LoadVendorBrandsSuccess implements Action {
    readonly type = CompanyInfoActionTypes.LoadVendorBrandsSuccess;
    constructor(public payload: VendorBrand[]) { }
}
export class LoadVendorBrandsFail implements Action {
    readonly type = CompanyInfoActionTypes.LoadVendorBrandsFail;
    constructor(public payload: string) { }
}
export class LoadCompanyInfo implements Action {
    readonly type = CompanyInfoActionTypes.LoadCompanyInfo;
}
export class LoadCompanyInfoSuccess implements Action {
    readonly type = CompanyInfoActionTypes.LoadCompanyInfoSuccess;
    constructor(public payload: CompanyInfo) { }
}
export class LoadCompanyInfoFail implements Action {
    readonly type = CompanyInfoActionTypes.LoadCompanyInfoFail;
    constructor(public payload: string) { }
}
export class LoadAddressCountry implements Action {
    readonly type = CompanyInfoActionTypes.LoadAddressCountry;
}
export class LoadAddressCountrySuccess implements Action {
    readonly type = CompanyInfoActionTypes.LoadAddressCountrySuccess;
    constructor(public payload: AddressCountry[]) { }
}
export class LoadAddressCountryFail implements Action {
    readonly type = CompanyInfoActionTypes.LoadAddressCountryFail;
    constructor(public payload: string) { }
}
export class LoadShippingAddressState implements Action {
    readonly type = CompanyInfoActionTypes.LoadShippingAddressState;
    constructor(public payload: string) { }
}
export class LoadShippingAddressStateSuccess implements Action {
    readonly type = CompanyInfoActionTypes.LoadShippingAddressStateSuccess;
    constructor(public payload: AddressState[]) { }
}
export class LoadShippingAddressStateFail implements Action {
    readonly type = CompanyInfoActionTypes.LoadShippingAddressStateFail;
    constructor(public payload: string) { }
}
export class LoadBillingAddressState implements Action {
    readonly type = CompanyInfoActionTypes.LoadBillingAddressState;
    constructor(public payload: string) { }
}
export class LoadBillingAddressStateSuccess implements Action {
    readonly type = CompanyInfoActionTypes.LoadBillingAddressStateSuccess;
    constructor(public payload: AddressState[]) { }
}
export class LoadBillingAddressStateFail implements Action {
    readonly type = CompanyInfoActionTypes.LoadBillingAddressStateFail;
    constructor(public payload: string) { }
}
export class UpdateCompanyInfoShippingAddress implements Action {
    readonly type = CompanyInfoActionTypes.UpdateCompanyInfoShippingAddress;
    constructor(public payload: CompanyInfo) { }
}
export class UpdateCompanyInfoShippingAddressSuccess implements Action {
    readonly type = CompanyInfoActionTypes.UpdateCompanyInfoShippingAddressSuccess;
    constructor(public payload: CompanyInfo) { }
}
export class UpdateCompanyInfoShippingAddressFail implements Action {
    readonly type = CompanyInfoActionTypes.UpdateCompanyInfoShippingAddressFail;
    constructor(public payload: string) { }
}
export class UpdateCompanyInfoBillingAddress implements Action {
    readonly type = CompanyInfoActionTypes.UpdateCompanyInfoBillingAddress;
    constructor(public payload: CompanyInfo) { }
}
export class UpdateCompanyInfoBillingAddressSuccess implements Action {
    readonly type = CompanyInfoActionTypes.UpdateCompanyInfoBillingAddressSuccess;
    constructor(public payload: CompanyInfo) { }
}
export class UpdateCompanyInfoBillingAddressFail implements Action {
    readonly type = CompanyInfoActionTypes.UpdateCompanyInfoBillingAddressFail;
    constructor(public payload: string) { }
}


// Union the valid types
export type CompanyInfoActions = LoadVendorBrands
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
    | LoadCompanyInfoFail
    | UpdateCompanyInfoShippingAddress
    | UpdateCompanyInfoShippingAddressSuccess
    | UpdateCompanyInfoShippingAddressFail
    | UpdateCompanyInfoBillingAddress
    | UpdateCompanyInfoBillingAddressSuccess
    | UpdateCompanyInfoBillingAddressFail;
