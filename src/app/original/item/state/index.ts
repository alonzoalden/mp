import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromItem from './item.reducer';
import { MatTableDataSource } from '@angular/material';
import {
    ItemOptionInsert,
    ItemSelectionInsert,
    ItemTierPriceInsert,
    ItemCrossSellInsert,
    ItemRelatedProductInsert,
    ItemUpSellInsert,
    ItemAttachmentInsert,
    ItemImageInsert,
    ItemVideoInsert,
    ItemBatch,
    Item,
    ItemPrintLabel,
    InventoryDetailSerialized
} from '../../../shared/class/item';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    item: fromItem.ItemState;
}

// Selector functions
const getItemFeatureState = createFeatureSelector<fromItem.ItemState>('Item');

export const getVendorBrandList = createSelector(
    getItemFeatureState,
    state => state.vendorBrandList
);
export const getSimpleItemList = createSelector(
    getItemFeatureState,
    state => state.simpleItemList
);
export const getItem = createSelector(
    getItemFeatureState,
    state => state.item
);
export const getItems = createSelector(
    getItemFeatureState,
    state => state.items
);
export const getItemsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<Item>(state.items)
);
export const getItemList = createSelector(
    getItemFeatureState,
    state => state.itemList
);
export const getItemBundleOptions = createSelector(
    getItemFeatureState,
    state => state.item ? state.item.ItemOptions : []
);
export const getItemBundleOptionsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemOptionInsert>(state.item ? state.item.ItemOptions : [])
);
export const getSelectedBundleOption = createSelector(
    getItemFeatureState,
    state => state.selectedBundleOption
);
export const getItemBundleOptionSelectionsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemSelectionInsert>(state.selectedBundleOptionSelectionList)
);
export const getItemTierPrices = createSelector(
    getItemFeatureState,
    state => state.item ? state.item.ItemTierPrices : []
);
export const getItemTierPricesMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemTierPriceInsert>(state.item.ItemTierPrices)
);
export const getItemCategories = createSelector(
    getItemFeatureState,
    state => state.itemCategories
);
export const getCategoryBreadCrumbs = createSelector(
    getItemFeatureState,
    state => state.currentCategoryBreadCrumbs
);
export const getAllItemList = createSelector(
    getItemFeatureState,
    state => state.allItemList
);
export const getAllItem = createSelector(
    getItemFeatureState,
    state => state.allItem
);
export const getItemRelatedProducts = createSelector(
    getItemFeatureState,
    state => state.item.ItemRelatedProducts
);
export const getItemRelatedProductsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemRelatedProductInsert>(state.item.ItemRelatedProducts)
);
export const getItemCrossSells = createSelector(
    getItemFeatureState,
    state => state.item.ItemCrossSells
);
export const getItemCrossSellsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemCrossSellInsert>(state.item.ItemCrossSells)
);
export const getItemUpSells = createSelector(
    getItemFeatureState,
    state => state.item.ItemUpSells
);
export const getItemUpSellsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemUpSellInsert>(state.item.ItemUpSells)
);
export const getVendorAttachmentList = createSelector(
    getItemFeatureState,
    state => state.vendorAttachmentsList
);
export const getItemAttachmentsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemAttachmentInsert>(state.item.ItemAttachments)
);
export const getItemImagesMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemImageInsert>(state.item.ItemImages)
);
export const getItemVideosMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemVideoInsert>(state.item.ItemVideos)
);
export const getCategoryAssignments = createSelector(
    getItemFeatureState,
    state => state.categoryAssignments
);
export const getItemBatch = createSelector(
    getItemFeatureState,
    state => state.itemBatch
);
export const getItemBatchMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemBatch>(state.itemBatch)
);
export const getItemBatchItems = createSelector(
    getItemFeatureState,
    state => state.itemBatchItems
);
export const getItemBatchUpdates = createSelector(
    getItemFeatureState,
    state => state.itemBatchUpdates
);
export const getItemPrintLabelsMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<ItemPrintLabel>(state.itemPrintLabels)
);
export const getIsLoading = createSelector(
    getItemFeatureState,
    state => state.isLoading
);
export const getIsMainItemsListLoading = createSelector(
    getItemFeatureState,
    state => state.isMainItemsListLoading
);
export const getItemRefurbishesMatTable = createSelector(
    getItemFeatureState,
    state => new MatTableDataSource<InventoryDetailSerialized>(state.item.InventoryDetailsSerialized)
);
export const getPendingDelete = createSelector(
    getItemFeatureState,
    state => state.pendingDelete
);
export const getPendingSave = createSelector(
    getItemFeatureState,
    state => state.pendingSave
);
export const getPendingAdd = createSelector(
    getItemFeatureState,
    state => state.pendingAdd
);
export const getIsVendorAttachmentsListLoading = createSelector(
    getItemFeatureState,
    state => state.isVendorAttachmentsListLoading
);
export const getIsItemListLoading = createSelector(
    getItemFeatureState,
    state => state.isItemListLoading
);
export const getIsEditItemBatchUpdateLoading = createSelector(
    getItemFeatureState,
    state => state.isEditItemBatchUpdateLoading
);
export const getError = createSelector(
    getItemFeatureState,
    state => state.error
);
