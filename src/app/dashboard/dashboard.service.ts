import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Dashboard, ItemSalesTotal, InboundShipmentStatusCount, SalesStatusTotal, SalesOrderSummary, CurrentSalesOrderSummary, DashboardVendorNotification, DashboardSalesOrderSummary } from '../shared/class/dashboard';

import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { NotificationComponent } from '../shared/tool/notification/notification.component';
@Injectable()
export class DashboardService {
    private apiURL = environment.webapiURL;
    private itemSalesTotals: ItemSalesTotal[];
    private inboundShipmentStatusCounts: InboundShipmentStatusCount[];
    private salesStatusTotals: SalesStatusTotal[];
    private currentSalesOrderSummary: CurrentSalesOrderSummary[];
    private salesOrderSummary: SalesOrderSummary[];
    private dashboard: Dashboard;
    private dashboarVendorNotification: DashboardVendorNotification;

    public subject = new Subject<string>();

    constructor(private http: HttpClient,
                private oauthService: OAuthService,
                private notificationComponent: NotificationComponent) { }

    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
        //this.subject.next(notification);
    }

    reset() {
        this.itemSalesTotals = null;
        this.inboundShipmentStatusCounts = null;
        this.salesStatusTotals = null;
        this.dashboard = null;
        this.dashboarVendorNotification = null;
        this.currentSalesOrderSummary = null;
        this.salesOrderSummary = null;
    }

    getDashboard(): Observable<Dashboard> {
        if (this.dashboard) {
            return of(this.dashboard);
        }
        return this.http.get<Dashboard>(this.apiURL + '/dashboard/dashboard')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.dashboard = data),
                            catchError(this.handleError)
                        );
    }

    getDashboarVendorNotification(): Observable<DashboardVendorNotification> {
        return this.http.get<DashboardVendorNotification>(this.apiURL + '/dashboard/dashboardvendornotification')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.dashboard = data),
                            catchError(this.handleError)
                        );
    }

    getItemSalesTotals(): Observable<ItemSalesTotal[]> {
        if (this.itemSalesTotals) {
            return of(this.itemSalesTotals);
        }
        return this.http.get<ItemSalesTotal[]>(this.apiURL + '/dashboard/itemsalestotal')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.itemSalesTotals = data),
                            catchError(this.handleError)
                        );
    }

    getInboundShipmentStatusCounts(): Observable<InboundShipmentStatusCount[]> {
        if (this.inboundShipmentStatusCounts) {
            return of(this.inboundShipmentStatusCounts);
        }
        return this.http.get<InboundShipmentStatusCount[]>(this.apiURL + '/dashboard/inboundshipmentstatuscount')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.inboundShipmentStatusCounts = data),
                            catchError(this.handleError)
                        );
    }

    getSalesStatusTotals(): Observable<SalesStatusTotal[]> {
        if (this.salesStatusTotals) {
            return of(this.salesStatusTotals);
        }
        return this.http.get<SalesStatusTotal[]>(this.apiURL + '/dashboard/salesstatustotal')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesStatusTotals = data),
                            catchError(this.handleError)
                        );
    }

    getSalesOrderSummary(): Observable<SalesOrderSummary[]> {
        if (this.salesOrderSummary) {
            return of(this.salesOrderSummary);
        }
        return this.http.get<SalesOrderSummary[]>(this.apiURL + '/dashboard/salesordersummary')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.salesOrderSummary = data),
                            catchError(this.handleError)
                        );
    }

    getCurrentSalesOrderSummary(): Observable<CurrentSalesOrderSummary[]> {
        if (this.currentSalesOrderSummary) {
            return of(this.currentSalesOrderSummary);
        }
        return this.http.get<CurrentSalesOrderSummary[]>(this.apiURL + '/dashboard/currentsalesordersummary')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.currentSalesOrderSummary = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrderSummary(fulfilledby: string): Observable<DashboardSalesOrderSummary[]> {

        return this.http.get<DashboardSalesOrderSummary[]>(this.apiURL + '/dashboard/dashboardsalesordersummary/' + fulfilledby)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            //tap(data => this.currentSalesOrderSummary = data),
                            catchError(this.handleError)
                        );
    }
    

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // errorMessage = `An error occurred: ${err.error.message}`;
            errorMessage = `Network error: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // errorMessage = `Backend returned code ${err.status}, body was: ${err.error.Message}`;
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }
}
