import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromInboundShipment from './inbound-shipment.reducer';
import { MatTableDataSource } from '@angular/material';
import { PurchaseOrder } from 'app/shared/class/purchase-order';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    inboundShipment: fromInboundShipment.InboundShipmentState;
};

// Selector functions
const getInboundShipmentFeatureState = createFeatureSelector<fromInboundShipment.InboundShipmentState>('InboundShipment');

export const purchaseOrdersMatTable = createSelector(
    getInboundShipmentFeatureState,
    state => new MatTableDataSource<PurchaseOrder>(state.purchaseOrders)
);
export const getPurchaseOrder = createSelector(
    getInboundShipmentFeatureState,
    state => state.currentPurchaseOrder
);
export const getIsLoading = createSelector(
    getInboundShipmentFeatureState,
    state => state.isLoading
);
export const getPendingDelete = createSelector(
    getInboundShipmentFeatureState,
    state => state.pendingDelete
);
export const getPendingSave = createSelector(
    getInboundShipmentFeatureState,
    state => state.pendingSave
);
export const getPendingAdd = createSelector(
    getInboundShipmentFeatureState,
    state => state.pendingAdd
);
export const getError = createSelector(
    getInboundShipmentFeatureState,
    state => state.error
);
