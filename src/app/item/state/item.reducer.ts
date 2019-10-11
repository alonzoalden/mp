import { ItemActionTypes, ItemActions } from './item.actions';
import { ItemInsert, ItemList, ItemOptionInsert, ItemSelectionInsert, ItemCategoryAssignment, Item, ItemBatch, ItemPrintLabel } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { Category } from 'app/shared/class/category';
import { VendorAttachmentList } from 'app/shared/class/vendor-attachment';
import { BatchUpdate } from 'app/shared/class/batch-update';

// State for this feature (Item Variation)
export interface ItemState {
    vendorBrandList: VendorBrand[];
    itemList: ItemList[];
    simpleItemList: ItemList[];
    item: ItemInsert | Item;
    items: Item[];
    selectedBundleOption: ItemOptionInsert;
    selectedBundleOptionSelectionList: ItemSelectionInsert[];
    itemCategories: Array<Category[]>;
    categoryBreadCrumbs: Array<Category[]>;
    allItemList: ItemList[];
    allItem: Item;
    vendorAttachmentsList: VendorAttachmentList[];
    categoryAssignments: ItemCategoryAssignment[];
    itemBatch: ItemBatch[];
    itemBatchItems: Item[];
    itemBatchUpdates: BatchUpdate[];
    itemPrintLabels: ItemPrintLabel[];
    isLoading: boolean;
    isVendorAttachmentsListLoading: boolean;
    isItemListLoading: boolean;
    pendingDelete: boolean;
    pendingSave: boolean;
    pendingAdd: boolean;
    error: string;
}

const initialState: ItemState = {
    vendorBrandList: [],
    itemList: [],
    simpleItemList: [],
    item: null,
    items: [],
    selectedBundleOption: null,
    selectedBundleOptionSelectionList: [],
    itemCategories: [],
    categoryBreadCrumbs: [],
    allItemList: [],
    allItem: null,
    vendorAttachmentsList: [],
    categoryAssignments: [],
    itemBatch: [],
    itemBatchItems: [],
    itemBatchUpdates: [],
    itemPrintLabels: [],
    isLoading: true,
    isVendorAttachmentsListLoading: false,
    isItemListLoading: false,
    pendingDelete: false,
    pendingSave: false,
    pendingAdd: false,
    error: ''
};

export function itemReducer(state = initialState, action: ItemActions): ItemState {

    switch (action.type) {

        case ItemActionTypes.SetItem:
            return {
                ...state,
                item: action.payload
            };
        case ItemActionTypes.SetSelectedBundleOption:
            return {
                ...state,
                selectedBundleOption: state.item.ItemOptions[action.payload],
                selectedBundleOptionSelectionList: state.item.ItemOptions[action.payload].ItemSelections
            };

        case ItemActionTypes.LoadVendorBrandsSuccess:
            return {
                ...state,
                vendorBrandList: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadVendorBrandsFail:
            return {
                ...state,
                vendorBrandList: [],
                error: action.payload,
            };
        case ItemActionTypes.LoadItemList:
            return {
                ...state,
                isItemListLoading: true,
                error: '',
            };
        case ItemActionTypes.LoadItemListSuccess:
            return {
                ...state,
                itemList: action.payload,
                isItemListLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadItemListFail:
            return {
                ...state,
                itemList: [],
                isItemListLoading: false,
                error: action.payload,
            };
        case ItemActionTypes.LoadSimpleItemListSuccess:
            return {
                ...state,
                simpleItemList: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadSimpleItemListFail:
            return {
                ...state,
                simpleItemList: [],
                error: action.payload,
            };
        case ItemActionTypes.LoadItemCategoriesSuccess:
            state.itemCategories.push(action.payload);
            return {
                ...state,
                itemCategories: [...state.itemCategories],
                error: '',
            };
        case ItemActionTypes.LoadItemCategoriesFail:
            return {
                ...state,
                itemCategories: [],
                error: action.payload,
            };
        case ItemActionTypes.LoadCategoryBreadCrumbsSuccess:
            state.categoryBreadCrumbs.push(action.payload);
            return {
                ...state,
                categoryBreadCrumbs: [...state.categoryBreadCrumbs],
                error: '',
            };
        case ItemActionTypes.LoadAllItemListSuccess:
            return {
                ...state,
                allItemList: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadAllItemListFail:
            return {
                ...state,
                allItemList: [],
                error: action.payload,
            };
        case ItemActionTypes.LoadVendorAttachmentList:
            return {
                ...state,
                isVendorAttachmentsListLoading: true,
                error: '',
            };
        case ItemActionTypes.LoadVendorAttachmentListSuccess:
            return {
                ...state,
                vendorAttachmentsList: action.payload,
                isVendorAttachmentsListLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadVendorAttachmentListFail:
            return {
                ...state,
                vendorAttachmentsList: [],
                isVendorAttachmentsListLoading: false,
                error: action.payload,
            };

        case ItemActionTypes.LoadItemCategoryAssignmentsSuccess:
            return {
                ...state,
                categoryAssignments: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadItemCategoryAssignmentsFail:
            return {
                ...state,
                categoryAssignments: [],
                error: action.payload,
            };
        case ItemActionTypes.LoadItemTierPricesSuccess:
            state.item.ItemTierPrices = action.payload;
            return {
                ...state,
                item: state.item,
                error: '',
            };
        case ItemActionTypes.LoadItemTierPricesFail:
            state.item.ItemTierPrices = [];
            return {
                ...state,
                item: state.item,
                error: action.payload,
            };
        case ItemActionTypes.LoadItem:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case ItemActionTypes.LoadItemSuccess:
            return {
                ...state,
                isLoading: false,
                item: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadItemFail:
            return {
                ...state,
                isLoading: false,
                item: null,
                error: action.payload,
            };

        case ItemActionTypes.AddItem:
            return {
                ...state,
                pendingAdd: true,
            };
        case ItemActionTypes.AddItemSuccess:
            return {
                ...state,
                itemBatchItems: [action.payload, ...state.itemBatchItems],
                pendingAdd: false,
                error: '',
            };
        case ItemActionTypes.AddItemFail:
            return {
                ...state,
                //item: null,
                pendingAdd: false,
                error: action.payload,
            };
        case ItemActionTypes.EditItem:
            return {
                ...state,
                pendingSave: true,
            };
        case ItemActionTypes.EditItemSuccess:
            return {
                ...state,
                item: action.payload,
                pendingSave: false,
                error: '',
            };
        case ItemActionTypes.EditItemFail:
            return {
                ...state,
                //item: null,
                pendingSave: false,
                error: action.payload,
            };

        case ItemActionTypes.DeleteItem:
            return {
                ...state,
                pendingDelete: true,
            };
        case ItemActionTypes.DeleteItemSuccess:
                const _updatedItems = state.items.filter(item => item.ItemID !== action.payload);
            return {
                ...state,
                items: _updatedItems,
                pendingDelete: false,
                error: '',
            };
        case ItemActionTypes.DeleteItemFail:
            return {
                ...state,
                items: null,
                pendingDelete: false,
                error: action.payload,
            };


        case ItemActionTypes.LoadPendingItems:
            return {
                ...state,
                isLoading: true,
            };
        case ItemActionTypes.LoadPendingItemsSuccess:
            return {
                ...state,
                itemBatch: action.payload,
                isLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadPendingItemsFail:
            return {
                ...state,
                itemBatch: null,
                isLoading: false,
                error: action.payload,
            };
        case ItemActionTypes.EditItemBatchSuccess:
            action.payload.updateditems.forEach(updateditem => {
                const _item = state.items.find(item => item.ItemID === updateditem.ItemID);
                if (_item) {
                    _item.Approval = 'Approved';
                }
            });
            return {
                ...state,
                itemBatch: action.payload.itembatch,
                pendingSave: false,
                error: '',
            };
        case ItemActionTypes.EditItemBatchFail:
            return {
                ...state,
                itemBatch: null,
                pendingSave: false,
                error: action.payload,
            };
        case ItemActionTypes.LoadItemBatchItems:
            return {
                ...state,
                isLoading: true,
            };
        case ItemActionTypes.LoadItemBatchItemsSuccess:
            return {
                ...state,
                items: action.payload,
                itemBatchItems: action.payload,
                isLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadItemBatchItemsFail:
            return {
                ...state,
                items: [],
                itemBatchItems: [],
                isLoading: false,
                error: action.payload,
            };
        case ItemActionTypes.LoadMainItems:
            return {
                ...state,
                isLoading: true,
            };
        case ItemActionTypes.LoadMainItemsSuccess:
            return {
                ...state,
                items: action.payload,
                itemBatchItems: action.payload,
                isLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadMainItemsFail:
            return {
                ...state,
                items: [],
                itemBatchItems: [],
                isLoading: false,
                error: action.payload,
            };
        case ItemActionTypes.LoadRefreshItemsSuccess:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadRefreshItemsFail:
            return {
                ...state,
                items: [],
                isLoading: false,
                error: action.payload,
            };


        case ItemActionTypes.LoadItemBatchUpdateSuccess:
            return {
                ...state,
                itemBatchUpdates: action.payload,
                isLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadItemBatchUpdateFail:
            return {
                ...state,
                itemBatchUpdates: [],
                isLoading: false,
                error: action.payload,
            };
        case ItemActionTypes.EditItemBatchUpdateSuccess:
            state.itemBatchItems.forEach( (item) => item.isSelected = false );
            return {
                ...state,
            };
        case ItemActionTypes.EditItemBatchUpdateFail:
            return {
                ...state,
                error: action.payload,
            };

        case ItemActionTypes.LoadVideoURLDetailSuccess:
            return {
                ...state,
            };
        case ItemActionTypes.LoadVideoURLDetailFail:
            const _videoIndex = state.item.ItemVideos.findIndex(video => video.Label === action.payload.row.Label);
            state.item.ItemVideos.splice(_videoIndex, 1);
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
