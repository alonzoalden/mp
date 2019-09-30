import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromSalesOrder from './sales-order.reducer';
import { MatTableDataSource } from '@angular/material';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from 'app/shared/class/fulfillment';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    setting: fromSalesOrder.SalesOrderState;
}

// Selector functions
const getSalesOrderFeatureState = createFeatureSelector<fromSalesOrder.SalesOrderState>('SalesOrder');

export const getSalesOrdersList = createSelector(
    getSalesOrderFeatureState,
    state => state.salesOrders
);
export const getSalesOrdersListMatTable = createSelector(
    getSalesOrderFeatureState,
    state => new MatTableDataSource<SalesOrder>(state.salesOrders)
);

export const getSalesOrder = createSelector(
        getSalesOrderFeatureState,
        state => state.salesOrder
    );

// export const getSalesOrder = createSelector(
//     getSalesOrderFeatureState,
//     state => state.salesOrders.find(item => item.OrderID === state.currentSalesOrderID)
// );

// export const getCurrentSalesOrderID = createSelector(
//     getSalesOrderFeatureState,
//     state => state.currentSalesOrderID
// );
// export const getSalesOrder = createSelector(
//     getSalesOrderFeatureState,
//     getCurrentSalesOrderID,
//     (state, currentSalesOrderID) => state.salesOrders.find(item => item.OrderID === currentSalesOrderID)
// );
export const getSalesOrderLines = createSelector(
    getSalesOrderFeatureState,
    state => state.salesOrderLines
);
export const getSalesOrderLinesMatTable = createSelector(
    getSalesOrderFeatureState,
    state => new MatTableDataSource<SalesOrderLine>(state.salesOrderLines)
);



export const getFulfillmentSalesOrderLines = createSelector(
    getSalesOrderFeatureState,
    state => state.fulfillmentSalesOrderLines
);
export const getFulfillmentSalesOrderLinesMatTable = createSelector(
    getSalesOrderFeatureState,
    state => new MatTableDataSource<FulfillmentSalesOrderLine>(state.fulfillmentSalesOrderLines)
);

export const getFulfilledByFulfillments = createSelector(
    getSalesOrderFeatureState,
    state => state.fulfillments
);
export const getFulfilledByFulfillmentsMatTable = createSelector(
    getSalesOrderFeatureState,
    state => new MatTableDataSource<Fulfillment>(state.fulfillments)
);
export const getFulfilledByFulfillment = createSelector(
    getSalesOrderFeatureState,
    state => state.fulfillment
);

export const getIsSalesOrderLinesLoading = createSelector(
    getSalesOrderFeatureState,
    state => state.isSalesOrderLinesLoading
);
export const getIsLoading = createSelector(
    getSalesOrderFeatureState,
    state => state.isLoading
);
export const getPendingDelete = createSelector(
    getSalesOrderFeatureState,
    state => state.pendingDelete
);
export const getPendingSave = createSelector(
    getSalesOrderFeatureState,
    state => state.pendingSave
);
export const getError = createSelector(
    getSalesOrderFeatureState,
    state => state.error
);
