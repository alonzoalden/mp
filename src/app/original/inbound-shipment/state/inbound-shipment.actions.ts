import { Action } from '@ngrx/store';
import {
    PurchaseOrder,
    PurchaseOrderLine,
    InboundShippingMethod,
    PurchaseOrderLineList,
    Carton
} from '../../../shared/class/purchase-order';
import { ItemList } from '../../../shared/class/item';
import { CustomPrintLabel } from 'app/shared/class/label';

export enum InboundShipmentActionTypes {
    LoadPurchaseOrder = '[InboundShipment] Load Purchase Order',
    LoadPurchaseOrderSuccess = '[InboundShipment] Load Purchase Order Success',
    LoadPurchaseOrderFail = '[InboundShipment] Load Purchase Order Fail',
    LoadPurchaseOrderOverview = '[InboundShipment] Load Purchase Order Overview',
    LoadPurchaseOrderOverviewSuccess = '[InboundShipment] Load Purchase Order Overview Success',
    LoadPurchaseOrderOverviewFail = '[InboundShipment] Load Purchase Order Overview Fail',
    AddNewPurchaseOrder = '[InboundShipment] Add New Purchase Order',
    AddNewPurchaseOrderSuccess = '[InboundShipment] Add New Purchase Order Success',
    AddNewPurchaseOrderFail = '[InboundShipment] Add New Purchase Order Fail',
    LoadCurrentPurchaseOrderEdit = '[InboundShipment] Load Current Purchase Order Edit',
    LoadCurrentPurchaseOrderEditSuccess = '[InboundShipment] Load Current Purchase Order Edit Success',
    LoadCurrentPurchaseOrderEditFail = '[InboundShipment] Load Current Purchase Order Edit Fail',
    EditPurchaseOrder = '[InboundShipment] Edit Purchase Order',
    EditPurchaseOrderSuccess = '[InboundShipment] Edit Purchase Order Success',
    EditPurchaseOrderFail = '[InboundShipment] Edit Purchase Order Fail',
    EditPurchaseOrderThenPrintItemLabels = '[InboundShipment] Edit Purchase Order Then Print Item Labels',
    EditPurchaseOrderThenPrintItemLabelsSuccess = '[InboundShipment] Edit Purchase Order Then Print Item Labels Success',
    EditPurchaseOrderThenPrintItemLabelsFail = '[InboundShipment] Edit Purchase Order Then Print Item Labels Fail',
    EditPurchaseOrderThenPrintItemLabelsCustom = '[InboundShipment] Edit Purchase Order Then Print Item Labels Custom',
    EditPurchaseOrderThenPrintItemLabelsCustomSuccess = '[InboundShipment] Edit Purchase Order Then Print Item Labels Custom Success',
    EditPurchaseOrderThenPrintItemLabelsCustomFail = '[InboundShipment] Edit Purchase Order Then Print Item Labels Custom Fail',
    AddInboundShippingMethod = '[InboundShipment] Add Inbound Shipping Method',
    AddInboundShippingMethodSuccess = '[InboundShipment] Add Inbound Shipping Method Success',
    AddInboundShippingMethodFail = '[InboundShipment] Add Inbound Shipping Method Fail',
    EditInboundShippingMethod = '[InboundShipment] Edit Inbound Shipping Method',
    EditInboundShippingMethodSuccess = '[InboundShipment] Edit Inbound Shipping Method Success',
    EditInboundShippingMethodFail = '[InboundShipment] Edit Inbound Shipping Method Fail',
    DeletePurchaseOrder = '[InboundShipment] Delete Purchase Order',
    DeletePurchaseOrderSuccess = '[InboundShipment] Delete Purchase Order Success',
    DeletePurchaseOrderFail = '[InboundShipment] Delete Purchase Order Fail',
    DownloadPurchaseOrderLabel = '[InboundShipment] Download Purchase Order Label',
    DownloadPurchaseOrderLabelSuccess = '[InboundShipment] Download Purchase Order Label Success',
    DownloadPurchaseOrderLabelFail = '[InboundShipment] Download Purchase Order Label Fail',
    DownloadAllCartonLabel = '[InboundShipment] Download All Carton Label',
    DownloadAllCartonLabelSuccess = '[InboundShipment] Download All Carton Label Success',
    DownloadAllCartonLabelFail = '[InboundShipment] Download All Carton Label Fail',
    DownloadCartonLabelCountCustom = '[InboundShipment] Download All Carton Label Custom',
    DownloadCartonLabelCountCustomSuccess = '[InboundShipment] Download All Carton Label Custom Success',
    DownloadCartonLabelCountCustomFail = '[InboundShipment] Download All Carton Label Custom Fail',
    DownloadAllItemLabel = '[InboundShipment] Download All Item Label',
    DownloadAllItemLabelSuccess = '[InboundShipment] Download All Item Label Success',
    DownloadAllItemLabelFail = '[InboundShipment] Download All Item Label Fail',
    DownloadAllItemLabelCustom = '[InboundShipment] Download All Item Label Custom',
    DownloadAllItemLabelCustomSuccess = '[InboundShipment] Download All Item Label Custom Success',
    DownloadAllItemLabelCustomFail = '[InboundShipment] Download All Item Label Custom Fail',
    DownloadAllItemLargeLabelCustom = '[InboundShipment] Download All Item Large Label Custom',
    DownloadAllItemLargeLabelCustomSuccess = '[InboundShipment] Download All Item Large Label Custom Success',
    DownloadAllItemLargeLabelCustomFail = '[InboundShipment] Download All Item Large Label Custom Fail',
    DownloadAllItemLargeLabel = '[InboundShipment] Download All Item Large Label',
    DownloadAllItemLargeLabelSuccess = '[InboundShipment] Download All Item Large Label Success',
    DownloadAllItemLargeLabelFail = '[InboundShipment] Download All Item Large Label Fail',
    DownloadCartonLabelCount = '[InboundShipment] Download Carton Label Count',
    DownloadCartonLabelCountSuccess = '[InboundShipment] Download Carton Label Count Success',
    DownloadCartonLabelCountFail = '[InboundShipment] Download Carton Label Count Fail',
    DownloadItemLabelCount = '[InboundShipment] Download Item Label Count',
    DownloadItemLabelCountSuccess = '[InboundShipment] Download Item Label Count Success',
    DownloadItemLabelCountFail = '[InboundShipment] Download Item Label Count Fail',
    DownloadItemLargeLabelCount = '[InboundShipment] Download Item Large Label Count',
    DownloadItemLargeLabelCountSuccess = '[InboundShipment] Download Item Large Label Count Success',
    DownloadItemLargeLabelCountFail = '[InboundShipment] Download Item Large Label Count Fail',
    DownloadItemLabelCountCustom = '[InboundShipment] Download Item Label Count Custom',
    DownloadItemLabelCountCustomSuccess = '[InboundShipment] Download Item Label Count Custom Success',
    DownloadItemLabelCountCustomFail = '[InboundShipment] Download Item Label Count Custom Fail',
    DownloadItemLargeLabelCountCustom = '[InboundShipment] Download Item Large Label Count Custom',
    DownloadItemLargeLabelCountCustomSuccess = '[InboundShipment] Download Item Large Label Count Custom Success',
    DownloadItemLargeLabelCountCustomFail = '[InboundShipment] Download Item Large Label Count Custom Fail',
    LoadPurchaseOrderLines = '[InboundShipment] Load Purchase Order Lines',
    LoadPurchaseOrderLinesSuccess = '[InboundShipment] Load Purchase Order Lines Success',
    LoadPurchaseOrderLinesFail = '[InboundShipment] Load Purchase Order Lines Fail',
    LoadPurchaseOrderLineList = '[InboundShipment] Load Purchase Order Line List',
    LoadPurchaseOrderLineListSuccess = '[InboundShipment] Load Purchase Order Line List Success',
    LoadPurchaseOrderLineListFail = '[InboundShipment] Load Purchase Order Line List Fail',
    LoadCartons = '[InboundShipment] Load Cartons List',
    LoadCartonsSuccess = '[InboundShipment] Load Cartons Success',
    LoadCartonsFail = '[InboundShipment] Load Cartons Fail',
    SetSelectedCarton = '[InboundShipment] Set Selected Carton',
    SetSelectedPurchaseOrder = '[InboundShipment] Set Selected Purchase Order',
    LoadInboundShippingMethods = '[InboundShipment] Load Inbound Shipping Methods',
    LoadInboundShippingMethodsSuccess = '[InboundShipment] Load Inbound Shipping Methods Success',
    LoadInboundShippingMethodsFail = '[InboundShipment] Load Inbound Shipping Methods Fail',
    LoadSimpleItemList = '[Item] Load Simple Item List',
    LoadSimpleItemListSuccess = '[Item] Load Simple Item List Success',
    LoadSimpleItemListFail = '[Item] Load Simple Item List Fail'
}

// Action Creators

export class LoadPurchaseOrderOverview implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderOverview;
}
export class LoadPurchaseOrderOverviewSuccess implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderOverviewSuccess;
    constructor(public payload: PurchaseOrder[]) {}
}
export class LoadPurchaseOrderOverviewFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderOverviewFail;
    constructor(public payload: string) {}
}
export class AddNewPurchaseOrder implements Action {
    readonly type = InboundShipmentActionTypes.AddNewPurchaseOrder;
}
export class AddNewPurchaseOrderSuccess implements Action {
    readonly type = InboundShipmentActionTypes.AddNewPurchaseOrderSuccess;
    constructor(public payload: PurchaseOrder) {}
}
export class AddNewPurchaseOrderFail implements Action {
    readonly type = InboundShipmentActionTypes.AddNewPurchaseOrderFail;
    constructor(public payload: string) {}
}
export class EditPurchaseOrder implements Action {
    readonly type = InboundShipmentActionTypes.EditPurchaseOrder;
    constructor(
        public payload: { purchaseOrder: PurchaseOrder; printLabel: boolean }
    ) {}
}
export class EditPurchaseOrderSuccess implements Action {
    readonly type = InboundShipmentActionTypes.EditPurchaseOrderSuccess;
    constructor(public payload: PurchaseOrder) {}
}
export class EditPurchaseOrderFail implements Action {
    readonly type = InboundShipmentActionTypes.EditPurchaseOrderFail;
    constructor(public payload: string) {}
}
export class EditPurchaseOrderThenPrintItemLabels implements Action {
    readonly type = InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabels;
    constructor(
        public payload: {
            purchaseOrder: PurchaseOrder;
            size: string;
            border: string;
        }
    ) {}
}
export class EditPurchaseOrderThenPrintItemLabelsSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabelsSuccess;
    constructor(public payload: PurchaseOrder) {}
}
export class EditPurchaseOrderThenPrintItemLabelsFail implements Action {
    readonly type =
        InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabelsFail;
    constructor(public payload: string) {}
}
export class EditPurchaseOrderThenPrintItemLabelsCustom implements Action {
    readonly type = InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabelsCustom;
    constructor(
        public payload: { purchaseOrder: PurchaseOrder, options: CustomPrintLabel, size: string }
    ) {}
}
export class EditPurchaseOrderThenPrintItemLabelsCustomSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabelsCustomSuccess;
    constructor(public payload: PurchaseOrder) {}
}
export class EditPurchaseOrderThenPrintItemLabelsCustomFail implements Action {
    readonly type =
        InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabelsCustomFail;
    constructor(public payload: string) {}
}
export class AddInboundShippingMethod implements Action {
    readonly type = InboundShipmentActionTypes.AddInboundShippingMethod;
    constructor(public payload: InboundShippingMethod) {}
}
export class AddInboundShippingMethodSuccess implements Action {
    readonly type = InboundShipmentActionTypes.AddInboundShippingMethodSuccess;
    constructor(public payload: InboundShippingMethod) {}
}
export class AddInboundShippingMethodFail implements Action {
    readonly type = InboundShipmentActionTypes.AddInboundShippingMethodFail;
    constructor(public payload: string) {}
}
export class EditInboundShippingMethod implements Action {
    readonly type = InboundShipmentActionTypes.EditInboundShippingMethod;
    constructor(public payload: InboundShippingMethod) {}
}
export class EditInboundShippingMethodSuccess implements Action {
    readonly type = InboundShipmentActionTypes.EditInboundShippingMethodSuccess;
    constructor(public payload: InboundShippingMethod) {}
}
export class EditInboundShippingMethodFail implements Action {
    readonly type = InboundShipmentActionTypes.EditInboundShippingMethodFail;
    constructor(public payload: string) {}
}
export class DeletePurchaseOrder implements Action {
    readonly type = InboundShipmentActionTypes.DeletePurchaseOrder;
    constructor(public payload: PurchaseOrder) {}
}
export class DeletePurchaseOrderSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DeletePurchaseOrderSuccess;
    constructor(public payload: number) {}
}
export class DeletePurchaseOrderFail implements Action {
    readonly type = InboundShipmentActionTypes.DeletePurchaseOrderFail;
    constructor(public payload: string) {}
}
export class DownloadPurchaseOrderLabel implements Action {
    readonly type = InboundShipmentActionTypes.DownloadPurchaseOrderLabel;
    constructor(public payload: PurchaseOrder) {}
}
export class DownloadPurchaseOrderLabelSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.DownloadPurchaseOrderLabelSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadPurchaseOrderLabelFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadPurchaseOrderLabelFail;
    constructor(public payload: string) {}
}
export class DownloadAllCartonLabel implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllCartonLabel;
    constructor(public payload: PurchaseOrder) {}
}
export class DownloadAllCartonLabelSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllCartonLabelSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadAllCartonLabelFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllCartonLabelFail;
    constructor(public payload: string) {}
}

export class DownloadCartonLabelCountCustom implements Action {
    readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountCustom;
    constructor(public payload: { carton: Carton; options: CustomPrintLabel }) {}
}
export class DownloadCartonLabelCountCustomSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountCustomSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadCartonLabelCountCustomFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountCustomFail;
    constructor(public payload: string) {}
}

export class DownloadAllItemLabel implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLabel;
    constructor(
        public payload: { purchaseOrder: PurchaseOrder; border: string }
    ) {}
}
export class DownloadAllItemLabelSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLabelSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadAllItemLabelFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLabelFail;
    constructor(public payload: string) {}
}

export class DownloadAllItemLabelCustom implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLabelCustom;
    constructor(
        public payload: { purchaseOrder: PurchaseOrder; options: CustomPrintLabel }
    ) {}
}
export class DownloadAllItemLabelCustomSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLabelCustomSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadAllItemLabelCustomFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLabelCustomFail;
    constructor(public payload: string) {}
}


export class DownloadAllItemLargeLabelCustom implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelCustom;
    constructor(
        public payload: { purchaseOrder: PurchaseOrder; options: CustomPrintLabel }
    ) {}
}
export class DownloadAllItemLargeLabelCustomSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelCustomSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadAllItemLargeLabelCustomFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelCustomFail;
    constructor(public payload: string) {}
}

export class DownloadAllItemLargeLabel implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabel;
    constructor(
        public payload: { purchaseOrder: PurchaseOrder; border: string }
    ) {}
}
export class DownloadAllItemLargeLabelSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadAllItemLargeLabelFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelFail;
    constructor(public payload: string) {}
}

export class DownloadCartonLabelCount implements Action {
    readonly type = InboundShipmentActionTypes.DownloadCartonLabelCount;
    constructor(
        public payload: { carton: Carton; count: number; border: string }
    ) {}
}

export class DownloadCartonLabelCountSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadCartonLabelCountFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountFail;
    constructor(public payload: string) {}
}
export class DownloadItemLabelCount implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLabelCount;
    constructor(
        public payload: {
            purchaseorderline: PurchaseOrderLine;
            count: number;
            border: string;
        }
    ) {}
}
export class DownloadItemLabelCountSuccess implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLabelCountSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadItemLabelCountFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLabelCountFail;
    constructor(public payload: string) {}
}
export class DownloadItemLargeLabelCount implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCount;
    constructor(
        public payload: {
            purchaseorderline: PurchaseOrderLine;
            count: number;
            border: string;
        }
    ) {}
}
export class DownloadItemLargeLabelCountSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.DownloadItemLargeLabelCountSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadItemLargeLabelCountFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCountFail;
    constructor(public payload: string) {}
}

export class DownloadItemLabelCountCustom implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLabelCountCustom;
    constructor(public payload: { purchaseorderline: PurchaseOrderLine, options: CustomPrintLabel }) {}
}

export class DownloadItemLabelCountCustomSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.DownloadItemLabelCountCustomSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadItemLabelCountCustomFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLabelCountCustomFail;
    constructor(public payload: string) {}
}

export class DownloadItemLargeLabelCountCustom implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCountCustom;
    constructor(public payload: { purchaseorderline: PurchaseOrderLine, options: CustomPrintLabel }) {}
}

export class DownloadItemLargeLabelCountCustomSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.DownloadItemLargeLabelCountCustomSuccess;
    constructor(public payload: Blob) {}
}
export class DownloadItemLargeLabelCountCustomFail implements Action {
    readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCountCustomFail;
    constructor(public payload: string) {}
}

export class LoadCurrentPurchaseOrderEdit implements Action {
    readonly type = InboundShipmentActionTypes.LoadCurrentPurchaseOrderEdit;
    constructor(public payload: number) {}
}
export class LoadCurrentPurchaseOrderEditSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.LoadCurrentPurchaseOrderEditSuccess;
    constructor(public payload: PurchaseOrder) {}
}
export class LoadCurrentPurchaseOrderEditFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadCurrentPurchaseOrderEditFail;
    constructor(public payload: string) {}
}
export class LoadPurchaseOrder implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrder;
    constructor(public payload: number) {}
}
export class LoadPurchaseOrderSuccess implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderSuccess;
    constructor(public payload: PurchaseOrder) {}
}
export class LoadPurchaseOrderFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderFail;
    constructor(public payload: string) {}
}
export class LoadPurchaseOrderLines implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLines;
    constructor(public payload: number) {}
}
export class LoadPurchaseOrderLinesSuccess implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLinesSuccess;
    constructor(public payload: PurchaseOrderLine[]) {}
}
export class LoadPurchaseOrderLinesFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLinesFail;
    constructor(public payload: string) {}
}
export class LoadCartons implements Action {
    readonly type = InboundShipmentActionTypes.LoadCartons;
    constructor(public payload: number) {}
}
export class LoadCartonsSuccess implements Action {
    readonly type = InboundShipmentActionTypes.LoadCartonsSuccess;
    constructor(public payload: Carton[]) {}
}
export class LoadCartonsFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadCartonsFail;
    constructor(public payload: string) {}
}
export class SetSelectedCarton implements Action {
    readonly type = InboundShipmentActionTypes.SetSelectedCarton;
    constructor(public payload: Carton) {}
}
export class SetSelectedPurchaseOrder implements Action {
    readonly type = InboundShipmentActionTypes.SetSelectedPurchaseOrder;
    constructor(public payload: PurchaseOrder) {}
}

export class LoadPurchaseOrderLineList implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLineList;
    constructor(public payload: number) {}
}

export class LoadPurchaseOrderLineListSuccess implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLineListSuccess;
    constructor(public payload: PurchaseOrderLineList[]) {}
}
export class LoadPurchaseOrderLineListFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLineListFail;
    constructor(public payload: string) {}
}
export class LoadInboundShippingMethods implements Action {
    readonly type = InboundShipmentActionTypes.LoadInboundShippingMethods;
    constructor(public payload: number) {}
}
export class LoadInboundShippingMethodsSuccess implements Action {
    readonly type =
        InboundShipmentActionTypes.LoadInboundShippingMethodsSuccess;
    constructor(public payload: InboundShippingMethod[]) {}
}
export class LoadInboundShippingMethodsFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadInboundShippingMethodsFail;
    constructor(public payload: string) {}
}
export class LoadSimpleItemList implements Action {
    readonly type = InboundShipmentActionTypes.LoadSimpleItemList;
}
export class LoadSimpleItemListSuccess implements Action {
    readonly type = InboundShipmentActionTypes.LoadSimpleItemListSuccess;
    constructor(public payload: ItemList[]) {}
}
export class LoadSimpleItemListFail implements Action {
    readonly type = InboundShipmentActionTypes.LoadSimpleItemListFail;
    constructor(public payload: string) {}
}

// Union the valid types
export type InboundShipmentActions =
    | LoadPurchaseOrder
    | LoadPurchaseOrderSuccess
    | LoadPurchaseOrderFail
    | LoadPurchaseOrderLines
    | LoadPurchaseOrderLinesSuccess
    | LoadPurchaseOrderLinesFail
    | LoadPurchaseOrderLineList
    | LoadPurchaseOrderLineListSuccess
    | LoadPurchaseOrderLineListFail
    | LoadPurchaseOrderOverview
    | LoadPurchaseOrderOverviewSuccess
    | LoadPurchaseOrderOverviewFail
    | LoadInboundShippingMethods
    | LoadInboundShippingMethodsSuccess
    | LoadInboundShippingMethodsFail
    | LoadCurrentPurchaseOrderEdit
    | LoadCurrentPurchaseOrderEditSuccess
    | LoadCurrentPurchaseOrderEditFail
    | LoadCartons
    | LoadCartonsSuccess
    | LoadCartonsFail
    | SetSelectedCarton
    | SetSelectedPurchaseOrder
    | AddNewPurchaseOrder
    | AddNewPurchaseOrderSuccess
    | AddNewPurchaseOrderFail
    | EditPurchaseOrder
    | EditPurchaseOrderSuccess
    | EditPurchaseOrderFail
    | EditPurchaseOrderThenPrintItemLabels
    | EditPurchaseOrderThenPrintItemLabelsSuccess
    | EditPurchaseOrderThenPrintItemLabelsFail
    | EditPurchaseOrderThenPrintItemLabelsCustom
    | EditPurchaseOrderThenPrintItemLabelsCustomSuccess
    | EditPurchaseOrderThenPrintItemLabelsCustomFail
    | AddInboundShippingMethod
    | AddInboundShippingMethodSuccess
    | AddInboundShippingMethodFail
    | EditInboundShippingMethod
    | EditInboundShippingMethodSuccess
    | EditInboundShippingMethodFail
    | DownloadPurchaseOrderLabel
    | DownloadPurchaseOrderLabelSuccess
    | DownloadPurchaseOrderLabelFail
    | DownloadAllCartonLabel
    | DownloadAllCartonLabelSuccess
    | DownloadAllCartonLabelFail
    | DownloadAllItemLabel
    | DownloadAllItemLabelSuccess
    | DownloadAllItemLabelFail
    | DownloadAllItemLabelCustom
    | DownloadAllItemLabelCustomSuccess
    | DownloadAllItemLabelCustomFail
    | DownloadAllItemLargeLabelCustom
    | DownloadAllItemLargeLabelCustomSuccess
    | DownloadAllItemLargeLabelCustomFail
    | DownloadAllItemLargeLabel
    | DownloadAllItemLargeLabelSuccess
    | DownloadAllItemLargeLabelFail
    | DownloadCartonLabelCount
    | DownloadCartonLabelCountSuccess
    | DownloadCartonLabelCountFail
    | DownloadItemLabelCount
    | DownloadItemLabelCountSuccess
    | DownloadItemLabelCountFail
    | DownloadItemLargeLabelCount
    | DownloadItemLargeLabelCountSuccess
    | DownloadItemLargeLabelCountFail
    | DeletePurchaseOrder
    | DeletePurchaseOrderSuccess
    | DeletePurchaseOrderFail
    | LoadSimpleItemList
    | LoadSimpleItemListSuccess
    | LoadSimpleItemListFail
    | DownloadCartonLabelCountCustom
    | DownloadCartonLabelCountCustomSuccess
    | DownloadCartonLabelCountCustomFail;
