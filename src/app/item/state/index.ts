import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromItem from './item.reducer';
import { MatTableDataSource } from '@angular/material';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from 'app/shared/class/fulfillment';
import { ItemOptionInsert, ItemSelectionInsert } from 'app/shared/class/item';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    item: fromItem.ItemState;
};

// Selector functions
const getItemFeatureState = createFeatureSelector<fromItem.ItemState>('Item');


export const getVendorBrandList = createSelector(
    getItemFeatureState,
    state => state.vendorBrandList
);
export const getSimpleItemList = createSelector(
    getItemFeatureState,
    state => state.itemList 
);
// export const getSalesOrdersListMatTable = createSelector(
//     getItemFeatureState,
//     state => new MatTableDataSource<SalesOrder>(state.salesOrders)
// );

export const getItem = createSelector(
    getItemFeatureState,
    state => state.item
);
export const getItemList = createSelector(
    getItemFeatureState,
    state => state.itemList
);
export const getItemBundleOptions = createSelector(
    getItemFeatureState, 
    state => state.item ? state.item.ItemOptions : []
)
export const getItemBundleOptionsMatTable = createSelector(
    getItemFeatureState, 
    state => new MatTableDataSource<ItemOptionInsert>(state.item ? state.item.ItemOptions : [])
)

export const getSelectedBundleOption = createSelector(
    getItemFeatureState, 
    state => state.selectedBundleOption
)
export const getItemBundleOptionSelectionsMatTable = createSelector(
    getItemFeatureState, 
    state => new MatTableDataSource<ItemSelectionInsert>(state.selectedBundleOptionSelectionList)
)

export const getItemCategories = createSelector(
    getItemFeatureState, 
    state => state.itemCategories
)
export const getCategoryBreadCrumbs = createSelector(
    getItemFeatureState, 
    state => state.categoryBreadCrumbs
)

// export const getSalesOrder = createSelector(
//     getItemFeatureState,
//     state => state.salesOrders.find(item => item.OrderID === state.currentSalesOrderID)
// );

// // export const getCurrentSalesOrderID = createSelector(
// //     getItemFeatureState,
// //     state => state.currentSalesOrderID
// // );
// // export const getSalesOrder = createSelector(
// //     getItemFeatureState,
// //     getCurrentSalesOrderID, 
// //     (state, currentSalesOrderID) => state.salesOrders.find(item => item.OrderID === currentSalesOrderID)
// // );
// export const getSalesOrderLines = createSelector(
//     getItemFeatureState,
//     state => state.salesOrderLines
// );
// export const getSalesOrderLinesMatTable = createSelector(
//     getItemFeatureState,
//     state => new MatTableDataSource<SalesOrderLine>(state.salesOrderLines)
// );



// export const getFulfillmentSalesOrderLines = createSelector(
//     getItemFeatureState,
//     state => state.fulfillmentSalesOrderLines
// );
// export const getFulfillmentSalesOrderLinesMatTable = createSelector(
//     getItemFeatureState,
//     state => new MatTableDataSource<FulfillmentSalesOrderLine>(state.fulfillmentSalesOrderLines)
// );


// export const getDeliveryDetail = createSelector(
//     getItemFeatureState,
//     state => state.deliveryDetail
// );
// export const getSalesOrderDeliveryDetail = createSelector(
//     getItemFeatureState,
//     state => state.salesOrderDeliveryDetail
// );

// export const getFulfilledByFulfillments = createSelector(
//     getItemFeatureState,
//     state => state.fulfillments
// );
// export const getFulfilledByFulfillmentsMatTable = createSelector(
//     getItemFeatureState,
//     state => new MatTableDataSource<Fulfillment>(state.fulfillments)
// );
// export const getFulfilledByFulfillment = createSelector(
//     getItemFeatureState,
//     state => state.fulfillment
// );

export const getIsLoading = createSelector(
    getItemFeatureState,
    state => state.isLoading
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
export const getError = createSelector(
    getItemFeatureState,
    state => state.error
);
