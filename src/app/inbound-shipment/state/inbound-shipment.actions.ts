import { Action } from '@ngrx/store';
import { PurchaseOrder } from 'app/shared/class/purchase-order';

export enum InboundShipmentActionTypes {
  LoadPurchaseOrderOverview = '[InboundShipment] Load Purchase Order Overview',
  LoadPurchaseOrderOverviewSuccess = '[InboundShipment] Load Purchase Order Overview Success',
  LoadPurchaseOrderOverviewFail = '[InboundShipment] Load Purchase Order Overview Fail',
  AddNewPurchaseOrder = '[InboundShipment] Add New Purchase Order',
  AddNewPurchaseOrderSuccess = '[InboundShipment] Add New Purchase Order Success',
  AddNewPurchaseOrderFail = '[InboundShipment] Add New Purchase Order Fail',
  DeletePurchaseOrder = '[InboundShipment] Delete Purchase Order',
  DeletePurchaseOrderSuccess = '[InboundShipment] Delete Purchase Order Success',
  DeletePurchaseOrderFail = '[InboundShipment] Delete Purchase Order Fail',
  
  DownloadPurchaseOrderLabel = '[InboundShipment] Download Purchase Order Label',
  DownloadPurchaseOrderLabelSuccess = '[InboundShipment] Download Purchase Order Label Success',
  DownloadPurchaseOrderLabelFail = '[InboundShipment] Download Purchase Order Label Fail',
  
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


// Union the valid types
export type InboundShipmentActions = LoadPurchaseOrderOverview
| LoadPurchaseOrderOverviewSuccess
| LoadPurchaseOrderOverviewFail
| AddNewPurchaseOrder
| AddNewPurchaseOrderSuccess
| AddNewPurchaseOrderFail
| DownloadPurchaseOrderLabel
| DownloadPurchaseOrderLabelSuccess
| DownloadPurchaseOrderLabelFail
| DeletePurchaseOrder
| DeletePurchaseOrderSuccess
| DeletePurchaseOrderFail;