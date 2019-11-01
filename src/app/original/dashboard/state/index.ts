import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromDashboard from './dashboard.reducer';
import { MatTableDataSource } from '@angular/material';
import { DashboardSalesOrderSummary, InboundShipmentStatusCount, ItemSalesTotal, SalesOrderSummary, SalesStatusTotal } from 'app/shared/class/dashboard';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    dashboard: fromDashboard.DashboardState;
}

// Selector functions
const getDashboardFeatureState = createFeatureSelector<fromDashboard.DashboardState>('Dashboard');

export const getDashboard = createSelector(
    getDashboardFeatureState,
    state => state.dashboard
);
export const getDashboardNews = createSelector(
    getDashboardFeatureState,
    state => state.dashboard ? state.dashboard.DashboardNews : null
);
export const getSalesOrderSummaryMerchant = createSelector(
    getDashboardFeatureState,
    state => state.salesOrderSummaryMerchant
);
export const getSalesOrderSummaryMerchantMatTable = createSelector(
    getDashboardFeatureState,
    state => new MatTableDataSource<DashboardSalesOrderSummary>(state.salesOrderSummaryMerchant)
);
export const getSalesOrderSummaryToolots = createSelector(
    getDashboardFeatureState,
    state => state.salesOrderSummaryToolots
);
export const getSalesOrderSummaryToolotsMatTable = createSelector(
    getDashboardFeatureState,
    state => new MatTableDataSource<DashboardSalesOrderSummary>(state.salesOrderSummaryToolots)
);
export const getInboundShipmentStatusCounts = createSelector(
    getDashboardFeatureState,
    state => state.salesOrderSummaryToolots
);
export const getInboundShipmentStatusCountsMatTable = createSelector(
    getDashboardFeatureState,
    state => new MatTableDataSource<InboundShipmentStatusCount>(state.inboundShipmentStatusCounts)
);
export const getItemSalesTotals = createSelector(
    getDashboardFeatureState,
    state => state.itemSalesTotals
);
export const getItemSalesTotalsMatTable = createSelector(
    getDashboardFeatureState,
    state => new MatTableDataSource<ItemSalesTotal>(state.itemSalesTotals)
);
export const getSalesOrderSummary = createSelector(
    getDashboardFeatureState,
    state => state.salesOrderSummary
);
export const getSalesOrderSummaryMatTable = createSelector(
    getDashboardFeatureState,
    state => new MatTableDataSource<SalesOrderSummary>(state.salesOrderSummary)
);
export const getSalesStatusTotals = createSelector(
    getDashboardFeatureState,
    state => state.salesStatusTotals
);
export const getSalesStatusTotalsMatTable = createSelector(
    getDashboardFeatureState,
    state => new MatTableDataSource<SalesStatusTotal>(state.salesStatusTotals)
);
export const getDashboardVendorNotification = createSelector(
    getDashboardFeatureState,
    state => state.dashboardVendorNotification
);
export const getError = createSelector(
    getDashboardFeatureState,
    state => state.error
);
