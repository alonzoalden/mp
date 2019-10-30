import { DashboardActions, DashboardActionTypes } from './dashboard.actions';
import { DashboardSalesOrderSummary, InboundShipmentStatusCount, ItemSalesTotal, Dashboard, SalesOrderSummary, SalesStatusTotal, DashboardVendorNotification } from 'app/shared/class/dashboard';

// State for this feature (Dashboard)
export interface DashboardState {
    dashboard: Dashboard;
    salesOrderSummaryMerchant: DashboardSalesOrderSummary[];
    salesOrderSummaryToolots: DashboardSalesOrderSummary[];
    inboundShipmentStatusCounts: InboundShipmentStatusCount[];
    salesOrderSummary: SalesOrderSummary[];
    itemSalesTotals: ItemSalesTotal[];
    salesStatusTotals: SalesStatusTotal[];
    dashboardVendorNotification: DashboardVendorNotification;
    isLoading: boolean;
    error: string;
}

const initialState: DashboardState = {
    dashboard: null,
    salesOrderSummaryMerchant: [],
    salesOrderSummaryToolots: [],
    inboundShipmentStatusCounts: [],
    salesOrderSummary: [],
    itemSalesTotals: [],
    salesStatusTotals: [],
    dashboardVendorNotification: null,
    isLoading: false,
    error: ''
};

export function dashboardReducer(state = initialState, action: DashboardActions): DashboardState {
    switch (action.type) {
        case DashboardActionTypes.LoadDashboardSuccess:
            return {
                ...state,
                dashboard: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadDashboardFail:
            return {
                ...state,
                dashboard: null,
                error: action.payload,
            };
        case DashboardActionTypes.LoadSalesOrderSummaryMerchantSuccess:
            return {
                ...state,
                salesOrderSummaryMerchant: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadSalesOrderSummaryMerchantFail:
            return {
                ...state,
                salesOrderSummaryMerchant: [],
                error: action.payload,
            };
        case DashboardActionTypes.LoadSalesOrderSummaryToolotsSuccess:
            return {
                ...state,
                salesOrderSummaryToolots: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadSalesOrderSummaryToolotsFail:
            return {
                ...state,
                salesOrderSummaryToolots: [],
                error: action.payload,
            };
        case DashboardActionTypes.LoadInboundShipmentStatusCountsSuccess:
            return {
                ...state,
                inboundShipmentStatusCounts: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadInboundShipmentStatusCountsFail:
            return {
                ...state,
                inboundShipmentStatusCounts: [],
                error: action.payload,
            };
        case DashboardActionTypes.LoadItemSalesTotalSuccess:
            return {
                ...state,
                itemSalesTotals: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadItemSalesTotalFail:
            return {
                ...state,
                itemSalesTotals: [],
                error: action.payload,
            };
        case DashboardActionTypes.LoadSalesOrderSummarySuccess:
            return {
                ...state,
                salesOrderSummary: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadSalesOrderSummaryFail:
            return {
                ...state,
                salesOrderSummary: [],
                error: action.payload,
            };
        case DashboardActionTypes.LoadSalesStatusTotalsSuccess:
            return {
                ...state,
                salesStatusTotals: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadSalesStatusTotalsFail:
            return {
                ...state,
                salesStatusTotals: [],
                error: action.payload,
            };
        case DashboardActionTypes.LoadDashboardVendorNotificationSuccess:
            return {
                ...state,
                dashboardVendorNotification: action.payload,
                error: '',
            };
        case DashboardActionTypes.LoadDashboardVendorNotificationFail:
            return {
                ...state,
                dashboardVendorNotification: null,
                error: action.payload,
            };
        default:
            return state;
    }
}
