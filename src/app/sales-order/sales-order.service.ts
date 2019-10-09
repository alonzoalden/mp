import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SalesOrder } from '../shared/class/sales-order';
import { SalesOrderLine } from '../shared/class/sales-order-line';
import { Fulfillment, FulfillmentSalesOrderLine } from '../shared/class/fulfillment';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { BOLRequest } from 'app/shared/class/bol-request';

@Injectable()
export class SalesOrderService {
    private apiURL = environment.webapiURL;

    private salesorders: SalesOrder[];
    private salesorderlines: SalesOrderLine[];
    currentSalesOrderLine: SalesOrderLine;
    currentSalesOrder: SalesOrder;
    private deliveryaddress: string;

    public subject = new Subject<string>();

    constructor(
        private http: HttpClient,
        private oauthService: OAuthService ) { }

    sendNotification(notification: any) {
        this.subject.next(notification);
    }

    resetSalesOrders() {
        this.salesorders = null;
    }

    getSalesOrders(): Observable<SalesOrder[]> {
        if (this.salesorders) {
            return of(this.salesorders);
        }
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrder(salesorderid: number): Observable<SalesOrder> {
        return this.http.get<SalesOrder>(this.apiURL + '/salesorder/' + salesorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorder = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrderByVendor(fulfilledby: string, status: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/fulfilledby/' + fulfilledby + '/status/' + status)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getStatusSalesOrders(status: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/status/' + status)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrders(fulfilledby: string): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder/fulfilledby/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesorders = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrder(salesorderid: number, fulfilledby: string): Observable<SalesOrder> {
        return this.http.get<SalesOrder>(this.apiURL + '/salesorder/' + salesorderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.currentSalesOrder = data),
                            catchError(this.handleError)
                        );
    }

    refreshSalesOrders(): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.apiURL + '/salesorder')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
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
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrderLineByVendor(salesorderid: number, fulfilledby: string): Observable<SalesOrderLine[]> {
        return this.http.get<SalesOrderLine[]>(this.apiURL + '/salesorderline/salesorder/' + salesorderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
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
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledByFulfillments(orderid: number, fulfilledby: string): Observable<Fulfillment[]> {
        return this.http.get<Fulfillment[]>(this.apiURL + '/fulfillment/order/' + orderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getFulfillment(fulfillmentid: number): Observable<Fulfillment> {
        // if (this.salesorderlines) {
        //     return of(this.salesorderlines);
        // }
        return this.http.get<Fulfillment>(this.apiURL + '/fulfillment/' + fulfillmentid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledByFulfillment(fulfillmentid: number, fulfilledby: string): Observable<Fulfillment> {
        return this.http.get<Fulfillment>(this.apiURL + '/fulfillment/' + fulfillmentid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilmmentSalesOrderLines(orderid: number): Observable<FulfillmentSalesOrderLine[]> {
        return this.http.get<FulfillmentSalesOrderLine[]>(this.apiURL + '/fulfillment/salesorderline/order/' + orderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledByFulfilmmentSalesOrderLines(orderid: number, fulfilledby: string): Observable<FulfillmentSalesOrderLine[]> {
        return this.http.get<FulfillmentSalesOrderLine[]>(this.apiURL + '/fulfillment/salesorderline/order/' + orderid + '/fulfilledby/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.salesorderlines = data),
                            catchError(this.handleError)
                        );
    }

    addFulfillment(fulfillment: Fulfillment): Observable<Fulfillment> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Fulfillment>(this.apiURL + '/fulfillment', fulfillment, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Fulfillment: ' + JSON.stringify(data))),
                                catchError(this.handleError)
                            );
    }

    editFulfillment(fulfillment: Fulfillment): Observable<Fulfillment>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Fulfillment>(this.apiURL + '/fulfillment/' + fulfillment.FulfillmentID, fulfillment, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Item: ' + item.ItemID)),
                                catchError(this.handleError)
                            );
    }

    deleteFulfillment(id: number): Observable<Fulfillment>  {
        return this.http.delete<Fulfillment>(this.apiURL + '/fulfillment/' + id )
                            .pipe(
                                //tap(data => console.log('Delete Item: ' + id)),
                                catchError(this.handleError)
                            );
    }

    getSalesOrderDelivery(salesorderid: number): Observable<string> {
        return this.http.get<string>(this.apiURL + '/salesorder/' + salesorderid + '/deliveryaddress')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.deliveryaddress = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrderDelivery(salesorderid: number, fulfilledby: string): Observable<string> {
        return this.http.get<string>(this.apiURL + '/salesorder/' + salesorderid + '/fulfilledby/' + fulfilledby + '/deliveryaddress')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
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
                                //tap(data => console.log('Update Item: ' + item.ItemID)),
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
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    addBOLRequest(bolrequest: BOLRequest): Observable<BOLRequest> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<BOLRequest>(this.apiURL + '/bolrequest', bolrequest, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Fulfillment: ' + JSON.stringify(data))),
                                catchError(this.handleError)
                            );
    }

    uploadBOLRequest(salesorderid: number, formdata: FormData): Observable<BOLRequest> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<BOLRequest>(this.apiURL + '/bolrequest/purchaseorder' + salesorderid + '/upload/', formdata, { headers: headers } )
                        .pipe(
                            //tap(data => console.log('Add Fulfillment: ' + JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }
    

    rowColorConditions(i: number, collection: Array<any>, currentIndex: number, formDirty: boolean): string {
        const inputRow = i === collection.length - 1 && currentIndex === i;
        const selectedInputRow = inputRow && formDirty;
        if (selectedInputRow) { return '#F5F5F5'; }
        else if (inputRow) { return '#E8E8E8'; }
        else if (currentIndex === i) { return '#F5F5F5'; }
        else { return '#FFFFFF'; }
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error.Message}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
