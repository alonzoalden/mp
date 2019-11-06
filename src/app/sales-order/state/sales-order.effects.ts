import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SalesOrderService } from '../sales-order.service';
import * as salesOrderActions from './sales-order.actions';
import { Router } from '@angular/router';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from 'app/shared/class/fulfillment';
import { Store } from '@ngrx/store';
import * as fromSalesOrder from './index';
import { BOLRequest } from 'app/shared/class/bol-request';


@Injectable()
export class SalesOrderEffects {
    constructor(
        private store: Store<fromSalesOrder.State>,
        private router: Router,
        private salesOrderService: SalesOrderService,
        private actions$: Actions) { }

    @Effect()
    loadSalesOrders$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadSalesOrders),
        map((action: salesOrderActions.LoadSalesOrders) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.getSalesOrderByVendor(payload.fulfilledby, payload.status).pipe(
                map((members: SalesOrder[]) => (new salesOrderActions.LoadSalesOrdersSuccess(members))),
                catchError(err => {
                    return of(new salesOrderActions.LoadSalesOrdersFail(err));
                })
            )
        )
    );
    @Effect()
    loadSalesOrder$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadSalesOrder),
        map((action: salesOrderActions.LoadSalesOrder) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.getFulfilledBySalesOrder(payload.orderid, payload.fulfilledby).pipe(
                map((salesorder: SalesOrder) => (new salesOrderActions.LoadSalesOrderSuccess(salesorder))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/sales-order', payload.fulfilledby, 'status', 'unshipped']);
                    return of(new salesOrderActions.LoadSalesOrderFail(err));
                })
            )
        )
    );
    @Effect()
    loadSalesOrderLines$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadSalesOrderLines),
        map((action: salesOrderActions.LoadSalesOrderLines) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.getSalesOrderLineByVendor(payload.orderid, payload.fulfilledby).pipe(
                map((salesorderlines: SalesOrderLine[]) => (new salesOrderActions.LoadSalesOrderLinesSuccess(salesorderlines))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/sales-order', payload.fulfilledby, 'status', 'unshipped']);
                    return of(new salesOrderActions.LoadSalesOrderLinesFail(err));
                })
            )
        )
    );
    @Effect()
    loadFulfilledBySalesOrderDelivery$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadFulfilledBySalesOrderDelivery),
        map((action: salesOrderActions.LoadFulfilledBySalesOrderDelivery) => action.payload),
        mergeMap((payload) => {
            return this.salesOrderService.getFulfilledBySalesOrderDelivery(payload.orderid, payload.fulfilledby).pipe(
                map((deliverydetail: string) => (new salesOrderActions.LoadFulfilledBySalesOrderDeliverySuccess(deliverydetail))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.LoadFulfilledBySalesOrderDeliveryFail(err));
                })
            );
        }
        )
    );

    @Effect()
    getFulfilledByFulfillments$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadFulfilledByFulfillments),
        map((action: salesOrderActions.LoadFulfilledByFulfillments) => action.payload),
        mergeMap((payload) => {
            return this.salesOrderService.getFulfilledByFulfillments(payload.orderid, payload.fulfilledby).pipe(
                map((fullfillment: Fulfillment[]) => (new salesOrderActions.LoadFulfilledByFulfillmentsSuccess(fullfillment))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.LoadFulfilledByFulfillmentsFail(err));
                })
            );
        }
        )
    );
    @Effect()
    getFulfilledByFulfillment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadFulfilledByFulfillment),
        map((action: salesOrderActions.LoadFulfilledByFulfillment) => action.payload),
        mergeMap((payload) => {
            return this.salesOrderService.getFulfilledByFulfillment(payload.fulfillmentid, payload.fulfilledby).pipe(
                map((fullfillment: Fulfillment) => (new salesOrderActions.LoadFulfilledByFulfillmentSuccess(fullfillment))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.LoadFulfilledByFulfillmentFail(err));
                })
            );
        }
        )
    );
    @Effect()
    getFulfilmmentSalesOrderLines$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadFulfilmmentSalesOrderLines),
        map((action: salesOrderActions.LoadFulfilmmentSalesOrderLines) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.getFulfilmmentSalesOrderLines(payload).pipe(
                map((fullfillments: FulfillmentSalesOrderLine[]) => (new salesOrderActions.LoadFulfilmmentSalesOrderLinesSuccess(fullfillments))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.LoadFulfilmmentSalesOrderLinesFail(err));
                })
            )

        )
    );

    @Effect()
    cancelSalesOrderLines$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.CancelSalesOrderLines),
        map((action: salesOrderActions.CancelSalesOrderLines) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.cancelSalesOrderLines(payload).pipe(
                map((salesorderlines: SalesOrderLine[]) => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Successfully Canceled', content: '' });
                    return (new salesOrderActions.CancelSalesOrderLinesSuccess(salesorderlines));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.CancelSalesOrderLinesFail(err));
                })
            )
        )
    );
    @Effect()
    loadBOLRequest$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadBOLRequest),
        map((action: salesOrderActions.LoadBOLRequest) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.getBOLRequest(payload).pipe(
                map((bolrequest: BOLRequest) => (new salesOrderActions.LoadBOLRequestSuccess(bolrequest))),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.LoadBOLRequestFail(err));
                })
            )

        )
    );
    @Effect()
    uploadBOLAttachment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.UploadBOLAttachment),
        map((action: salesOrderActions.UploadBOLAttachment) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.uploadBOLAttachment(payload.id, payload.form).pipe(
                map((bolrequest: BOLRequest) => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Upload Successful', content: `BOL Request Attachment saved` });
                    payload.dialogRef.close();
                    return (new salesOrderActions.UploadBOLAttachmentSuccess(bolrequest));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.UploadBOLAttachmentFail(err));
                })
            )
        )
    );
    @Effect()
    notifyBOLRequest$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadBOLRequestNotification),
        map((action: salesOrderActions.LoadBOLRequestNotification) => action.payload),
        mergeMap((payload: number) =>
            this.salesOrderService.notifyBOLRequest(payload).pipe(
                map(() => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Notification Successful', content: `Notification sent for Order ${payload}.` });
                    return (new salesOrderActions.LoadBOLRequestNotificationSuccess());
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.LoadBOLRequestNotificationFail(err));
                })
            )
        )
    );
    @Effect()
    addBOLRequest$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.AddBOLRequest),
        map((action: salesOrderActions.AddBOLRequest) => action.payload),
        mergeMap((payload: BOLRequest) =>
            this.salesOrderService.addBOLRequest(payload).pipe(
                map((bolrequest: BOLRequest) => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'BOL Request Sent', content: `` });
                    return (new salesOrderActions.AddBOLRequestSuccess(bolrequest));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    window.location.reload();
                    return of(new salesOrderActions.AddBOLRequestFail(err));
                })
            )
        )
    );
    @Effect()
    addFulfillment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.AddFulfillment),
        map((action: salesOrderActions.AddFulfillment) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.addFulfillment(payload.fulfillment).pipe(
                map((fulfillment: Fulfillment) => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Save Completed', content: '' });
                    this.router.navigate(['/sales-order', 'view', payload.fulfilledby, payload.orderid, 'fulfillment']);
                    this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
                    //this.router.navigate(['/sales-order', 'view', 'merchant', this.orderid, 'detail']);
                    return (new salesOrderActions.AddFulfillmentSuccess(fulfillment));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.AddFulfillmentFail(err));
                })
            )
        )
    );
    @Effect()
    editFulfillment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.EditFulfillment),
        map((action: salesOrderActions.EditFulfillment) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.editFulfillment(payload.fulfillment).pipe(
                map((fulfillment: Fulfillment) => {
                    this.router.navigate(['/sales-order', 'view', payload.fulfilledby, payload.orderid, 'fulfillment']);
                    this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Save Completed', content: `Shipment ID: ${fulfillment.FulfillmentID} has been updated` });
                    return (new salesOrderActions.EditFulfillmentSuccess(fulfillment));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.EditFulfillmentFail(err));
                })
            )
        )
    );
    @Effect()
    deleteFulfillment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.DeleteFulfillment),
        map((action: salesOrderActions.DeleteFulfillment) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.deleteFulfillment(payload).pipe(
                map(() => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Successfully Deleted' });
                    return (new salesOrderActions.DeleteFulfillmentSuccess(payload));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new salesOrderActions.DeleteFulfillmentFail(err));
                })
            )
        )
    );
    @Effect()
    downloadSalesOrderPackingSlip$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.DownloadSalesOrderPackingSlip),
        map((action: salesOrderActions.DownloadSalesOrderPackingSlip) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.downloadSalesOrderPackingSlip(payload.orderid).pipe(
                map((data: any) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = payload.salesorder.IncrementID;
                        window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                    } else {
                        const fileURL = window.URL.createObjectURL(blob);
                        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                        a.href = fileURL;
                        a.download = String(payload.salesorder.IncrementID);
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new salesOrderActions.DownloadSalesOrderPackingSlipSuccess(data));
                }),
                catchError(err => {
                    return of(new salesOrderActions.LoadSalesOrdersFail(err));
                })
            )
        )
    );
}
