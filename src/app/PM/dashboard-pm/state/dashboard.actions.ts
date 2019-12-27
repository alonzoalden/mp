import { Action } from '@ngrx/store';
import {
    DashboardSalesOrderSummary,
    InboundShipmentStatusCount,
    ItemSalesTotal,
    Dashboard,
    SalesOrderSummary,
    SalesStatusTotal,
    DashboardVendorNotification,
    ItemSalesForecast
} from 'app/shared/class/dashboard';

export enum DashboardActionTypes {
    LoadSalesOrderSummaryMerchant = '[Dashboard] Load Sales Order Summary (Merchant) ',
    LoadSalesOrderSummaryMerchantSuccess = '[Dashboard] Load Sales Order Summary (Merchant) Success',
    LoadSalesOrderSummaryMerchantFail = '[Dashboard] Load Sales Order Summary (Merchant) Fail',
    LoadSalesOrderSummaryToolots = '[Dashboard] Load Sales Order Summary (Toolots) ',
    LoadSalesOrderSummaryToolotsSuccess = '[Dashboard] Load Sales Order Summary (Toolots) Success',
    LoadSalesOrderSummaryToolotsFail = '[Dashboard] Load Sales Order Summary (Toolots) Fail',
    LoadItemSalesForecast = '[Dashboard] Load Item Sale Forecast',
    LoadItemSalesForecastSuccess = '[Dashboard] Load Item Sale Forecast Success',
    LoadItemSalesForecastFail = '[Dashboard] Load Item Sale Forecast Fail',
    LoadInboundShipmentStatusCounts = '[Dashboard] Load Inbound Shipment Status Counts',
    LoadInboundShipmentStatusCountsSuccess = '[Dashboard] Load Inbound Shipment Status Counts Success',
    LoadInboundShipmentStatusCountsFail = '[Dashboard] Load Inbound Shipment Status Counts Fail',
    LoadItemSalesTotal = '[Dashboard] Load Item Sales Total',
    LoadItemSalesTotalSuccess = '[Dashboard] Load Item Sales Total Success',
    LoadItemSalesTotalFail = '[Dashboard] Load Item Sales Total Fail',
    LoadDashboard = '[Dashboard] Load Dashboard',
    LoadDashboardSuccess = '[Dashboard] Load Dashboard Success',
    LoadDashboardFail = '[Dashboard] Load Dashboard Fail',
    LoadSalesOrderSummary = '[Dashboard] Load Sales Order Summary',
    LoadSalesOrderSummarySuccess = '[Dashboard] Load Sales Order Summary Success',
    LoadSalesOrderSummaryFail = '[Dashboard] Load Sales Order Summary Fail',
    LoadSalesStatusTotals = '[Dashboard] Load Sales Status Totals',
    LoadSalesStatusTotalsSuccess = '[Dashboard] Load Sales Status Totals Success',
    LoadSalesStatusTotalsFail = '[Dashboard] Load Sales Status Totals Fail',
    LoadDashboardVendorNotification = '[Dashboard] Load Dashboard Vendor Notification',
    LoadDashboardVendorNotificationSuccess = '[Dashboard] Load Dashboard Vendor Notification Success',
    LoadDashboardVendorNotificationFail = '[Dashboard] Load Dashboard Vendor Notification Fail',
}

// Action Creators
export class LoadDashboard implements Action {
    readonly type = DashboardActionTypes.LoadDashboard;
}
export class LoadDashboardSuccess implements Action {
    readonly type = DashboardActionTypes.LoadDashboardSuccess;
    constructor(public payload: Dashboard) { }
}
export class LoadDashboardFail implements Action {
    readonly type = DashboardActionTypes.LoadDashboardFail;
    constructor(public payload: string) { }
}
export class LoadSalesOrderSummaryMerchant implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryMerchant;
}
export class LoadSalesOrderSummaryMerchantSuccess implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryMerchantSuccess;
    constructor(public payload: DashboardSalesOrderSummary[]) { }
}
export class LoadSalesOrderSummaryMerchantFail implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryMerchantFail;
    constructor(public payload: string) { }
}
export class LoadSalesOrderSummaryToolots implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryToolots;
}
export class LoadSalesOrderSummaryToolotsSuccess implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryToolotsSuccess;
    constructor(public payload: DashboardSalesOrderSummary[]) { }
}
export class LoadSalesOrderSummaryToolotsFail implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryToolotsFail;
    constructor(public payload: string) { }
}
export class LoadItemSalesForecast implements Action {
    readonly type = DashboardActionTypes.LoadItemSalesForecast;
}
export class LoadItemSalesForecastSuccess implements Action {
    readonly type = DashboardActionTypes.LoadItemSalesForecastSuccess;
    constructor(public payload: ItemSalesForecast[]) { }
}
export class LoadItemSalesForecastFail implements Action {
    readonly type = DashboardActionTypes.LoadItemSalesForecastFail;
    constructor(public payload: string) { }
}
export class LoadInboundShipmentStatusCounts implements Action {
    readonly type = DashboardActionTypes.LoadInboundShipmentStatusCounts;
}
export class LoadInboundShipmentStatusCountsSuccess implements Action {
    readonly type = DashboardActionTypes.LoadInboundShipmentStatusCountsSuccess;
    constructor(public payload: InboundShipmentStatusCount[]) { }
}
export class LoadInboundShipmentStatusCountsFail implements Action {
    readonly type = DashboardActionTypes.LoadInboundShipmentStatusCountsFail;
    constructor(public payload: string) { }
}
export class LoadItemSalesTotal implements Action {
    readonly type = DashboardActionTypes.LoadItemSalesTotal;
}
export class LoadItemSalesTotalSuccess implements Action {
    readonly type = DashboardActionTypes.LoadItemSalesTotalSuccess;
    constructor(public payload: ItemSalesTotal[]) { }
}
export class LoadItemSalesTotalFail implements Action {
    readonly type = DashboardActionTypes.LoadItemSalesTotalFail;
    constructor(public payload: string) { }
}
export class LoadSalesOrderSummary implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummary;
}
export class LoadSalesOrderSummarySuccess implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummarySuccess;
    constructor(public payload: SalesOrderSummary[]) { }
}
export class LoadSalesOrderSummaryFail implements Action {
    readonly type = DashboardActionTypes.LoadSalesOrderSummaryFail;
    constructor(public payload: string) { }
}
export class LoadSalesStatusTotals implements Action {
    readonly type = DashboardActionTypes.LoadSalesStatusTotals;
}
export class LoadSalesStatusTotalsSuccess implements Action {
    readonly type = DashboardActionTypes.LoadSalesStatusTotalsSuccess;
    constructor(public payload: SalesStatusTotal[]) { }
}
export class LoadSalesStatusTotalsFail implements Action {
    readonly type = DashboardActionTypes.LoadSalesStatusTotalsFail;
    constructor(public payload: string) { }
}
export class LoadDashboardVendorNotification implements Action {
    readonly type = DashboardActionTypes.LoadDashboardVendorNotification;
}
export class LoadDashboardVendorNotificationSuccess implements Action {
    readonly type = DashboardActionTypes.LoadDashboardVendorNotificationSuccess;
    constructor(public payload: DashboardVendorNotification) { }
}
export class LoadDashboardVendorNotificationFail implements Action {
    readonly type = DashboardActionTypes.LoadDashboardVendorNotificationFail;
    constructor(public payload: string) { }
}

export type DashboardActions = LoadDashboard
    | LoadDashboardSuccess
    | LoadDashboardFail
    | LoadSalesOrderSummaryMerchant
    | LoadSalesOrderSummaryMerchantSuccess
    | LoadSalesOrderSummaryMerchantFail
    | LoadSalesOrderSummaryToolots
    | LoadSalesOrderSummaryToolotsSuccess
    | LoadSalesOrderSummaryToolotsFail
    | LoadInboundShipmentStatusCounts
    | LoadInboundShipmentStatusCountsSuccess
    | LoadInboundShipmentStatusCountsFail
    | LoadItemSalesTotal
    | LoadItemSalesTotalSuccess
    | LoadItemSalesTotalFail
    | LoadSalesOrderSummary
    | LoadSalesOrderSummarySuccess
    | LoadSalesOrderSummaryFail
    | LoadSalesStatusTotals
    | LoadSalesStatusTotalsSuccess
    | LoadSalesStatusTotalsFail
    | LoadDashboardVendorNotification
    | LoadDashboardVendorNotificationSuccess
    | LoadDashboardVendorNotificationFail
    | LoadItemSalesForecast
    | LoadItemSalesForecastSuccess
    | LoadItemSalesForecastFail;
