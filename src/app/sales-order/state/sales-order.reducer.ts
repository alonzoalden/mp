import { SalesOrderActionTypes, SalesOrderActions } from './sales-order.actions';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';

// State for this feature (Item Variation)
export interface SalesOrderState {
    salesOrders: SalesOrder[];
    salesOrder: SalesOrder;
    salesOrderLines: SalesOrderLine[];
    deliveryDetail: string;
    currentSalesOrderID: number;
    isLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    error: string;
};

const initialState: SalesOrderState = {
    salesOrders: [],
    salesOrder: null,
    salesOrderLines: [],
    deliveryDetail: '',
    currentSalesOrderID: null,
    isLoading: true,
    pendingDelete: false,
    pendingSave: false,
    error: ''
};

export function salesOrderReducer(state = initialState, action: SalesOrderActions): SalesOrderState {

    switch (action.type) {
        case SalesOrderActionTypes.LoadSalesOrders:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case SalesOrderActionTypes.LoadSalesOrdersSuccess:
            return {
                ...state,
                salesOrders: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrdersFail:
            return {
                ...state,
                salesOrders: [],
                isLoading: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.SetSalesOrder:
            return {
                ...state,
                salesOrder: action.payload
            };
        case SalesOrderActionTypes.SetSalesOrderID:
            return {
                ...state,
                currentSalesOrderID: action.payload
            };
        case SalesOrderActionTypes.LoadSalesOrder:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrderSuccess:
            return {
                ...state,
                salesOrder: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrderFail:
            return {
                ...state,
                salesOrder: null,
                isLoading: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.LoadSalesOrderLines:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case SalesOrderActionTypes.LoadSalesOrderLinesSuccess:
            return {
                ...state,
                salesOrderLines: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrderLinesFail:
            return {
                ...state,
                salesOrderLines: null,
                isLoading: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.CancelSalesOrderLines:
            return {
                ...state,
                pendingDelete: true,
            };

        case SalesOrderActionTypes.CancelSalesOrderLinesSuccess:
            return {
                ...state,
                salesOrderLines: [],
                pendingDelete: false,
                error: '',
            };
        case SalesOrderActionTypes.CancelSalesOrderLinesFail:
            return {
                ...state,
                salesOrderLines: [],
                pendingDelete: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.LoadFulfilledBySalesOrderDeliverySuccess:
            return {
                ...state,
                deliveryDetail: action.payload,
                pendingDelete: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadFulfilledBySalesOrderDeliveryFail:
            return {
                ...state,
                deliveryDetail: '',
                pendingDelete: false,
                error: action.payload,
            };
            


        default:
            return state;
    }
}
