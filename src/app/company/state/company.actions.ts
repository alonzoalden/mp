import { CompanyInfo } from '../../shared/class/company-info';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { AddressCountry, AddressState } from '../../shared/class/address';
/* NgRx */
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

  LoadAddressState = '[Company] Load Address State',
  LoadAddressStateSuccess = '[Company] Load Address Country Success',
  LoadAddressStateFail = '[Company] Load Address Country Fail',
  // SetCurrentItemVariationListing = '[Company] Set Current Item Variation Listing',
  // GetCurrentItemVariationListing = '[Company] Get Current Item Variation Listing',
  // GetCurrentItemVariationListingSuccess = '[Company] Get Current Item Variation Listing Success',
  // GetCurrentItemVariationListingFail = '[Company] Get Current Item Variation Listing Fail',
  // ClearCurrentItemVariationListing = '[Company] Clear Current Item Variation Listing',
  // UpdateItemVariationListing = '[Company] Update Item Variation',
  // UpdateItemVariationListingSuccess = '[Company] Update Item Variation Success',
  // UpdateItemVariationListingFail = '[Company] Update Item Variation Fail',
  // CreateItemVariationListing = '[Company] Create Item Variation',
  // CreateItemVariationListingSuccess = '[Company] Create Item Variation Success',
  // CreateItemVariationListingFail = '[Company] Create Item Variation Fail',
  // DeleteItemVariationListing = '[Company] Delete Item Variation',
  // DeleteItemVariationListingSuccess = '[Company] Delete Item Variation Success',
  // DeleteItemVariationListingFail = '[Company] Delete Item Variation Fail',
  // GetItemList = '[Company] Get Item Attributes',
  // GetItemListSuccess = '[Company] Get Item List Success',
  // GetItemListFail = '[Company] Get Item List Fail',
  // GetItemAttributes = '[Company] Get Item Attributes',
  // GetItemAttributesSuccess = '[Company] Get Item Attributes Success',
  // GetItemAttributesFail = '[Company] Get Item Attributes Fail',
  // PendingSave = '[Company] Pending Save',
  // PendingDelete = '[Company] Pending Delete',
  SetLoadingStatus =  '[Company] Set Loading Status',


}

// Action Creators
// export class PendingSave implements Action {
//   readonly type = CompanyActionTypes.PendingSave;

//   constructor(public payload: boolean) { }
// }
// export class PendingDelete implements Action {
//   readonly type = CompanyActionTypes.PendingDelete;

//   constructor(public payload: boolean) { }
// }
export class SetLoadingStatus implements Action {
  readonly type = CompanyActionTypes.SetLoadingStatus;
  constructor(public payload: boolean) { }
}

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
  readonly type = CompanyActionTypes.LoadCompanyInfoFail;
  constructor(public payload: string) { }
}
export class LoadAddressState implements Action {
  readonly type = CompanyActionTypes.LoadAddressState;
  constructor(public payload: string) { }
}

export class LoadAddressStateSuccess implements Action {
  readonly type = CompanyActionTypes.LoadAddressStateSuccess;
  constructor(public payload: AddressState[]) { }
}

export class LoadAddressStateFail implements Action {
  readonly type = CompanyActionTypes.LoadAddressStateFail;
  constructor(public payload: string) { }
}
// export class UpdateItemVariationListing implements Action {
//   readonly type = CompanyActionTypes.UpdateItemVariationListing;

//   constructor(public payload: ItemVariationListing) { }
// }

// export class UpdateItemVariationListingSuccess implements Action {
//   readonly type = CompanyActionTypes.UpdateItemVariationListingSuccess;

//   constructor(public payload: ItemVariationListing) { }
// }

// export class UpdateItemVariationListingFail implements Action {
//   readonly type = CompanyActionTypes.UpdateItemVariationListingFail;

//   constructor(public payload: string) { }
// }

// export class CreateItemVariationListing implements Action {
//   readonly type = CompanyActionTypes.CreateItemVariationListing;

//   constructor(public payload: ItemVariationListing) { }
// }

// export class CreateItemVariationListingSuccess implements Action {
//   readonly type = CompanyActionTypes.CreateItemVariationListingSuccess;

//   constructor(public payload: ItemVariationListing) { }
// }

// export class CreateItemVariationListingFail implements Action {
//   readonly type = CompanyActionTypes.CreateItemVariationListingFail;

//   constructor(public payload: string) { }
// }

// export class DeleteItemVariationListing implements Action {
//   readonly type = CompanyActionTypes.DeleteItemVariationListing;

//   constructor(public payload: number) { }
// }

// export class DeleteItemVariationListingSuccess implements Action {
//   readonly type = CompanyActionTypes.DeleteItemVariationListingSuccess;

//   constructor(public payload: number) { }
// }

// export class DeleteItemVariationListingFail implements Action {
//   readonly type = CompanyActionTypes.DeleteItemVariationListingFail;

//   constructor(public payload: string) { }
// }

// export class GetItemList implements Action {
//   readonly type = CompanyActionTypes.GetItemList;
// }

// export class GetItemListSuccess implements Action {
//   readonly type = CompanyActionTypes.GetItemListSuccess;

//   constructor(public payload: ItemList[]) { }
// }

// export class GetItemListFail implements Action {
//   readonly type = CompanyActionTypes.GetItemListFail;

//   constructor(public payload: string) { }
// }

// export class GetItemAttributes implements Action {
//   readonly type = CompanyActionTypes.GetItemAttributes;
// }

// export class GetItemAttributesSuccess implements Action {
//   readonly type = CompanyActionTypes.GetItemAttributesSuccess;

//   constructor(public payload: ItemAttribute[]) { }
// }

// export class GetItemAttributesFail implements Action {
//   readonly type = CompanyActionTypes.GetItemAttributesFail;

//   constructor(public payload: string) { }
// }
// export class SetCurrentItemVariationListing implements Action {
//   readonly type = CompanyActionTypes.SetCurrentItemVariationListing;

//   constructor(public payload: ItemVariationListing) { }
// }
// export class GetCurrentItemVariationListing implements Action {
//   readonly type = CompanyActionTypes.GetCurrentItemVariationListing;
//   constructor(public payload: number) { }
// }
// export class GetCurrentItemVariationListingSuccess implements Action {
//   readonly type = CompanyActionTypes.GetCurrentItemVariationListingSuccess;

//   constructor(public payload: ItemVariationListing) { }
// }
// export class GetCurrentItemVariationListingFail implements Action {
//   readonly type = CompanyActionTypes.GetCurrentItemVariationListingFail;

//   constructor(public payload: string) { }
// }

// export class ClearCurrentItemVariationListing implements Action {
//   readonly type = CompanyActionTypes.ClearCurrentItemVariationListing;
// }

// Union the valid types
export type CompanyActions = LoadVendorBrands
  | LoadVendorBrandsSuccess
  | LoadVendorBrandsFail
  | SetLoadingStatus
  | LoadAddressCountry
  | LoadAddressCountrySuccess
  | LoadAddressCountryFail
  | LoadAddressState
  | LoadAddressStateSuccess
  | LoadAddressStateFail;
  // ToggleProductCode
  // | SetCurrentProduct
  // | ClearCurrentProduct
  // | InitializeCurrentProduct
  
  
  
  
  
  

