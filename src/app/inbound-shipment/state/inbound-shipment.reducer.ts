import { InboundShipmentActionTypes, InboundShipmentActions } from './inbound-shipment.actions';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert, ItemCategoryAssignment, Item, ItemCrossSellInsert, ItemUpSellInsert, ItemRelatedProductInsert, ItemBatch, ItemPrintLabel } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { Category } from 'app/shared/class/category';
import { VendorAttachment, VendorAttachmentList } from 'app/shared/class/vendor-attachment';
import { BatchUpdate } from 'app/shared/class/batch-update';
import { PurchaseOrder } from 'app/shared/class/purchase-order';

// State for this feature (Item Variation)
export interface InboundShipmentState {
    purchaseOrders: PurchaseOrder[];
    currentPurchaseOrder: PurchaseOrder;
    isLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    pendingAdd: boolean,
    error: string;
};

const initialState: InboundShipmentState = {
    purchaseOrders: [],
    currentPurchaseOrder: null,
    isLoading: true,
    pendingDelete: false,
    pendingSave: false,
    pendingAdd: false,
    error: ''
};

export function inboundShipmentReducer(state = initialState, action: InboundShipmentActions): InboundShipmentState {
    
    switch (action.type) {
        case InboundShipmentActionTypes.LoadPurchaseOrderOverview:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case InboundShipmentActionTypes.LoadPurchaseOrderOverviewSuccess:
            return {
                ...state,
                purchaseOrders: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderOverviewFail:
            return {
                ...state,
                purchaseOrders: [],
                isLoading: false,
                error: action.payload,
            };
        case InboundShipmentActionTypes.AddNewPurchaseOrderSuccess:
            return {
                ...state,
                currentPurchaseOrder: action.payload,
                error: '',
            };

        case InboundShipmentActionTypes.AddNewPurchaseOrderFail:
            return {
                ...state,
                currentPurchaseOrder: null,
                error: action.payload,
            };

        case InboundShipmentActionTypes.DeletePurchaseOrder:
            return {
                ...state,
                pendingDelete: true,
            };
        case InboundShipmentActionTypes.DeletePurchaseOrderSuccess:
            const _updatedItems = state.purchaseOrders.filter(item => item.PurchaseOrderID !== action.payload);
            return {
                ...state,
                purchaseOrders: _updatedItems,
                pendingDelete: false,
                error: '',
            };

        case InboundShipmentActionTypes.DeletePurchaseOrderFail:
            return {
                ...state,
                purchaseOrders: null,
                pendingDelete: false,
                error: action.payload,
            };
        
        default:
            return state;
    }
}
