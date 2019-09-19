import { Action } from '@ngrx/store';
import { PurchaseOrder, PurchaseOrderLine, InboundShippingMethod, PurchaseOrderLineList, Carton } from '../../shared/class/purchase-order';

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
  DeletePurchaseOrder = '[InboundShipment] Delete Purchase Order',
  DeletePurchaseOrderSuccess = '[InboundShipment] Delete Purchase Order Success',
  DeletePurchaseOrderFail = '[InboundShipment] Delete Purchase Order Fail',
  DownloadPurchaseOrderLabel = '[InboundShipment] Download Purchase Order Label',
  DownloadPurchaseOrderLabelSuccess = '[InboundShipment] Download Purchase Order Label Success',
  DownloadPurchaseOrderLabelFail = '[InboundShipment] Download Purchase Order Label Fail',

  DownloadAllCartonLabel = '[InboundShipment] Download All Carton Label',
  DownloadAllCartonLabelSuccess = '[InboundShipment] Download All Carton Label Success',
  DownloadAllCartonLabelFail = '[InboundShipment] Download All Carton Label Fail',

  DownloadAllItemLabel = '[InboundShipment] Download All Item Label',
  DownloadAllItemLabelSuccess = '[InboundShipment] Download All Item Label Success',
  DownloadAllItemLabelFail = '[InboundShipment] Download All Item Label Fail',
  
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

   
  LoadPurchaseOrderLines = '[InboundShipment] Load Purchase Order Lines',
  LoadPurchaseOrderLinesSuccess = '[InboundShipment] Load Purchase Order Lines Success',
  LoadPurchaseOrderLinesFail = '[InboundShipment] Load Purchase Order Lines Fail',

  LoadPurchaseOrderLineList = '[InboundShipment] Load Purchase Order Line List',
  LoadPurchaseOrderLineListSuccess = '[InboundShipment] Load Purchase Order Line List Success',
  LoadPurchaseOrderLineListFail = '[InboundShipment] Load Purchase Order Line List Fail',

  LoadCartons = '[InboundShipment] Load Cartons List',
  LoadCartonsSuccess = '[InboundShipment] Load Cartons Success',
  LoadCartonsFail = '[InboundShipment] Load Cartons Fail',
  

  LoadInboundShippingMethods = '[InboundShipment] Load Inbound Shipping Methods',
  LoadInboundShippingMethodsSuccess = '[InboundShipment] Load Inbound Shipping Methods Success',
  LoadInboundShippingMethodsFail = '[InboundShipment] Load Inbound Shipping Methods Fail',
}

// Action Creators

export class LoadPurchaseOrderOverview implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderOverview;
}

export class LoadPurchaseOrderOverviewSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderOverviewSuccess;
  constructor(public payload: PurchaseOrder[]) { }
}

export class LoadPurchaseOrderOverviewFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderOverviewFail;
  constructor(public payload: string) { }
}

export class AddNewPurchaseOrder implements Action {
  readonly type = InboundShipmentActionTypes.AddNewPurchaseOrder;
}

export class AddNewPurchaseOrderSuccess implements Action {
  readonly type = InboundShipmentActionTypes.AddNewPurchaseOrderSuccess;
  constructor(public payload: PurchaseOrder) { }
}

export class AddNewPurchaseOrderFail implements Action {
  readonly type = InboundShipmentActionTypes.AddNewPurchaseOrderFail;
  constructor(public payload: string) { }
}

export class EditPurchaseOrder implements Action {
  readonly type = InboundShipmentActionTypes.EditPurchaseOrder;
  constructor(public payload: PurchaseOrder) { }
}

export class EditPurchaseOrderSuccess implements Action {
  readonly type = InboundShipmentActionTypes.EditPurchaseOrderSuccess;
  constructor(public payload: PurchaseOrder) { }
}

export class EditPurchaseOrderFail implements Action {
  readonly type = InboundShipmentActionTypes.EditPurchaseOrderFail;
  constructor(public payload: string) { }
}

export class DeletePurchaseOrder implements Action {
  readonly type = InboundShipmentActionTypes.DeletePurchaseOrder;
  constructor(public payload: PurchaseOrder) { }
}

export class DeletePurchaseOrderSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DeletePurchaseOrderSuccess;
  constructor(public payload: number) { }
}

export class DeletePurchaseOrderFail implements Action {
  readonly type = InboundShipmentActionTypes.DeletePurchaseOrderFail;
  constructor(public payload: string) { }
}


export class DownloadPurchaseOrderLabel implements Action {
  readonly type = InboundShipmentActionTypes.DownloadPurchaseOrderLabel;
  constructor(public payload: PurchaseOrder) { }
}

export class DownloadPurchaseOrderLabelSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadPurchaseOrderLabelSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadPurchaseOrderLabelFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadPurchaseOrderLabelFail;
  constructor(public payload: string) { }
}

export class DownloadAllCartonLabel implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllCartonLabel;
  constructor(public payload: PurchaseOrder) { }
}

export class DownloadAllCartonLabelSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllCartonLabelSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadAllCartonLabelFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllCartonLabelFail;
  constructor(public payload: string) { }
}


export class DownloadAllItemLabel implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllItemLabel;
  constructor(public payload: {purchaseOrder: PurchaseOrder, border: string}) { }
}

export class DownloadAllItemLabelSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllItemLabelSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadAllItemLabelFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllItemLabelFail;
  constructor(public payload: string) { }
}


export class DownloadAllItemLargeLabel implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabel;
  constructor(public payload: {purchaseOrder: PurchaseOrder, border: string}) { }
}

export class DownloadAllItemLargeLabelSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadAllItemLargeLabelFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadAllItemLargeLabelFail;
  constructor(public payload: string) { }
}

export class DownloadCartonLabelCount implements Action {
  readonly type = InboundShipmentActionTypes.DownloadCartonLabelCount;
  constructor(public payload: { carton: Carton, count: number, border: string}) { }
}

export class DownloadCartonLabelCountSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadCartonLabelCountFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadCartonLabelCountFail;
  constructor(public payload: string) { }
}

export class DownloadItemLabelCount implements Action {
  readonly type = InboundShipmentActionTypes.DownloadItemLabelCount;
  constructor(public payload: { purchaseorderline: PurchaseOrderLine, count: number, border: string}) { }
}

export class DownloadItemLabelCountSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadItemLabelCountSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadItemLabelCountFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadItemLabelCountFail;
  constructor(public payload: string) { }
}

export class DownloadItemLargeLabelCount implements Action {
  readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCount;
  constructor(public payload: { purchaseorderline: PurchaseOrderLine, count: number, border: string}) { }
}

export class DownloadItemLargeLabelCountSuccess implements Action {
  readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCountSuccess;
  constructor(public payload: Blob) { }
}

export class DownloadItemLargeLabelCountFail implements Action {
  readonly type = InboundShipmentActionTypes.DownloadItemLargeLabelCountFail;
  constructor(public payload: string) { }
}



export class LoadCurrentPurchaseOrderEdit implements Action {
  readonly type = InboundShipmentActionTypes.LoadCurrentPurchaseOrderEdit;
  constructor(public payload: number) { }
}

export class LoadCurrentPurchaseOrderEditSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadCurrentPurchaseOrderEditSuccess;
  constructor(public payload: PurchaseOrder) { }
}

export class LoadCurrentPurchaseOrderEditFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadCurrentPurchaseOrderEditFail;
  constructor(public payload: string) { }
}



export class LoadPurchaseOrder implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrder;
  constructor(public payload: number) { }
}

export class LoadPurchaseOrderSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderSuccess;
  constructor(public payload: PurchaseOrder) { }
}

export class LoadPurchaseOrderFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderFail;
  constructor(public payload: string) { }
}

export class LoadPurchaseOrderLines implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLines;
  constructor(public payload: number) { }
}

export class LoadPurchaseOrderLinesSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLinesSuccess;
  constructor(public payload: PurchaseOrderLine[]) { }
}

export class LoadPurchaseOrderLinesFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLinesFail;
  constructor(public payload: string) { }
}


export class LoadCartons implements Action {
  readonly type = InboundShipmentActionTypes.LoadCartons;
  constructor(public payload: number) { }
}

export class LoadCartonsSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadCartonsSuccess;
  constructor(public payload: Carton[]) { }
}

export class LoadCartonsFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadCartonsFail;
  constructor(public payload: string) { }
}

export class LoadPurchaseOrderLineList implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLineList;
  constructor(public payload: number) { }
}

export class LoadPurchaseOrderLineListSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLineListSuccess;
  constructor(public payload: PurchaseOrderLineList[]) { }
}

export class LoadPurchaseOrderLineListFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadPurchaseOrderLineListFail;
  constructor(public payload: string) { }
}


export class LoadInboundShippingMethods implements Action {
  readonly type = InboundShipmentActionTypes.LoadInboundShippingMethods;
  constructor(public payload: number) { }
}

export class LoadInboundShippingMethodsSuccess implements Action {
  readonly type = InboundShipmentActionTypes.LoadInboundShippingMethodsSuccess;
  constructor(public payload: InboundShippingMethod[]) { }
}

export class LoadInboundShippingMethodsFail implements Action {
  readonly type = InboundShipmentActionTypes.LoadInboundShippingMethodsFail;
  constructor(public payload: string) { }
}

// Union the valid types
export type InboundShipmentActions = LoadPurchaseOrder
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
| AddNewPurchaseOrder
| AddNewPurchaseOrderSuccess
| AddNewPurchaseOrderFail
| EditPurchaseOrder
| EditPurchaseOrderSuccess
| EditPurchaseOrderFail
| DownloadPurchaseOrderLabel
| DownloadPurchaseOrderLabelSuccess
| DownloadPurchaseOrderLabelFail
| DownloadAllCartonLabel
| DownloadAllCartonLabelSuccess
| DownloadAllCartonLabelFail
| DownloadAllItemLabel
| DownloadAllItemLabelSuccess
| DownloadAllItemLabelFail
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
| DeletePurchaseOrderFail;