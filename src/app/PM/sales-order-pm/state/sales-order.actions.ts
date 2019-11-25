import { Action } from '@ngrx/store';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from 'app/shared/class/fulfillment';
import { BOLRequest } from 'app/shared/class/bol-request';
import { MatDialogRef } from '@angular/material';

export enum SalesOrderActionTypes {
    LoadSalesOrders = '[Sales Order] Load Sales Orders',
    LoadVendorsSalesOrders = '[Sales Order] Load Vendors Sales Orders',
    LoadSalesOrdersSuccess = '[Sales Order] Load Sales Orders Success',
    LoadSalesOrdersFail = '[Sales Order] Load Sales Orders Fail',
    LoadMyVendorsSalesOrders = '[Sales Order] Load My Vendors Sales Orders',
    LoadMySalesOrdersSuccess = '[Sales Order] Load My Sales Orders Success',
    LoadMySalesOrdersFail = '[Sales Order] Load My Sales Orders Fail',
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
    LoadFulfilmmentSalesOrderLines = '[Sales Order] Load Fulfilmment Sales Order Lines',
    LoadFulfilmmentSalesOrderLinesSuccess = '[Sales Order] Load Fulfilmment Sales Order Lines Success',
    LoadFulfilmmentSalesOrderLinesFail = '[Sales Order] Load Fulfilmment Sales Order Lines Fail',
    LoadSalesOrderDelivery = '[Sales Order] Load Sales Order Delivery',
    LoadSalesOrderDeliverySuccess = '[Sales Order] Load Sales Order Delivery Success',
    LoadSalesOrderDeliveryFail = '[Sales Order] Load Sales Order Delivery Fail',
    AddFulfillment = '[Sales Order] Add Fulfillment',
    AddFulfillmentSuccess = '[Sales Order] Add Fulfillment Success',
    AddFulfillmentFail = '[Sales Order] Add Fulfillment Fail',
    DeleteFulfillment = '[Sales Order] Delete Fulfillment',
    DeleteFulfillmentSuccess = '[Sales Order] Delete Fulfillment Success',
    DeleteFulfillmentFail = '[Sales Order] Delete Fulfillment Fail',
    EditFulfillment = '[Sales Order] Edit Fulfillment',
    EditFulfillmentSuccess = '[Sales Order] Edit Fulfillment Success',
    EditFulfillmentFail = '[Sales Order] Edit Fulfillment Fail',
    AddBOLRequest = '[Sales Order] Add BOL Request',
    AddBOLRequestSuccess = '[Sales Order] Add BOL Request Success',
    AddBOLRequestFail = '[Sales Order] Add BOL Request Fail',
    LoadBOLRequest = '[Sales Order] Load BOL Request',
    LoadBOLRequestSuccess = '[Sales Order] Load BOL Request Success',
    LoadBOLRequestFail = '[Sales Order] Load BOL Request Fail',
    UploadBOLAttachment = '[Sales Order] Upload BOL Attachment',
    UploadBOLAttachmentSuccess = '[Sales Order] Upload BOL Attachment Success',
    UploadBOLAttachmentFail = '[Sales Order] Upload BOL Attachment Fail',

}

// Action Creators
export class LoadSalesOrders implements Action {
    readonly type = SalesOrderActionTypes.LoadSalesOrders;
    constructor(public payload: { fulfilledby: string, status: string }) { }
}
export class LoadVendorsSalesOrders implements Action {
    readonly type = SalesOrderActionTypes.LoadVendorsSalesOrders;
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
export class LoadMyVendorsSalesOrders implements Action {
    readonly type = SalesOrderActionTypes.LoadMyVendorsSalesOrders;
    constructor(public payload: { fulfilledby: string, status: string }) { }
}
export class LoadMySalesOrdersSuccess implements Action {
    readonly type = SalesOrderActionTypes.LoadMySalesOrdersSuccess;
    constructor(public payload: SalesOrder[]) { }
}
export class LoadMySalesOrdersFail implements Action {
    readonly type = SalesOrderActionTypes.LoadMySalesOrdersFail;
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

export class LoadFulfilmmentSalesOrderLines implements Action {
    readonly type = SalesOrderActionTypes.LoadFulfilmmentSalesOrderLines;
    constructor(public payload: number) { }
}
export class LoadFulfilmmentSalesOrderLinesSuccess implements Action {
    readonly type = SalesOrderActionTypes.LoadFulfilmmentSalesOrderLinesSuccess;
    constructor(public payload: FulfillmentSalesOrderLine[]) { }
}
export class LoadFulfilmmentSalesOrderLinesFail implements Action {
    readonly type = SalesOrderActionTypes.LoadFulfilmmentSalesOrderLinesFail;
    constructor(public payload: string) { }
}
export class AddFulfillment implements Action {
    readonly type = SalesOrderActionTypes.AddFulfillment;
    constructor(public payload: { fulfillment: Fulfillment, orderid: number; fulfilledby: string }) { }
}
export class AddFulfillmentSuccess implements Action {
    readonly type = SalesOrderActionTypes.AddFulfillmentSuccess;
    constructor(public payload: Fulfillment) { }
}
export class AddFulfillmentFail implements Action {
    readonly type = SalesOrderActionTypes.AddFulfillmentFail;
    constructor(public payload: string) { }
}
export class AddBOLRequest implements Action {
    readonly type = SalesOrderActionTypes.AddBOLRequest;
    constructor(public payload: BOLRequest) { }
}
export class AddBOLRequestSuccess implements Action {
    readonly type = SalesOrderActionTypes.AddBOLRequestSuccess;
    constructor(public payload: BOLRequest) { }
}
export class AddBOLRequestFail implements Action {
    readonly type = SalesOrderActionTypes.AddBOLRequestFail;
    constructor(public payload: string) { }
}
export class LoadBOLRequest implements Action {
    readonly type = SalesOrderActionTypes.LoadBOLRequest;
    constructor(public payload: number) { }
}
export class LoadBOLRequestSuccess implements Action {
    readonly type = SalesOrderActionTypes.LoadBOLRequestSuccess;
    constructor(public payload: BOLRequest) { }
}
export class LoadBOLRequestFail implements Action {
    readonly type = SalesOrderActionTypes.LoadBOLRequestFail;
    constructor(public payload: string) { }
}
export class UploadBOLAttachment implements Action {
    readonly type = SalesOrderActionTypes.UploadBOLAttachment;
    constructor(public payload: {id: number, form: FormData, dialogRef: MatDialogRef<any>}) { }
}
export class UploadBOLAttachmentSuccess implements Action {
    readonly type = SalesOrderActionTypes.UploadBOLAttachmentSuccess;
    constructor(public payload: BOLRequest) { }
}
export class UploadBOLAttachmentFail implements Action {
    readonly type = SalesOrderActionTypes.UploadBOLAttachmentFail;
    constructor(public payload: string) { }
}
export class EditFulfillment implements Action {
    readonly type = SalesOrderActionTypes.EditFulfillment;
    constructor(public payload: { fulfillment: Fulfillment, orderid: number; fulfilledby: string }) { }
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
    constructor(public payload: number) { }
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
    constructor(public payload: { salesorder: SalesOrder, orderid: number }) { }
}
export class DownloadSalesOrderPackingSlipSuccess implements Action {
    readonly type = SalesOrderActionTypes.DownloadSalesOrderPackingSlipSuccess;
    constructor(public payload: any) { }
}
export class DownloadSalesOrderPackingSlipFail implements Action {
    readonly type = SalesOrderActionTypes.DownloadSalesOrderPackingSlipFail;
    constructor(public payload: string) { }
}

// Union the valid types
export type SalesOrderActions = LoadSalesOrders
    | LoadVendorsSalesOrders
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
    | LoadFulfilmmentSalesOrderLines
    | LoadFulfilmmentSalesOrderLinesSuccess
    | LoadFulfilmmentSalesOrderLinesFail
    | AddFulfillment
    | AddFulfillmentSuccess
    | AddFulfillmentFail
    | DeleteFulfillment
    | DeleteFulfillmentSuccess
    | DeleteFulfillmentFail
    | EditFulfillment
    | EditFulfillmentSuccess
    | EditFulfillmentFail
    | AddBOLRequest
    | AddBOLRequestSuccess
    | AddBOLRequestFail
    | LoadBOLRequest
    | LoadBOLRequestSuccess
    | LoadBOLRequestFail
    | UploadBOLAttachment
    | UploadBOLAttachmentSuccess
    | UploadBOLAttachmentFail
    | LoadMyVendorsSalesOrders
    | LoadMySalesOrdersSuccess
    | LoadMySalesOrdersFail;

