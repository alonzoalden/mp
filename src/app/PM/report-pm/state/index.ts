import * as fromRoot from '../../../state/app.state';
import * as fromReport from './report.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material';
import {Item, ItemList} from '../../../shared/class/item';
import * as fromItem from '../../../original/item/state/item.reducer';
import {InventoryReport, VendorReport} from '../../../shared/class/report';

export interface State extends fromRoot.State {
    report: fromReport.ReportState;
}

const getReportFeatureState = createFeatureSelector<fromReport.ReportState>('report');

export const getItemList = createSelector(
    getReportFeatureState,
    state => state.itemList
);
export const getItemReportLoading = createSelector(
    getReportFeatureState,
    state => state.isItemReportLoading
);
export const getInventoryReport = createSelector(
    getReportFeatureState,
    state => new MatTableDataSource<InventoryReport>(state.inventoryReport)
);
export const getSubVendorList = createSelector(
    getReportFeatureState,
    state => state.VendorList
);
export const getSubVendorReportLoading = createSelector(
    getReportFeatureState,
    state => state.isSubVendorReportLoading
);
export const getVendorReport = createSelector(
    getReportFeatureState,
    state => new MatTableDataSource<VendorReport>(state.vendorReport)
);
