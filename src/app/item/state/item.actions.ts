import { Action } from '@ngrx/store';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert } from '../../shared/class/item';
import { Category } from 'app/shared/class/category';

export enum ItemActionTypes {
  LoadVendorBrands = '[Item] Load Vendor Brands',
  LoadVendorBrandsSuccess = '[Item] Load Vendor Brands Success',
  LoadVendorBrandsFail = '[Item] Load Vendor Brands Fail',
  LoadSimpleItemList = '[Item] Load Simple Item List',
  LoadSimpleItemListSuccess = '[Item] Load Simple Item List Success',
  LoadSimpleItemListFail = '[Item] Load Simple Item List Fail',
  LoadItemCategories = '[Item] Load Item Categories',
  LoadItemCategoriesSuccess = '[Item] Load Item Categories Success',
  LoadItemCategoriesFail = '[Item] Load Item Categories Fail',
  LoadCategoryBreadCrumbs = '[Item] Load Category Bread Crumbs',
  LoadCategoryBreadCrumbsSuccess = '[Item] Load Category Bread Crumbs Success',
  LoadCategoryBreadCrumbsFail = '[Item] Load Category Bread Crumbs Fail',
  SetItem = '[Item] Set Item',
  SetSelectedBundleOption = '[Item] Set Selected Bundle Option',
  SetSelectedBundleOptionList = '[Item] Set Selected Bundle Option List',
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

export class LoadItemCategories implements Action {
  readonly type = ItemActionTypes.LoadItemCategories;
  constructor(public payload: number) { }
}

export class LoadItemCategoriesSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemCategoriesSuccess;
  constructor(public payload: Category[]) { }
}

export class LoadItemCategoriesFail implements Action {
  readonly type = ItemActionTypes.LoadItemCategoriesFail;
  constructor(public payload: string) { }
}

export class LoadCategoryBreadCrumbs implements Action {
  readonly type = ItemActionTypes.LoadCategoryBreadCrumbs;
  constructor(public payload: number) { }
}

export class LoadCategoryBreadCrumbsSuccess implements Action {
  readonly type = ItemActionTypes.LoadCategoryBreadCrumbsSuccess;
  constructor(public payload: Category[]) { }
}

export class LoadCategoryBreadCrumbsFail implements Action {
  readonly type = ItemActionTypes.LoadCategoryBreadCrumbsFail;
  constructor(public payload: string) { }
}



export class SetSelectedBundleOption implements Action {
  readonly type = ItemActionTypes.SetSelectedBundleOption;
  constructor(public payload: number) { }
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
| LoadItemCategories
| LoadItemCategoriesSuccess
| LoadItemCategoriesFail
| LoadCategoryBreadCrumbs
| LoadCategoryBreadCrumbsSuccess
| LoadCategoryBreadCrumbsFail
| SetItem
| SetSelectedBundleOption;