import { Action } from '@ngrx/store';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment } from 'app/shared/class/fulfillment';

export enum SalesOrderActionTypes {
  LoadSalesOrders = '[Sales Order] Load Sales Orders',
  LoadSalesOrdersSuccess = '[Sales Order] Load Sales Orders Success',
  LoadSalesOrdersFail = '[Sales Order] Load Sales Orders Fail',
  LoadSalesOrder = '[Sales Order] Load Sales Order',
  SetSalesOrder = '[Sales Order] Set Sales Order',
  SetSalesOrderID = '[Sales Order] Set Sales Order ID',
  SetFulfillment = '[Sales Order] Set Fulfillment',
  LoadSalesOrderSuccess = '[Sales Order] Load Sales Order Success',
  LoadSalesOrderFail = '[Sales Order] Load Sales Order Fail',
  LoadSalesOrderLines = '[Sales Order] Load Sales Order Lines',
  LoadSalesOrderLinesSuccess = '[Sales Order] Load Sales Order Lines Success',
  LoadSalesOrderLinesFail = '[Sales Order] Load Sales Order Lines Fail',
  CancelSalesOrderLines = '[Sales Order] Cancel Sales Order Lines',
  CancelSalesOrderLinesSuccess = '[Sales Order] Cancel Sales Order Lines Success',
  CancelSalesOrderLinesFail = '[Sales Order] Cancel Sales Order Lines Fail',
  LoadFulfilledBySalesOrderDelivery = '[Sales Order] Load Fulfilled By Sales Order Delivery',
  LoadFulfilledBySalesOrderDeliverySuccess = '[Sales Order] Load Fulfilled By Sales Order Delivery Success',
  LoadFulfilledBySalesOrderDeliveryFail = '[Sales Order] Load Fulfilled By Sales Order Delivery Fail',
  DownloadSalesOrderPackingSlip = '[Sales Order] Download Sales Order Packing Slip ',
  DownloadSalesOrderPackingSlipSuccess = '[Sales Order] Download Sales Order Packing Slip Success',
  DownloadSalesOrderPackingSlipFail = '[Sales Order] Download Sales Order Packing Slip Fail',
  LoadFulfilledByFulfillments = '[Sales Order] Load Fulfilled By Fulfillments',
  LoadFulfilledByFulfillmentsSuccess = '[Sales Order] Load Fulfilled By Fulfillments Success',
  LoadFulfilledByFulfillmentsFail = '[Sales Order] Load Fulfilled By Fulfillments Fail',
  LoadFulfilledByFulfillment = '[Sales Order] Load Fulfilled By Fulfillment',
  LoadFulfilledByFulfillmentSuccess = '[Sales Order] Load Fulfilled By Fulfillment Success',
  LoadFulfilledByFulfillmentFail = '[Sales Order] Load Fulfilled By Fulfillment Fail',
  LoadSalesOrderDelivery = '[Sales Order] Load Sales Order Delivery',
  LoadSalesOrderDeliverySuccess = '[Sales Order] Load Sales Order Delivery Success',
  LoadSalesOrderDeliveryFail = '[Sales Order] Load Sales Order Delivery Fail',
  DeleteFulfillment  = '[Sales Order] Delete Fulfillment',
  DeleteFulfillmentSuccess  = '[Sales Order] Delete Fulfillment Success',
  DeleteFulfillmentFail  = '[Sales Order] Delete Fulfillment Fail',
  EditFulfillment  = '[Sales Order] Edit Fulfillment',
  EditFulfillmentSuccess  = '[Sales Order] Edit Fulfillment Success',
  EditFulfillmentFail  = '[Sales Order] Edit Fulfillment Fail',

  
  // EditCurrentMember = '[Admin] Edit Current Member',
  // EditCurrentMemberSuccess = '[Admin] Edit Current Member Success',
  // EditCurrentMemberFail = '[Admin] Edit Current Member Fail',
}

// Action Creators
export class LoadSalesOrders implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrders;
  constructor(public payload: { fulfilledby: string, status: string }) { }
}

export class LoadSalesOrdersSuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrdersSuccess;
  constructor(public payload: SalesOrder[]) { }
}

export class LoadSalesOrdersFail implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrdersFail;
  constructor(public payload: string) { }
}

export class SetSalesOrder implements Action {
  readonly type = SalesOrderActionTypes.SetSalesOrder;
  constructor(public payload: SalesOrder) { }
}
export class SetSalesOrderID implements Action {
  readonly type = SalesOrderActionTypes.SetSalesOrderID;
  constructor(public payload: number) { }
}
export class SetFulfillment implements Action {
  readonly type = SalesOrderActionTypes.SetFulfillment;
  constructor(public payload: Fulfillment) { }
}
export class LoadSalesOrder implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrder;
  constructor(public payload: { orderid: number, fulfilledby: string }) { }
}

export class LoadSalesOrderSuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderSuccess;
  constructor(public payload: SalesOrder) { }
}

export class LoadSalesOrderFail implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderFail;
  constructor(public payload: string) { }
}

export class LoadSalesOrderLines implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderLines;
  constructor(public payload: { orderid: number, fulfilledby: string }) { }
}

export class LoadSalesOrderLinesSuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderLinesSuccess;
  constructor(public payload: SalesOrderLine[]) { }
}

export class LoadSalesOrderLinesFail implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderLinesFail;
  constructor(public payload: string) { }
}

export class CancelSalesOrderLines implements Action {
  readonly type = SalesOrderActionTypes.CancelSalesOrderLines;
  constructor(public payload: SalesOrderLine[]) { }
}

export class CancelSalesOrderLinesSuccess implements Action {
  readonly type = SalesOrderActionTypes.CancelSalesOrderLinesSuccess;
  constructor(public payload: SalesOrderLine[]) { }
}

export class CancelSalesOrderLinesFail implements Action {
  readonly type = SalesOrderActionTypes.CancelSalesOrderLinesFail;
  constructor(public payload: string) { }
}

export class LoadFulfilledBySalesOrderDelivery implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledBySalesOrderDelivery;
  constructor(public payload: { orderid: number, fulfilledby: string }) { }
}
export class LoadFulfilledBySalesOrderDeliverySuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledBySalesOrderDeliverySuccess;
  constructor(public payload: string) { }
}
export class LoadFulfilledBySalesOrderDeliveryFail implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledBySalesOrderDeliveryFail;
  constructor(public payload: string) { }
}

export class LoadFulfilledByFulfillments implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledByFulfillments;
  constructor(public payload: { orderid: number, fulfilledby: string }) { }
}
export class LoadFulfilledByFulfillmentsSuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledByFulfillmentsSuccess;
  constructor(public payload: Fulfillment[]) { }
}
export class LoadFulfilledByFulfillmentsFail implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledByFulfillmentsFail;
  constructor(public payload: string) { }
}

export class LoadFulfilledByFulfillment implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledByFulfillment;
  constructor(public payload: { fulfillmentid: number, fulfilledby: string }) { }
}
export class LoadFulfilledByFulfillmentSuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledByFulfillmentSuccess;
  constructor(public payload: Fulfillment) { }
}
export class LoadFulfilledByFulfillmentFail implements Action {
  readonly type = SalesOrderActionTypes.LoadFulfilledByFulfillmentFail;
  constructor(public payload: string) { }
}

export class EditFulfillment implements Action {
  readonly type = SalesOrderActionTypes.EditFulfillment;
  constructor(public payload: Fulfillment) { }
}
export class EditFulfillmentSuccess implements Action {
  readonly type = SalesOrderActionTypes.EditFulfillmentSuccess;
  constructor(public payload: Fulfillment) { }
}
export class EditFulfillmentFail implements Action {
  readonly type = SalesOrderActionTypes.EditFulfillmentFail;
  constructor(public payload: string) { }
}

export class DeleteFulfillment implements Action {
  readonly type = SalesOrderActionTypes.DeleteFulfillment;
  constructor(public payload: number) { }
}
export class DeleteFulfillmentSuccess implements Action {
  readonly type = SalesOrderActionTypes.DeleteFulfillmentSuccess;
  constructor(public payload: Fulfillment) { }
}
export class DeleteFulfillmentFail implements Action {
  readonly type = SalesOrderActionTypes.DeleteFulfillmentFail;
  constructor(public payload: string) { }
}

export class LoadSalesOrderDelivery implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderDelivery;
  constructor(public payload: number) { }
}
export class LoadSalesOrderDeliverySuccess implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderDeliverySuccess;
  constructor(public payload: string) { }
}
export class LoadSalesOrderDeliveryFail implements Action {
  readonly type = SalesOrderActionTypes.LoadSalesOrderDeliveryFail;
  constructor(public payload: string) { }
}


export class DownloadSalesOrderPackingSlip implements Action {
  readonly type = SalesOrderActionTypes.DownloadSalesOrderPackingSlip;
  constructor(public payload: SalesOrder) { }
}

export class DownloadSalesOrderPackingSlipSuccess implements Action {
  readonly type = SalesOrderActionTypes.DownloadSalesOrderPackingSlipSuccess;
  constructor(public payload: any) { }
}

export class DownloadSalesOrderPackingSlipFail implements Action {
  readonly type = SalesOrderActionTypes.DownloadSalesOrderPackingSlipFail;
  constructor(public payload: string) { }
}


// export class EditCurrentMember implements Action {
//   readonly type = SettingActionTypes.EditCurrentMember;
//   constructor(public payload: Member) { }
// }

// export class EditCurrentMemberSuccess implements Action {
//   readonly type = SettingActionTypes.EditCurrentMemberSuccess;
//   constructor(public payload: Member) { }
// }

// export class EditCurrentMemberFail implements Action {
//   readonly type = SettingActionTypes.EditCurrentMemberFail;
//   constructor(public payload: string) { }
// }

// Union the valid types
export type SalesOrderActions = LoadSalesOrders
| LoadSalesOrdersSuccess
| LoadSalesOrdersFail
| SetSalesOrder
| SetSalesOrderID
| SetFulfillment
| LoadSalesOrder
| LoadSalesOrderSuccess
| LoadSalesOrderFail
| LoadSalesOrderLines
| LoadSalesOrderLinesSuccess
| LoadSalesOrderLinesFail
| CancelSalesOrderLines
| CancelSalesOrderLinesSuccess
| CancelSalesOrderLinesFail
| LoadFulfilledBySalesOrderDelivery
| LoadFulfilledBySalesOrderDeliverySuccess
| LoadFulfilledBySalesOrderDeliveryFail
| LoadFulfilledByFulfillments
| LoadFulfilledByFulfillmentsSuccess
| LoadFulfilledByFulfillmentsFail
| LoadFulfilledByFulfillment
| LoadFulfilledByFulfillmentSuccess
| LoadFulfilledByFulfillmentFail
| LoadSalesOrderDelivery
| LoadSalesOrderDeliverySuccess
| LoadSalesOrderDeliveryFail
| DeleteFulfillment
| DeleteFulfillmentSuccess
| DeleteFulfillmentFail
| EditFulfillment
| EditFulfillmentSuccess
| EditFulfillmentFail;