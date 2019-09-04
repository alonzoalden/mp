import { Action } from '@ngrx/store';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { ItemInsert } from '../../shared/class/item';

export enum ItemActionTypes {
  LoadVendorBrands = '[Item] Load Vendor Brands',
  LoadVendorBrandsSuccess = '[Item] Load Vendor Brands Success',
  LoadVendorBrandsFail = '[Item] Load Vendor Brands Fail',
  SetItem = '[Item] Set Item',
  
}

// Action Creators
export class LoadVendorBrands implements Action {
  readonly type = ItemActionTypes.LoadVendorBrands;
}

export class LoadVendorBrandsSuccess implements Action {
  readonly type = ItemActionTypes.LoadVendorBrandsSuccess;
  constructor(public payload: VendorBrand[]) { }
}

export class LoadVendorBrandsFail implements Action {
  readonly type = ItemActionTypes.LoadVendorBrandsFail;
  constructor(public payload: string) { }
}

export class SetItem implements Action {
  readonly type = ItemActionTypes.SetItem;
  constructor(public payload: ItemInsert) { }
}

// Union the valid types
export type ItemActions = LoadVendorBrands
| LoadVendorBrandsSuccess
| LoadVendorBrandsFail
| SetItem;