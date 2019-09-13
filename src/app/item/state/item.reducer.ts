import { ItemActionTypes, ItemActions } from './item.actions';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert, ItemCategoryAssignment, Item, ItemCrossSellInsert, ItemUpSellInsert, ItemRelatedProductInsert, ItemBatch } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { Category } from 'app/shared/class/category';
import { VendorAttachment, VendorAttachmentList } from 'app/shared/class/vendor-attachment';
import { BatchUpdate } from 'app/shared/class/batch-update';

// State for this feature (Item Variation)
export interface ItemState {
    vendorBrandList: VendorBrand[];
    itemList: ItemList[];
    item: ItemInsert | Item;
    selectedBundleOption: ItemOptionInsert;
    selectedBundleOptionSelectionList: ItemSelectionInsert[],
    itemCategories: Array<Category[]>,
    categoryBreadCrumbs: Array<Category[]>,
    allItemList: ItemList[];
    allItem: Item;
    vendorAttachmentsList: VendorAttachmentList[];
    categoryAssignments: ItemCategoryAssignment[];
    itemBatch: ItemBatch[];
    itemBatchItems: Item[];
    itemBatchUpdates: BatchUpdate[];
    isLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    pendingAdd: boolean,
    error: string;
};

const initialState: ItemState = {
    vendorBrandList: [],
    itemList: [],
    item: null,
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
    isLoading: true,
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
        case ItemActionTypes.LoadSimpleItemListSuccess:
            return {
                ...state,
                itemList: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadSimpleItemListFail:
            return {
                ...state,
                vendorBrandList: [],
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

        case ItemActionTypes.LoadVendorAttachmentListSuccess:
            return {
                ...state,
                vendorAttachmentsList: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadVendorAttachmentListFail:
            return {
                ...state,
                vendorAttachmentsList: [],
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
            
        case ItemActionTypes.LoadItemSuccess:
            return {
                ...state,
                item: action.payload,
                error: '',
            };
        case ItemActionTypes.LoadItemFail:
            return {
                ...state,
                item: null,
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
                item: null,
                pendingSave: false,
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
            return {
                ...state,
                itemBatch: action.payload,
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
                itemBatchItems: action.payload,
                isLoading: false,
                error: '',
            };
        case ItemActionTypes.LoadItemBatchItemsFail:
            return {
                ...state,
                itemBatchItems: [],
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
        
        
        

            
        // case ItemActionTypes.AddNewItemRelatedProductRow:
        //     state.item.ItemRelatedProducts.push(action.payload);
        // return {
        //         ...state,
        //         item: state.item
        //     };
        default:
            return state;
    }
}
