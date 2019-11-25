import {SalesOrderActions, SalesOrderActionTypes} from './sales-order.actions';
import {SalesOrder} from 'app/shared/class/sales-order';
import {SalesOrderLine} from 'app/shared/class/sales-order-line';
import {Fulfillment, FulfillmentSalesOrderLine} from 'app/shared/class/fulfillment';
import {BOLRequest} from 'app/shared/class/bol-request';

// State for this feature (Item Variation)
export interface SalesOrderState {
    salesOrders: SalesOrder[];
    fulfillments: Fulfillment[];
    fulfillment: Fulfillment;
    fulfillmentSalesOrderLines: FulfillmentSalesOrderLine[];
    salesOrder: SalesOrder;
    salesOrderLines: SalesOrderLine[];
    deliveryDetail: string;
    currentSalesOrderID: number;
    BOLRequest: BOLRequest;
    isLoading: boolean;
    isSalesOrderLinesLoading: boolean;
    pendingDelete: boolean;
    pendingSave: boolean;
    pendingAdd: boolean;
    isBOLRequestLoading: boolean;
    error: string;
}

const initialState: SalesOrderState = {
    salesOrders: [],
    fulfillments: [],
    fulfillment: null,
    fulfillmentSalesOrderLines: [],
    salesOrder: null,
    salesOrderLines: [],
    deliveryDetail: '',
    currentSalesOrderID: null,
    BOLRequest: null,
    isLoading: true,
    isSalesOrderLinesLoading: true,
    pendingDelete: false,
    pendingSave: false,
    pendingAdd: false,
    isBOLRequestLoading: false,
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
        case SalesOrderActionTypes.LoadVendorsSalesOrders:
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
        case SalesOrderActionTypes.LoadMyVendorsSalesOrders:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case SalesOrderActionTypes.LoadMySalesOrdersSuccess:
            return {
                ...state,
                salesOrders: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadMySalesOrdersFail:
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
                salesOrderLines: [],
                isSalesOrderLinesLoading: true,
                error: '',
            };

        case SalesOrderActionTypes.LoadSalesOrderLinesSuccess:
            return {
                ...state,
                salesOrderLines: action.payload,
                isSalesOrderLinesLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrderLinesFail:
            return {
                ...state,
                salesOrderLines: null,
                isSalesOrderLinesLoading: false,
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
                //isLoading: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.LoadFulfilmmentSalesOrderLines:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case SalesOrderActionTypes.LoadFulfilmmentSalesOrderLinesSuccess:
            return {
                ...state,
                fulfillmentSalesOrderLines: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadFulfilmmentSalesOrderLinesFail:
            return {
                ...state,
                fulfillmentSalesOrderLines: [],
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
        case SalesOrderActionTypes.AddFulfillment:
            return {
                ...state,
                pendingSave: true,
            };

        case SalesOrderActionTypes.AddFulfillmentSuccess:
            return {
                ...state,
                fulfillment: action.payload,
                fulfillmentSalesOrderLines: action.payload.FulfillmentSalesOrderLines,
                pendingSave: false,
                error: '',
            };
        case SalesOrderActionTypes.AddFulfillmentFail:
            return {
                ...state,
                fulfillment: null,
                fulfillmentSalesOrderLines: [],
                pendingSave: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.AddBOLRequest:
            return {
                ...state,
                pendingAdd: true,
            };
        case SalesOrderActionTypes.AddBOLRequestSuccess:
            return {
                ...state,
                pendingAdd: false,
                BOLRequest: action.payload,
                error: '',
            };
        case SalesOrderActionTypes.AddBOLRequestFail:
            return {
                ...state,
                pendingAdd: false,
                BOLRequest: null,
                error: action.payload,
            };
        case SalesOrderActionTypes.UploadBOLAttachment:
            return {
                ...state,
                pendingAdd: true,
            };
        case SalesOrderActionTypes.UploadBOLAttachmentSuccess:
            return {
                ...state,
                pendingAdd: false,
                BOLRequest: action.payload,
                error: '',
            };
        case SalesOrderActionTypes.UploadBOLAttachmentFail:
            return {
                ...state,
                pendingAdd: false,
                BOLRequest: null,
                error: action.payload,
            };
        case SalesOrderActionTypes.LoadBOLRequest:
            return {
                ...state,
                isBOLRequestLoading: true,
            };
        case SalesOrderActionTypes.LoadBOLRequestSuccess:
            return {
                ...state,
                isBOLRequestLoading: false,
                BOLRequest: action.payload,
                error: '',
            };
        case SalesOrderActionTypes.LoadBOLRequestFail:
            return {
                ...state,
                isBOLRequestLoading: false,
                BOLRequest: null,
                error: action.payload,
            };

        case SalesOrderActionTypes.EditFulfillment:
            return {
                ...state,
                pendingSave: true,
            };

        case SalesOrderActionTypes.EditFulfillmentSuccess:
            return {
                ...state,
                fulfillment: action.payload,
                fulfillmentSalesOrderLines: action.payload.FulfillmentSalesOrderLines,
                pendingSave: false,
                error: '',
            };
        case SalesOrderActionTypes.EditFulfillmentFail:
            return {
                ...state,
                fulfillment: null,
                fulfillmentSalesOrderLines: [],
                pendingSave: false,
                error: action.payload,
            };
        case SalesOrderActionTypes.DeleteFulfillment:
            return {
                ...state,
                pendingDelete: true,
            };

        case SalesOrderActionTypes.DeleteFulfillmentSuccess:
            const _updatedFulfillmentList = state.fulfillments.filter(fulfillment => fulfillment.FulfillmentID !== action.payload);
            return {
                ...state,
                fulfillments: _updatedFulfillmentList,
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
