import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SalesOrder } from '../../shared/class/sales-order';
import { SalesOrderLine } from '../../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../shared/class/fulfillment';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';
import { BOLRequest } from 'app/shared/class/bol-request';
import { NotificationComponent } from '../../shared/tool/notification/notification.component';
import { PurchaseOrderMerchantInvoice } from 'app/shared/class/purchase-order';

@Injectable()
export class SalesOrderService {
    private apiURL = environment.webapiURL;
    private salesorders: SalesOrder[];
    private salesorderlines: SalesOrderLine[];
    currentSalesOrderLine: SalesOrderLine;
    currentSalesOrder: SalesOrder;
    public currentNotificationID: string;
    private deliveryaddress: string;

    public subject = new Subject<string>();

    constructor(
        private notificationComponent: NotificationComponent,
        private http: HttpClient,
        private oauthService: OAuthService ) { }

    sendNotification(notification: any, options: any = {}) {
        this.notificationComponent.notify(notification, options);
    }

    resetSalesOrders() {
        this.salesorders = null;
    }
    getMerchantInvoices(salesorderid: number): Observable<PurchaseOrderMerchantInvoice> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<PurchaseOrderMerchantInvoice>(this.apiURL + '/merchantinvoice/purchaseorder/' + salesorderid, { headers: headers } )
                            .pipe(
                                catchError(this.handleError)
                            );
    }
    addMerchantInvoices(salesorderid: number, invoices: PurchaseOrderMerchantInvoice[]): Observable<PurchaseOrderMerchantInvoice> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<PurchaseOrderMerchantInvoice>(this.apiURL + '/merchantinvoice/' + salesorderid, invoices, { headers: headers } )
                            .pipe(
                                catchError(this.handleError)
                            );
    }
    uploadMerchantInvoiceAttachment(salesorderid: number, formdata: FormData): Observable<string> {
        return this.http.post<string>(this.apiURL + '/merchantinvoice/purchaseorder/' + salesorderid + '/upload', formdata )
                        .pipe(
                            catchError(this.handleError)
                        );
    }
    getSalesOrders(): Observable<SalesOrder[]> {
        if (this.salesorders) {
            return of(this.salesorders);
        }
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder')
                        .pipe(
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrder(salesorderid: number): Observable<SalesOrder> {
        return this.http.get<SalesOrder>(this.apiURL + '/salesorder/' + salesorderid)
                        .pipe(
                            catchError(this.handleError)
                        );
    }
    getSalesOrderByVendors(fulfilledby: string, status: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/PMfulfilledby/' + fulfilledby + '/status/' + status)
            .pipe(
                tap(data => this.salesorders = data),
                catchError(this.handleError)
            );
    }
    getMySalesOrderByVendors(fulfilledby: string, status: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/PMMyfulfilledby/' + fulfilledby + '/status/' + status)
            .pipe(
                tap(data => this.salesorders = data),
                catchError(this.handleError)
            );
    }
    getSalesOrderByVendor(fulfilledby: string, status: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/fulfilledby/' + fulfilledby + '/status/' + status)
                        .pipe(
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getStatusSalesOrders(status: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/status/' + status)
                        .pipe(
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrders(fulfilledby: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/fulfilledby/' + fulfilledby)
                        .pipe(
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrder(salesorderid: number, fulfilledby: string): Observable<SalesOrder> {
        return this.http.get<SalesOrder>(this.apiURL + '/salesorder/' + salesorderid + '/fulfilledby/' + fulfilledby + '/PM')
                        .pipe(
                            tap(data => this.currentSalesOrder = data),
                            catchError(this.handleError)
                        );
    }
    getFulfilledBySalesOrderPM(salesorderid: number, fulfilledby: string): Observable<SalesOrder> {
        return this.http.get<SalesOrder>(this.apiURL + '/salesorder/' + salesorderid + '/fulfilledby/' + fulfilledby + '/PM')
                        .pipe(
                            tap(data => this.currentSalesOrder = data),
                            catchError(this.handleError)
                        );
    }

    refreshSalesOrders(): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder')
                        .pipe(
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrderLines(salesorderid: number): Observable<SalesOrderLine[]> {
        // if (this.salesorderlines) {
        //     return of(this.salesorderlines);
        // }
        return this.http.get<SalesOrderLine[]>(this.apiURL + '/salesorderline/salesorder/' + salesorderid)
                        .pipe(
                            tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrderLineByVendor(salesorderid: number, fulfilledby: string): Observable<SalesOrderLine[]> {
        return this.http.get<SalesOrderLine[]>(this.apiURL + '/salesorderline/PMsalesorder/' + salesorderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrderLine(id: number): Observable<SalesOrderLine> {
        const foundSalesOrderLine = this.salesorderlines.find(salesorderline => salesorderline.SalesOrderLineID === id);
        return of(foundSalesOrderLine);
    }

    getFulfillments(orderid: number): Observable<Fulfillment[]> {
        return this.http.get<Fulfillment[]>(this.apiURL + '/fulfillment/order/' + orderid)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getFulfilledByFulfillments(orderid: number, fulfilledby: string): Observable<Fulfillment[]> {
        return this.http.get<Fulfillment[]>(this.apiURL + '/fulfillment/order/' + orderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getFulfillment(fulfillmentid: number): Observable<Fulfillment> {
        // if (this.salesorderlines) {
        //     return of(this.salesorderlines);
        // }
        return this.http.get<Fulfillment>(this.apiURL + '/fulfillment/' + fulfillmentid)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getFulfilledByFulfillment(fulfillmentid: number, fulfilledby: string): Observable<Fulfillment> {
        return this.http.get<Fulfillment>(this.apiURL + '/fulfillment/' + fulfillmentid + '/fulfilledby/' + fulfilledby + '/PM')
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getFulfilmmentSalesOrderLines(orderid: number): Observable<FulfillmentSalesOrderLine[]> {
        return this.http.get<FulfillmentSalesOrderLine[]>(this.apiURL + '/fulfillment/salesorderline/order/' + orderid)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getFulfilledByFulfilmmentSalesOrderLines(orderid: number, fulfilledby: string): Observable<FulfillmentSalesOrderLine[]> {
        return this.http.get<FulfillmentSalesOrderLine[]>(this.apiURL + '/fulfillment/salesorderline/order/' + orderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    addFulfillment(fulfillment: Fulfillment): Observable<Fulfillment> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Fulfillment>(this.apiURL + '/fulfillment', fulfillment, { headers: headers } )
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    editFulfillment(fulfillment: Fulfillment): Observable<Fulfillment>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Fulfillment>(this.apiURL + '/fulfillment/' + fulfillment.FulfillmentID, fulfillment, { headers: headers} )
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    deleteFulfillment(id: number): Observable<Fulfillment>  {
        return this.http.delete<Fulfillment>(this.apiURL + '/fulfillment/' + id )
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    getSalesOrderDelivery(salesorderid: number): Observable<string> {
        return this.http.get<string>(this.apiURL + '/salesorder/' + salesorderid + '/deliveryaddress')
                        .pipe(
                            tap(data => this.deliveryaddress = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrderDelivery(salesorderid: number, fulfilledby: string): Observable<string> {
        return this.http.get<string>(this.apiURL + '/salesorder/' + salesorderid + '/fulfilledby/' + fulfilledby + '/deliveryaddress')
                        .pipe(
                            tap(data => this.deliveryaddress = data),
                            catchError(this.handleError)
                        );
    }

    cancelSalesOrder(orderid: number): Observable<SalesOrder>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<SalesOrder>(this.apiURL + '/salesorderline/' + orderid + '/cancel', { headers: headers } )
                            .pipe(
                                catchError(this.handleError)
                            );
    }


    cancelSalesOrderLines(salesorderlines: SalesOrderLine[]): Observable<SalesOrderLine[]>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<SalesOrderLine[]>(this.apiURL + '/salesorderline/cancel', salesorderlines, { headers: headers } )
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    downloadSalesOrderPackingSlip(id: number) {
        return this.http.get(this.apiURL + '/salesorder/' + id + '/packingslip', { responseType: 'blob' });
    }

    getBOLRequest(salesorderid: number): Observable<BOLRequest> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<BOLRequest>(this.apiURL + '/bolrequest/purchaseorder/' + salesorderid, { headers: headers })
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    addBOLRequest(bolrequest: BOLRequest): Observable<BOLRequest> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<BOLRequest>(this.apiURL + '/bolrequest', bolrequest, { headers: headers } )
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    uploadBOLAttachment(salesorderid: number, formdata: FormData): Observable<BOLRequest> {
        return this.http.post<BOLRequest>(this.apiURL + '/bolrequest/purchaseorder/' + salesorderid + '/upload', formdata )
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    rowColorConditions(i: number, collection: Array<any>, currentIndex: number, formDirty: boolean): string {
        const inputRow = i === collection.length - 1 && currentIndex === i;
        const selectedInputRow = inputRow && formDirty;
        if (selectedInputRow) {
            return '#F5F5F5';
        } else if (inputRow) {
            return '#E8E8E8';
        } else if (currentIndex === i) {
            return '#F5F5F5';
        } else {
            return '#FFFFFF';
        }
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage: string;
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error.Message}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
