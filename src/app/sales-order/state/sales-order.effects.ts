import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SalesOrderService } from '../sales-order.service';
import * as salesOrderActions from './sales-order.actions';
import { Router } from '@angular/router';
import { Member, MemberVendor } from 'app/shared/class/member';
import { SalesOrder } from 'app/shared/class/sales-order';
import { SalesOrderLine } from 'app/shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from 'app/shared/class/fulfillment';

@Injectable()
export class SalesOrderEffects {
    constructor(
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
                    of(new salesOrderActions.LoadSalesOrdersFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.LoadSalesOrderFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.LoadSalesOrderLinesFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.LoadFulfilledBySalesOrderDeliveryFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.LoadFulfilledByFulfillmentsFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.LoadFulfilledByFulfillmentFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.LoadFulfilmmentSalesOrderLinesFail(err));
                    return EMPTY;
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
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Successfully Canceled' });
                    return (new salesOrderActions.CancelSalesOrderLinesSuccess(salesorderlines));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new salesOrderActions.CancelSalesOrderLinesFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    addFulfillment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.AddFulfillment),
        map((action: salesOrderActions.AddFulfillment) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.addFulfillment(payload).pipe(
                map((fulfillment: Fulfillment) => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Save Completed', content: '' });
                    //this.router.navigate(['/sales-order', 'view', this.fulfilledby,this.orderid,'fulfillment']);
                    //this.router.navigate(['/sales-order', 'view', 'merchant', this.orderid, 'detail']);
                    window.location.reload();

                    return (new salesOrderActions.AddFulfillmentSuccess(fulfillment));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new salesOrderActions.AddFulfillmentFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    editFulfillment$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.EditFulfillment),
        map((action: salesOrderActions.EditFulfillment) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.editFulfillment(payload).pipe(
                map((fulfillment: Fulfillment) => {
                    this.salesOrderService.sendNotification({ type: 'success', title: 'Save Completed', content: '' });
                    window.location.reload();
                    return (new salesOrderActions.EditFulfillmentSuccess(fulfillment));
                }),
                catchError(err => {
                    this.salesOrderService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new salesOrderActions.EditFulfillmentFail(err));
                    return EMPTY;
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
                    of(new salesOrderActions.DeleteFulfillmentFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    downloadSalesOrderPackingSlip$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.DownloadSalesOrderPackingSlip),
        map((action: salesOrderActions.DownloadSalesOrderPackingSlip) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.downloadSalesOrderPackingSlip(payload.OrderID).pipe(
                map((data: any) => {
                    console.log('huh', payload);
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = payload.IncrementID;
                        window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                    } else {
                        // const iframe = document.createElement('iframe');
                        // iframe.style.display = 'none';
                        // iframe.src = blobUrl;
                        // document.body.appendChild(iframe);

                        // iframe.onload = (function() {
                        //     iframe.contentWindow.focus();
                        //     iframe.contentWindow.print();
                        // });
                        const fileURL = window.URL.createObjectURL(blob);
                        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                        a.href = fileURL;
                        a.download = String(payload.IncrementID);
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new salesOrderActions.DownloadSalesOrderPackingSlipSuccess(data));
                }),
                catchError(err => {
                    of(new salesOrderActions.LoadSalesOrdersFail(err));
                    return EMPTY;
                })
            )
        )
    );


    // @Effect()
    // editCurrentMember$: Observable<Action> = this.actions$.pipe(
    //     ofType(settingActions.SettingActionTypes.EditCurrentMember),
    //     map((action: settingActions.EditCurrentMember) => action.payload),
    //     mergeMap((payload: Member) =>
    //         this.settingService.editCurrentMember(payload).pipe(
    //             map((member: Member) => {
    //                 this.settingService.sendNotification({ type: 'success', title: 'Successfully Updated', content: '' });
    //                 window.location.reload();
    //                 return (new settingActions.EditCurrentMemberSuccess(member));
    //             }),
    //             catchError(err => {
    //                 this.settingService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 this.router.navigate(['/setting']);
    //                 return of(new settingActions.EditCurrentMemberFail(err));
    //             })
    //         )
    //     )
    // );
}
