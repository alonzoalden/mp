import { InboundShipmentActionTypes, InboundShipmentActions } from './inbound-shipment.actions';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { ItemInsert, ItemList, ItemOption, ItemOptionInsert, ItemSelectionInsert, ItemCategoryAssignment, Item, ItemCrossSellInsert, ItemUpSellInsert, ItemRelatedProductInsert, ItemBatch, ItemPrintLabel } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { Category } from '../../shared/class/category';
import { VendorAttachment, VendorAttachmentList } from '../../shared/class/vendor-attachment';
import { BatchUpdate } from '../../shared/class/batch-update';
import { PurchaseOrder, PurchaseOrderLine, InboundShippingMethod, PurchaseOrderLineList, Carton } from '../../shared/class/purchase-order';

// State for this feature (Item Variation)
export interface InboundShipmentState {
    purchaseOrders: PurchaseOrder[];
    currentPurchaseOrder: PurchaseOrder;
    purchaseOrdersLines: PurchaseOrderLine[];
    purchaseOrderLineList: PurchaseOrderLineList[];
    inboundShippingMethods: InboundShippingMethod[];
    simpleItemList: ItemList[];
    cartons: Carton[];
    selectedCarton: Carton;
    isLoading: boolean;
    isListLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    pendingAdd: boolean,
    error: string;
};

const initialState: InboundShipmentState = {
    purchaseOrders: [],
    currentPurchaseOrder: null,
    purchaseOrdersLines: [],
    purchaseOrderLineList: [],
    inboundShippingMethods: [],
    cartons: [],
    selectedCarton: null,
    simpleItemList: [],
    isLoading: true,
    isListLoading: true,
    pendingDelete: false,
    pendingSave: false,
    pendingAdd: false,
    error: ''
};

export function inboundShipmentReducer(state = initialState, action: InboundShipmentActions): InboundShipmentState {
    
    switch (action.type) {
        case InboundShipmentActionTypes.LoadPurchaseOrder:
            return {
                ...state,
                // currentPurchaseOrder: null,
                isLoading: true,
                error: '',
            };
        case InboundShipmentActionTypes.LoadPurchaseOrderSuccess:
            return {
                ...state,
                currentPurchaseOrder: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderFail:
            return {
                ...state,
                currentPurchaseOrder: null,
                isLoading: false,
                error: action.payload,
            };

        
        case InboundShipmentActionTypes.LoadCurrentPurchaseOrderEdit:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case InboundShipmentActionTypes.LoadCurrentPurchaseOrderEditSuccess:
            return {
                ...state,
                currentPurchaseOrder: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadCurrentPurchaseOrderEditFail:
            return {
                ...state,
                currentPurchaseOrder: null,
                isLoading: false,
                error: action.payload,
            };
        
        case InboundShipmentActionTypes.LoadCartons:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case InboundShipmentActionTypes.LoadCartonsSuccess:
            state.currentPurchaseOrder.Cartons = action.payload;
            return {
                ...state,
                cartons: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadCartonsFail:
            return {
                ...state,
                cartons: [],
                isLoading: false,
                error: action.payload,
            };


        case InboundShipmentActionTypes.SetSelectedCarton:
            return {
                ...state,
                selectedCarton: action.payload,
                error: '',
            };

        case InboundShipmentActionTypes.LoadCartonsSuccess:
            state.currentPurchaseOrder.Cartons = action.payload;
            return {
                ...state,
                cartons: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadCartonsFail:
            return {
                ...state,
                cartons: [],
                isLoading: false,
                error: action.payload,
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderOverview:
            return {
                ...state,
                isListLoading: true,
                error: '',
            };
        case InboundShipmentActionTypes.LoadPurchaseOrderOverviewSuccess:
            return {
                ...state,
                purchaseOrders: action.payload,
                isListLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderOverviewFail:
            return {
                ...state,
                purchaseOrders: [],
                isListLoading: false,
                error: action.payload,
            };
        case InboundShipmentActionTypes.LoadPurchaseOrderLinesSuccess:
            state.currentPurchaseOrder.PurchaseOrderLines = action.payload;
            return {
                ...state,
                purchaseOrdersLines: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderLinesFail:
            return {
                ...state,
                purchaseOrdersLines: [],
                isLoading: false,
                error: action.payload,
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderLineListSuccess:
            return {
                ...state,
                purchaseOrderLineList: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadPurchaseOrderLineListFail:
            return {
                ...state,
                purchaseOrderLineList: [],
                isLoading: false,
                error: action.payload,
            };
        

        case InboundShipmentActionTypes.LoadInboundShippingMethodsSuccess:
            return {
                ...state,
                inboundShippingMethods: action.payload,
                isLoading: false,
                error: '',
            };

        case InboundShipmentActionTypes.LoadInboundShippingMethodsFail:
            return {
                ...state,
                inboundShippingMethods: [],
                isLoading: false,
                error: action.payload,
            };
            
        case InboundShipmentActionTypes.AddNewPurchaseOrderSuccess:
            return {
                ...state,
                isLoading: false,
                currentPurchaseOrder: action.payload,
                error: '',
            };

        case InboundShipmentActionTypes.AddNewPurchaseOrderFail:
            return {
                ...state,
                currentPurchaseOrder: null,
                isLoading: false,
                error: action.payload,
            };
        
        case InboundShipmentActionTypes.EditPurchaseOrder:
            return {
                ...state,
                pendingSave: true,
            };
        case InboundShipmentActionTypes.EditPurchaseOrderSuccess:
            return {
                ...state,
                currentPurchaseOrder: action.payload,
                pendingSave: false,
                error: '',
            };

        case InboundShipmentActionTypes.EditPurchaseOrderFail:
            return {
                ...state,
                pendingSave: false,
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

        case InboundShipmentActionTypes.LoadSimpleItemListSuccess:
            return {
                ...state,
                simpleItemList: action.payload,
                error: '',
            };
        case InboundShipmentActionTypes.LoadSimpleItemListFail:
            return {
                ...state,
                simpleItemList: [],
                error: action.payload,
            };

        case InboundShipmentActionTypes.UpdatePurchaseLineCartonQuantity:
            //console.log(action.payload);
        return {
                ...state,
            };
            
        default:
            return state;
    }
}
