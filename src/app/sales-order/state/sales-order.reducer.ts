import { SalesOrderActionTypes, SalesOrderActions } from './sales-order.actions';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment } from 'app/shared/class/fulfillment';

// State for this feature (Item Variation)
export interface SalesOrderState {
    salesOrders: SalesOrder[];
    fulfillments: Fulfillment[];
    fulfillment: Fulfillment;
    salesOrder: SalesOrder;
    salesOrderLines: SalesOrderLine[];
    salesOrderDeliveryDetail: string;
    deliveryDetail: string;
    currentSalesOrderID: number;
    isLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    error: string;
    
};

const initialState: SalesOrderState = {
    salesOrders: [],
    fulfillments: [],
    fulfillment: null,
    salesOrder: null,
    salesOrderLines: [],
    salesOrderDeliveryDetail: '',
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
        case SalesOrderActionTypes.SetFulfillment:
            return {
                ...state,
                fulfillment: action.payload
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
        case SalesOrderActionTypes.LoadFulfilledByFulfillments:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case SalesOrderActionTypes.LoadFulfilledByFulfillmentsSuccess:
            return {
                ...state,
                fulfillments: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadFulfilledByFulfillmentsFail:
            return {
                ...state,
                fulfillments: null,
                isLoading: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.LoadFulfilledByFulfillment:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case SalesOrderActionTypes.LoadFulfilledByFulfillmentSuccess:
            return {
                ...state,
                fulfillment: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadFulfilledByFulfillmentFail:
            return {
                ...state,
                fulfillments: null,
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
        case SalesOrderActionTypes.LoadSalesOrderDelivery:
            return {
                ...state,
                isLoading: true,
            };
        case SalesOrderActionTypes.LoadSalesOrderDeliverySuccess:
            return {
                ...state,
                salesOrderDeliveryDetail: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrderDeliveryFail:
            return {
                ...state,
                salesOrderDeliveryDetail: '',
                isLoading: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.DeleteFulfillment:
            return {
                ...state,
                pendingDelete: true,
            };

        case SalesOrderActionTypes.DeleteFulfillmentSuccess:
            return {
                ...state,
                fulfillments: state.fulfillments,
                pendingDelete: false,
                error: '',
            };
        case SalesOrderActionTypes.DeleteFulfillmentFail:
            return {
                ...state,
                fulfillments: [],
                pendingDelete: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
