import { Action } from '@ngrx/store';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert, Item, ItemUpSellInsert, ItemCrossSellInsert, ItemRelatedProductInsert, ItemAttachmentInsert } from '../../shared/class/item';
import { Category } from 'app/shared/class/category';
import { ItemUpSell } from 'app/shared/class/item-up-sell';
import { VendorAttachment, VendorAttachmentList } from 'app/shared/class/vendor-attachment';

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
  LoadAllItemList = '[Item] Load All Item List',
  LoadAllItemListSuccess = '[Item] Load All Item List Success',
  LoadAllItemListFail  = '[Item] Load All Item List Fail',
  LoadAllItem = '[Item] Load All Item',
  LoadAllItemSuccess = '[Item] Load All Item Success',
  LoadAllItemFail  = '[Item] Load All Item Fail',
  LoadAllItemCrossSell = '[Item] Load All Item Cross Sell',
  LoadAllItemCrossSellSuccess = '[Item] Load All Item Cross Sell Success',
  LoadAllItemCrossSellFail  = '[Item] Load All Item Cross Sell Fail',
  LoadAllItemUpSell = '[Item] Load All Item Up Sell',
  LoadAllItemUpSellSuccess = '[Item] Load All Item Up Sell Success',
  LoadAllItemUpSellFail = '[Item] Load All Item Up Sell Fail',
  LoadItemRelatedProduct = '[Item] Load Item Related Product',
  LoadItemRelatedProductSuccess = '[Item] Load Item Related Product Success',
  LoadItemRelatedProductFail = '[Item] Load Item Related Product Fail',
  LoadVendorAttachmentList = '[Item] Load Vendor Attachment List',
  LoadVendorAttachmentListSuccess = '[Item] Load Vendor Attachment List Success',
  LoadVendorAttachmentListFail = '[Item] Load Vendor Attachment List Fail',
  LoadItemAttachment = '[Item] Load Item Attachment',
  LoadItemAttachmentSuccess = '[Item] Load Item Attachment Success',
  LoadItemAttachmentFail = '[Item] Load Item Attachment Fail',

  AddNewItemRelatedProductRow = '[Item] Add New Item Related Product Row',
  
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

export class LoadAllItemList implements Action {
  readonly type = ItemActionTypes.LoadAllItemList;
}

export class LoadAllItemListSuccess implements Action {
  readonly type = ItemActionTypes.LoadAllItemListSuccess;
  constructor(public payload: ItemList[]) { }
}

export class LoadAllItemListFail implements Action {
  readonly type = ItemActionTypes.LoadAllItemListFail;
  constructor(public payload: string) { }
}

export class LoadAllItem implements Action {
  readonly type = ItemActionTypes.LoadAllItem;
  constructor(public payload: ItemUpSellInsert | ItemCrossSellInsert) { }
}

export class LoadAllItemSuccess implements Action {
  readonly type = ItemActionTypes.LoadAllItemSuccess;
  constructor(public payload: Item) { }
}
export class LoadAllItemFail implements Action {
  readonly type = ItemActionTypes.LoadAllItemFail;
  constructor(public payload: string) { }
}

export class LoadAllItemCrossSell implements Action {
  readonly type = ItemActionTypes.LoadAllItemCrossSell;
  constructor(public payload: ItemCrossSellInsert) { }
}

export class LoadAllItemCrossSellSuccess implements Action {
  readonly type = ItemActionTypes.LoadAllItemCrossSellSuccess;
  constructor(public payload: Item) { }
}
export class LoadAllItemCrossSellFail implements Action {
  readonly type = ItemActionTypes.LoadAllItemCrossSellFail;
  constructor(public payload: string) { }
}

export class LoadAllItemUpSell implements Action {
  readonly type = ItemActionTypes.LoadAllItemUpSell;
  constructor(public payload: ItemUpSellInsert) { }
}
export class LoadAllItemUpSellSuccess implements Action {
  readonly type = ItemActionTypes.LoadAllItemUpSellSuccess;
  constructor(public payload: Item) { }
}
export class LoadAllItemUpSellFail implements Action {
  readonly type = ItemActionTypes.LoadAllItemUpSellFail;
  constructor(public payload: string) { }
}

export class LoadItemRelatedProduct implements Action {
  readonly type = ItemActionTypes.LoadItemRelatedProduct;
  constructor(public payload: ItemRelatedProductInsert) { }
}
export class LoadItemRelatedProductSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemRelatedProductSuccess;
  constructor(public payload: Item) { }
}
export class LoadItemRelatedProductFail implements Action {
  readonly type = ItemActionTypes.LoadItemRelatedProductFail;
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
export class LoadVendorAttachmentList implements Action {
  readonly type = ItemActionTypes.LoadVendorAttachmentList;
}

export class LoadVendorAttachmentListSuccess implements Action {
  readonly type = ItemActionTypes.LoadVendorAttachmentListSuccess;
  constructor(public payload: VendorAttachmentList[]) { }
}

export class LoadVendorAttachmentListFail implements Action {
  readonly type = ItemActionTypes.LoadVendorAttachmentListFail;
  constructor(public payload: string) { }
}
export class LoadItemAttachment implements Action {
  readonly type = ItemActionTypes.LoadItemAttachment;
  constructor(public payload: ItemAttachmentInsert) { }
}

export class LoadItemAttachmentSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemAttachmentSuccess;
  constructor(public payload: VendorAttachment) { }
}

export class LoadItemAttachmentFail implements Action {
  readonly type = ItemActionTypes.LoadItemAttachmentFail;
  constructor(public payload: string) { }
}



export class AddNewItemRelatedProductRow implements Action {
  readonly type = ItemActionTypes.AddNewItemRelatedProductRow;
  constructor(public payload: ItemRelatedProductInsert) { }
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
| LoadAllItemList
| LoadAllItemListSuccess
| LoadAllItemListFail
| LoadAllItem
| LoadAllItemSuccess
| LoadAllItemFail
| LoadAllItemCrossSell
| LoadAllItemCrossSellSuccess
| LoadAllItemCrossSellFail
| LoadAllItemUpSell
| LoadAllItemUpSellSuccess
| LoadAllItemUpSellFail
| LoadItemCategories
| LoadItemCategoriesSuccess
| LoadItemCategoriesFail
| LoadCategoryBreadCrumbs
| LoadCategoryBreadCrumbsSuccess
| LoadCategoryBreadCrumbsFail
| LoadItemRelatedProduct
| LoadItemRelatedProductSuccess
| LoadItemRelatedProductFail
| LoadVendorAttachmentList
| LoadVendorAttachmentListSuccess
| LoadVendorAttachmentListFail
| LoadItemAttachment
| LoadItemAttachmentSuccess
| LoadItemAttachmentFail
| SetItem
| SetSelectedBundleOption
| AddNewItemRelatedProductRow;