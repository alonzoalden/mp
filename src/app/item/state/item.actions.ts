import { Action } from '@ngrx/store';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { ItemInsert, ItemList } from '../../shared/class/item';

export enum ItemActionTypes {
  LoadVendorBrands = '[Item] Load Vendor Brands',
  LoadVendorBrandsSuccess = '[Item] Load Vendor Brands Success',
  LoadVendorBrandsFail = '[Item] Load Vendor Brands Fail',
  LoadSimpleItemList = '[Item] Load Simple Item List',
  LoadSimpleItemListSuccess = '[Item] Load Simple Item List Success',
  LoadSimpleItemListFail = '[Item] Load Simple Item List Fail',
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


export class LoadSimpleItemList implements Action {
  readonly type = ItemActionTypes.LoadSimpleItemList;
}

export class LoadSimpleItemListSuccess implements Action {
  readonly type = ItemActionTypes.LoadSimpleItemListSuccess;
  constructor(public payload: ItemList[]) { }
}

export class LoadSimpleItemListFail implements Action {
  readonly type = ItemActionTypes.LoadSimpleItemListFail;
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
| LoadSimpleItemList
| LoadSimpleItemListSuccess
| LoadSimpleItemListFail
| SetItem;