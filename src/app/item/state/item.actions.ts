import { Action } from '@ngrx/store';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert, Item, ItemUpSellInsert, ItemCrossSellInsert, ItemRelatedProductInsert, ItemAttachmentInsert, ItemVideoInsert, ItemCategoryAssignment, ItemTierPrice, ItemBatch, ItemPrintLabel } from '../../shared/class/item';
import { Category } from 'app/shared/class/category';
import { ItemUpSell } from 'app/shared/class/item-up-sell';
import { VendorAttachment, VendorAttachmentList } from 'app/shared/class/vendor-attachment';
import { URLVideo, ItemVideo } from 'app/shared/class/item-video';
import { BatchUpdate, BatchUpdateValue } from 'app/shared/class/batch-update';

export enum ItemActionTypes {
  LoadVendorBrands = '[Item] Load Vendor Brands',
  LoadVendorBrandsSuccess = '[Item] Load Vendor Brands Success',
  LoadVendorBrandsFail = '[Item] Load Vendor Brands Fail',
  LoadItemList = '[Item Print Label] Load Item List',
  LoadItemListSuccess = '[Item Print Label] Load Item List Success',
  LoadItemListFail = '[Item Print Label] Load Item List Fail',
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
  LoadVideoURLDetail = '[Item] Load Video URL Detail',
  LoadVideoURLDetailSuccess = '[Item] Load Video URL Detail Success',
  LoadVideoURLDetailFail  = '[Item] Load Video URL Detail Fail',
  LoadItem = '[Item] Load Item',
  LoadItemSuccess = '[Item] Load Item Success',
  LoadItemFail = '[Item] Load Item Fail',
  LoadItems = '[Item] Load Items',
  LoadItemsSuccess = '[Item] Load Items Success',
  LoadItemsFail = '[Item] Load Items Fail',
  LoadMainItems = '[Item Batch] Load Main Items',
  LoadMainItemsSuccess = '[Item Batch] Load Main Items Success',
  LoadMainItemsFail = '[Item Batch] Load Main Items Fail',
  LoadRefreshItems = '[Item] Load Refresh Items',
  LoadRefreshItemsSuccess = '[Item] Load Refresh Items Success',
  LoadRefreshItemsFail = '[Item] Load Refresh Items Fail',
  AddItem = '[Item] Add Item',
  AddItemSuccess = '[Item] Add Item Success',
  AddItemFail = '[Item] Add Item Fail',
  EditItem = '[Item] Edit Item',
  EditItemSuccess = '[Item] Edit Item Success',
  EditItemFail = '[Item] Edit Item Fail',
  DeleteItem = '[Item] Delete Item',
  DeleteItemSuccess = '[Item] Delete Item Success',
  DeleteItemFail = '[Item] Delete Item Fail',
  DownloadItemLabel = '[Item] Download Item Label',
  DownloadItemLabelSuccess = '[Item] Download Item Label',
  DownloadItemLabelFail = '[Item] Download Item Label',
  DownloadItemTemplate = '[Item] Download Item Template',
  DownloadItemTemplateSuccess = '[Item] Download Item Template Success',
  DownloadItemTemplateFail = '[Item] Download Item Template Fail',
  LoadItemCategoryAssignments = '[Item] Load Item Category Assignments',
  LoadItemCategoryAssignmentsSuccess = '[Item] Load Item Category Assignments Success',
  LoadItemCategoryAssignmentsFail = '[Item] Load Item Category Assignments Fail',
  LoadItemTierPrices = '[Item] Load Item Tier Prices',
  LoadItemTierPricesSuccess = '[Item] Load Item Tier Prices Success',
  LoadItemTierPricesFail = '[Item] Load Item Tier Prices Fail',
  LoadPendingItems = '[Item Batch] Load Pending Items',
  LoadPendingItemsSuccess = '[Item Batch] Load Pending Items Success',
  LoadPendingItemsFail = '[Item Batch] Load Pending Items Fail',
  EditItemBatch = '[Item Batch] Edit Item Batch',
  EditItemBatchSuccess = '[Item Batch] Edit Item Batch Success',
  EditItemBatchFail = '[Item Batch] Edit Item Batch Fail',
  LoadItemBatchItems = '[Item Batch] Load Item Batch Items',
  LoadItemBatchItemsSuccess = '[Item Batch] Load Item Batch Items Success',
  LoadItemBatchItemsFail = '[Item Batch] Load Item Batch Items Fail',
  LoadItemBatchUpdate = '[Item Batch] Load Item Batch Update',
  LoadItemBatchUpdateSuccess = '[Item Batch] Load Item Batch Update Success',
  LoadItemBatchUpdateFail = '[Item Batch] Load Item Batch Update Fail',
  EditItemBatchUpdate = '[Item Batch] Edit Item Batch Update',
  EditItemBatchUpdateSuccess = '[Item Batch] Edit Item Batch Update Success',
  EditItemBatchUpdateFail = '[Item Batch] Edit Item Batch Update Fail',
  AddNewItemRelatedProductRow = '[Item] Add New Item Related Product Row',
  DownloadItemLabelCount = '[Item] Download Item Label Count',
  DownloadItemLabelCountSuccess = '[Item] Download Item Label Count Success',
  DownloadItemLabelCountFail = '[Item] Download Item Label Count Fail',
  DownloadItemLargeLabelCount = '[Item] Download Item Large Label Count',
  DownloadItemLargeLabelCountSuccess = '[Item] Download Item Large Label Count Success',
  DownloadItemLargeLabelCountFail = '[Item] Download Item Large Label Count Fail',
  DownloadItemPrintLabel = '[Item Print Label] Download Item Print Label',
  DownloadItemPrintLabelSuccess = '[Item Print Label] Download Item Print Label Success',
  DownloadItemPrintLabelFail = '[Item Print Label] Download Item Print Label Fail',
  DownloadPrintItemLargeLabels = '[Item Print Label] Download Print Item Large Labels',
  DownloadPrintItemLargeLabelsSuccess = '[Item Print Label] Download Print Item Large Labels Success',
  DownloadPrintItemLargeLabelsFail = '[Item Print Label] Download Print Item Large Labels Fail',

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

export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems;
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemsSuccess;
  constructor(public payload: ItemList[]) { }
}

export class LoadItemsFail implements Action {
  readonly type = ItemActionTypes.LoadItemsFail;
  constructor(public payload: string) { }
}

export class LoadRefreshItems implements Action {
  readonly type = ItemActionTypes.LoadRefreshItems;
}

export class LoadRefreshItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadRefreshItemsSuccess;
  constructor(public payload: Item[]) { }
}

export class LoadRefreshItemsFail implements Action {
  readonly type = ItemActionTypes.LoadRefreshItemsFail;
  constructor(public payload: string) { }
}



export class LoadMainItems implements Action {
  readonly type = ItemActionTypes.LoadMainItems;
}

export class LoadMainItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadMainItemsSuccess;
  constructor(public payload: Item[]) { }
}

export class LoadMainItemsFail implements Action {
  readonly type = ItemActionTypes.LoadMainItemsFail;
  constructor(public payload: string) { }
}


export class LoadItemList implements Action {
  readonly type = ItemActionTypes.LoadItemList;
}

export class LoadItemListSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemListSuccess;
  constructor(public payload: ItemList[]) { }
}

export class LoadItemListFail implements Action {
  readonly type = ItemActionTypes.LoadItemListFail;
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

export class LoadVideoURLDetail implements Action {
  readonly type = ItemActionTypes.LoadVideoURLDetail;
  constructor(public payload: ItemVideoInsert) { }
}

export class LoadVideoURLDetailSuccess implements Action {
  readonly type = ItemActionTypes.LoadVideoURLDetailSuccess;
  constructor(public payload: URLVideo) { }
}

export class LoadVideoURLDetailFail implements Action {
  readonly type = ItemActionTypes.LoadVideoURLDetailFail;
  constructor(public payload: { row: ItemVideo, error: string}) { }
}

export class LoadItemCategoryAssignments implements Action {
  readonly type = ItemActionTypes.LoadItemCategoryAssignments;
  constructor(public payload: number) { }
}

export class LoadItemCategoryAssignmentsSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemCategoryAssignmentsSuccess;
  constructor(public payload: ItemCategoryAssignment[]) { }
}

export class LoadItemCategoryAssignmentsFail implements Action {
  readonly type = ItemActionTypes.LoadItemCategoryAssignmentsFail;
  constructor(public payload: string) { }
}

export class LoadItem implements Action {
  readonly type = ItemActionTypes.LoadItem;
  constructor(public payload: number) { }
}

export class LoadItemSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemSuccess;
  constructor(public payload: Item) { }
}

export class LoadItemFail implements Action {
  readonly type = ItemActionTypes.LoadItemFail;
  constructor(public payload: string) { }
}

export class LoadItemTierPrices implements Action {
  readonly type = ItemActionTypes.LoadItemTierPrices;
  constructor(public payload: number) { }
}

export class LoadItemTierPricesSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemTierPricesSuccess;
  constructor(public payload: ItemTierPrice[]) { }
}

export class LoadItemTierPricesFail implements Action {
  readonly type = ItemActionTypes.LoadItemTierPricesFail;
  constructor(public payload: string) { }
}

export class LoadPendingItems implements Action {
  readonly type = ItemActionTypes.LoadPendingItems;
}

export class LoadPendingItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadPendingItemsSuccess;
  constructor(public payload: ItemBatch[]) { }
}

export class LoadPendingItemsFail implements Action {
  readonly type = ItemActionTypes.LoadPendingItemsFail;
  constructor(public payload: string) { }
}

export class LoadItemBatchItems implements Action {
  readonly type = ItemActionTypes.LoadItemBatchItems;
}

export class LoadItemBatchItemsSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemBatchItemsSuccess;
  constructor(public payload: Item[]) { }
}

export class LoadItemBatchItemsFail implements Action {
  readonly type = ItemActionTypes.LoadItemBatchItemsFail;
  constructor(public payload: string) { }
}

export class LoadItemBatchUpdate implements Action {
  readonly type = ItemActionTypes.LoadItemBatchUpdate;
}

export class LoadItemBatchUpdateSuccess implements Action {
  readonly type = ItemActionTypes.LoadItemBatchUpdateSuccess;
  constructor(public payload: BatchUpdate[]) { }
}

export class LoadItemBatchUpdateFail implements Action {
  readonly type = ItemActionTypes.LoadItemBatchUpdateFail;
  constructor(public payload: string) { }
}

export class EditItemBatch implements Action {
  readonly type = ItemActionTypes.EditItemBatch;
  constructor(public payload: ItemBatch[]) { }
}

export class EditItemBatchSuccess implements Action {
  readonly type = ItemActionTypes.EditItemBatchSuccess;
  constructor(public payload: { itembatch: ItemBatch[], updateditems: ItemBatch[]}) { }
}

export class EditItemBatchFail implements Action {
  readonly type = ItemActionTypes.EditItemBatchFail;
  constructor(public payload: string) { }
}
export class EditItemBatchUpdate implements Action {
  readonly type = ItemActionTypes.EditItemBatchUpdate;
  constructor(public payload: BatchUpdateValue[]) { }
}

export class EditItemBatchUpdateSuccess implements Action {
  readonly type = ItemActionTypes.EditItemBatchUpdateSuccess;
  constructor(public payload: BatchUpdateValue[]) { }
}

export class EditItemBatchUpdateFail implements Action {
  readonly type = ItemActionTypes.EditItemBatchUpdateFail;
  constructor(public payload: string) { }
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.AddItem;
  constructor(public payload: ItemInsert) { }
}

export class AddItemSuccess implements Action {
  readonly type = ItemActionTypes.AddItemSuccess;
  constructor(public payload: Item) { }
}

export class AddItemFail implements Action {
  readonly type = ItemActionTypes.AddItemFail;
  constructor(public payload: string) { }
}


export class EditItem implements Action {

  readonly type = ItemActionTypes.EditItem;
  constructor(public payload: {item: Item, displayPreview: boolean, printLabel: boolean}) { }
}

export class EditItemSuccess implements Action {
  readonly type = ItemActionTypes.EditItemSuccess;
  constructor(public payload: Item) { }
}

export class EditItemFail implements Action {
  readonly type = ItemActionTypes.EditItemFail;
  constructor(public payload: string) { }
}


export class DeleteItem implements Action {
  readonly type = ItemActionTypes.DeleteItem;
  constructor(public payload: Item) { }
}

export class DeleteItemSuccess implements Action {
  readonly type = ItemActionTypes.DeleteItemSuccess;
  constructor(public payload: number) { }
}

export class DeleteItemFail implements Action {
  readonly type = ItemActionTypes.DeleteItemFail;
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
export class DownloadItemLabel implements Action {
  readonly type = ItemActionTypes.DownloadItemLabel;
  constructor(public payload: Item) { }
}
export class DownloadItemLabelSuccess implements Action {
  readonly type = ItemActionTypes.DownloadItemLabelSuccess;
  constructor(public payload: Blob) { }
}
export class DownloadItemLabelFail implements Action {
  readonly type = ItemActionTypes.DownloadItemLabelFail;
  constructor(public payload: string) { }
}

export class DownloadItemLabelCount implements Action {
  readonly type = ItemActionTypes.DownloadItemLabelCount;
  constructor(public payload: {item: Item, count: number, border: string}) { }
}
export class DownloadItemLabelCountSuccess implements Action {
  readonly type = ItemActionTypes.DownloadItemLabelCountSuccess;
  constructor(public payload: Blob) { }
}
export class DownloadItemLabelCountFail implements Action {
  readonly type = ItemActionTypes.DownloadItemLabelCountFail;
  constructor(public payload: string) { }
}

export class DownloadItemLargeLabelCount implements Action {
  readonly type = ItemActionTypes.DownloadItemLargeLabelCount;
  constructor(public payload: {item: Item, count: number, border: string}) { }
}
export class DownloadItemLargeLabelCountSuccess implements Action {
  readonly type = ItemActionTypes.DownloadItemLargeLabelCountSuccess;
  constructor(public payload: Blob) { }
}
export class DownloadItemLargeLabelCountFail implements Action {
  readonly type = ItemActionTypes.DownloadItemLargeLabelCountFail;
  constructor(public payload: string) { }
}

export class DownloadItemTemplate implements Action {
  readonly type = ItemActionTypes.DownloadItemTemplate;
}
export class DownloadItemTemplateSuccess implements Action {
  readonly type = ItemActionTypes.DownloadItemTemplateSuccess;
  constructor(public payload: Blob) { }
}
export class DownloadItemTemplateFail implements Action {
  readonly type = ItemActionTypes.DownloadItemTemplateFail;
  constructor(public payload: string) { }
}

export class DownloadItemPrintLabel implements Action {
  readonly type = ItemActionTypes.DownloadItemPrintLabel;
  constructor(public payload: { labels: ItemPrintLabel[], border: string}) { }
}
export class DownloadItemPrintLabelSuccess implements Action {
  readonly type = ItemActionTypes.DownloadItemPrintLabelSuccess;
  constructor(public payload: Blob) { }
}
export class DownloadItemPrintLabelFail implements Action {
  readonly type = ItemActionTypes.DownloadItemPrintLabelFail;
  constructor(public payload: string) { }
}
export class DownloadPrintItemLargeLabels implements Action {
  readonly type = ItemActionTypes.DownloadPrintItemLargeLabels;
  constructor(public payload: { labels: ItemPrintLabel[], border: string}) { }
}
export class DownloadPrintItemLargeLabelsSuccess implements Action {
  readonly type = ItemActionTypes.DownloadPrintItemLargeLabelsSuccess;
  constructor(public payload: Blob) { }
}
export class DownloadPrintItemLargeLabelsFail implements Action {
  readonly type = ItemActionTypes.DownloadPrintItemLargeLabelsFail;
  constructor(public payload: string) { }
}


// Union the valid types
export type ItemActions = LoadVendorBrands
| LoadVendorBrandsSuccess
| LoadVendorBrandsFail
| LoadMainItems
| LoadMainItemsSuccess
| LoadMainItemsFail
| LoadItemList
| LoadItemListSuccess
| LoadItemListFail
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
| LoadVideoURLDetail
| LoadVideoURLDetailSuccess
| LoadVideoURLDetailFail
| LoadItem
| LoadItemSuccess
| LoadItemFail
| LoadItems
| LoadItemsSuccess
| LoadItemsFail
| LoadRefreshItems
| LoadRefreshItemsSuccess
| LoadRefreshItemsFail
| AddItem
| AddItemSuccess
| AddItemFail
| EditItem
| EditItemSuccess
| EditItemFail
| DeleteItem
| DeleteItemSuccess
| DeleteItemFail
| SetItem
| SetSelectedBundleOption
| DownloadItemLabel
| DownloadItemLabelSuccess
| DownloadItemLabelFail
| DownloadItemLabelCount
| DownloadItemLabelCountSuccess
| DownloadItemLabelCountFail
| DownloadItemLargeLabelCount
| DownloadItemLargeLabelCountSuccess
| DownloadItemLargeLabelCountFail
| DownloadItemTemplate
| DownloadItemTemplateSuccess
| DownloadItemTemplateFail
| DownloadItemPrintLabel
| DownloadItemPrintLabelSuccess
| DownloadItemPrintLabelFail
| DownloadPrintItemLargeLabels
| DownloadPrintItemLargeLabelsSuccess
| DownloadPrintItemLargeLabelsFail
| LoadItemCategoryAssignments
| LoadItemCategoryAssignmentsSuccess
| LoadItemCategoryAssignmentsFail
| LoadItemTierPrices
| LoadItemTierPricesSuccess
| LoadItemTierPricesFail
| LoadPendingItems
| LoadPendingItemsSuccess
| LoadPendingItemsFail
| EditItemBatch
| EditItemBatchSuccess
| EditItemBatchFail
| LoadItemBatchItems
| LoadItemBatchItemsSuccess
| LoadItemBatchItemsFail
| LoadItemBatchUpdate
| LoadItemBatchUpdateSuccess
| LoadItemBatchUpdateFail
| EditItemBatchUpdate
| EditItemBatchUpdateSuccess
| EditItemBatchUpdateFail
| AddNewItemRelatedProductRow;
