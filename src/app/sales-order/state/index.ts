import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromSalesOrder from './sales-order.reducer';
import { MatTableDataSource } from '@angular/material';
import { MemberVendor } from 'app/shared/class/member';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    setting: fromSalesOrder.SalesOrderState;
};

// Selector functions
const getSalesOrderFeatureState = createFeatureSelector<fromSalesOrder.SalesOrderState>('SalesOrder');

export const getMemberVendorList = createSelector(
    getSalesOrderFeatureState,
    state => state.memberVendors
);
export const getMemberVendorListMatTable = createSelector(
    getSalesOrderFeatureState,
    state => new MatTableDataSource<MemberVendor>(state.memberVendors)
);
export const getPendingSave = createSelector(
    getSalesOrderFeatureState,
    state => state.pendingSave
);
export const getError = createSelector(
    getSalesOrderFeatureState,
    state => state.error
);