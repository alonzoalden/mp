import { ItemActionTypes, ItemActions } from './item.actions';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert, ItemCategoryAssignment } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { Category } from 'app/shared/class/category';

// State for this feature (Item Variation)
export interface ItemState {
    vendorBrandList: VendorBrand[];
    itemList: ItemList[];
    item: ItemInsert;
    selectedBundleOption: ItemOptionInsert;
    selectedBundleOptionSelectionList: ItemSelectionInsert[],
    itemCategories: Array<Category[]>,
    categoryBreadCrumbs: Array<Category[]>,
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
                itemCategories: state.itemCategories,
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
                categoryBreadCrumbs: state.categoryBreadCrumbs,
                error: '',
            };
        case ItemActionTypes.LoadCategoryBreadCrumbsFail:
            return {
                ...state,
                categoryBreadCrumbs: [],
                error: action.payload,
            };
        // case ItemActionTypes.SetSalesOrder:
        //     return {
        //         ...state,
        //         salesOrder: action.payload
        //     };
        // case SalesOrderActionTypes.SetFulfillment:
        //     return {
        //         ...state,
        //         fulfillment: action.payload
        //     };
        // case SalesOrderActionTypes.SetSalesOrderID:
        //     return {
        //         ...state,
        //         currentSalesOrderID: action.payload
        //     };
        // case SalesOrderActionTypes.LoadSalesOrder:
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderSuccess:
        //     return {
        //         ...state,
        //         salesOrder: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderFail:
        //     return {
        //         ...state,
        //         salesOrder: null,
        //         isLoading: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderLines:
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: '',
        //     };

        // case SalesOrderActionTypes.LoadSalesOrderLinesSuccess:
        //     return {
        //         ...state,
        //         salesOrderLines: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderLinesFail:
        //     return {
        //         ...state,
        //         salesOrderLines: null,
        //         isLoading: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.LoadFulfilledByFulfillments:
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: '',
        //     };

        // case SalesOrderActionTypes.LoadFulfilledByFulfillmentsSuccess:
        //     return {
        //         ...state,
        //         fulfillments: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadFulfilledByFulfillmentsFail:
        //     return {
        //         ...state,
        //         fulfillments: null,
        //         isLoading: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.LoadFulfilledByFulfillment:
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: '',
        //     };

        // case SalesOrderActionTypes.LoadFulfilledByFulfillmentSuccess:
        //     return {
        //         ...state,
        //         fulfillment: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadFulfilledByFulfillmentFail:
        //     return {
        //         ...state,
        //         fulfillments: null,
        //         //isLoading: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.LoadFulfilmmentSalesOrderLines:
        //     return {
        //         ...state,
        //         //isLoading: true,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadFulfilmmentSalesOrderLinesSuccess:
        //     return {
        //         ...state,
        //         fulfillmentSalesOrderLines: action.payload,
        //         //isLoading: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadFulfilmmentSalesOrderLinesFail:
        //     return {
        //         ...state,
        //         fulfillmentSalesOrderLines: [],
        //         isLoading: false,
        //         error: action.payload,
        //     };
            
        // case SalesOrderActionTypes.CancelSalesOrderLines:
        //     return {
        //         ...state,
        //         pendingDelete: true,
        //     };
            
        // case SalesOrderActionTypes.CancelSalesOrderLinesSuccess:
        //     return {
        //         ...state,
        //         salesOrderLines: [],
        //         pendingDelete: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.CancelSalesOrderLinesFail:
        //     return {
        //         ...state,
        //         salesOrderLines: [],
        //         pendingDelete: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.LoadFulfilledBySalesOrderDeliverySuccess:
        //     return {
        //         ...state,
        //         deliveryDetail: action.payload,
        //         pendingDelete: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderDelivery:
        //     return {
        //         ...state,
        //         isLoading: true,
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderDeliverySuccess:
        //     return {
        //         ...state,
        //         salesOrderDeliveryDetail: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.LoadSalesOrderDeliveryFail:
        //     return {
        //         ...state,
        //         salesOrderDeliveryDetail: '',
        //         isLoading: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.AddFulfillment:
        //     return {
        //         ...state,
        //         pendingSave: true,
        //     };

        // case SalesOrderActionTypes.AddFulfillmentSuccess:
        //     return {
        //         ...state,
        //         fulfillment: action.payload,
        //         fulfillmentSalesOrderLines: action.payload.FulfillmentSalesOrderLines,
        //         pendingSave: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.AddFulfillmentFail:
        //     return {
        //         ...state,
        //         fulfillment: null,
        //         fulfillmentSalesOrderLines: [],
        //         pendingSave: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.EditFulfillment:
        //     return {
        //         ...state,
        //         pendingSave: true,
        //     };

        // case SalesOrderActionTypes.EditFulfillmentSuccess:
        //     return {
        //         ...state,
        //         fulfillment: action.payload,
        //         fulfillmentSalesOrderLines: action.payload.FulfillmentSalesOrderLines,
        //         pendingSave: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.EditFulfillmentFail:
        //     return {
        //         ...state,
        //         fulfillment: null,
        //         fulfillmentSalesOrderLines: [],
        //         pendingSave: false,
        //         error: action.payload,
        //     };
        // case SalesOrderActionTypes.DeleteFulfillment:
        //     return {
        //         ...state,
        //         pendingDelete: true,
        //     };

        // case SalesOrderActionTypes.DeleteFulfillmentSuccess:
        //     return {
        //         ...state,
        //         fulfillments: state.fulfillments,
        //         pendingDelete: false,
        //         error: '',
        //     };
        // case SalesOrderActionTypes.DeleteFulfillmentFail:
        //     return {
        //         ...state,
        //         fulfillments: [],
        //         pendingDelete: false,
        //         error: action.payload,
        //     };
        default:
            return state;
    }
}
