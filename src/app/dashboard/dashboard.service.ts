import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Dashboard, ItemSalesTotal, InboundShipmentStatusCount, SalesStatusTotal, SalesOrderSummary, CurrentSalesOrderSummary, DashboardVendorNotification, DashboardSalesOrderSummary } from '../shared/class/dashboard';
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

    public subject = new Subject<string>();

    constructor(private http: HttpClient,
                private notificationComponent: NotificationComponent) { }

    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    reset() {
        this.itemSalesTotals = null;
        this.inboundShipmentStatusCounts = null;
        this.salesStatusTotals = null;
        this.dashboard = null;
        this.currentSalesOrderSummary = null;
        this.salesOrderSummary = null;
    }

    getDashboard(): Observable<Dashboard> {
        if (this.dashboard) {
            return of(this.dashboard);
        }
        return this.http.get<Dashboard>(this.apiURL + '/dashboard/dashboard')
                        .pipe(
                            tap(data => this.dashboard = data),
                            catchError(this.handleError)
                        );
    }

    getDashboarVendorNotification(): Observable<DashboardVendorNotification> {
        return this.http.get<DashboardVendorNotification>(this.apiURL + '/dashboard/dashboardvendornotification')
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getItemSalesTotals(): Observable<ItemSalesTotal[]> {
        if (this.itemSalesTotals) {
            return of(this.itemSalesTotals);
        }
        return this.http.get<ItemSalesTotal[]>(this.apiURL + '/dashboard/itemsalestotal')
                        .pipe(
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
                            tap(data => this.currentSalesOrderSummary = data),
                            catchError(this.handleError)
                        );
    }

    getFulfilledBySalesOrderSummary(fulfilledby: string): Observable<DashboardSalesOrderSummary[]> {

        return this.http.get<DashboardSalesOrderSummary[]>(this.apiURL + '/dashboard/dashboardsalesordersummary/' + fulfilledby)
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    private handleError(err: HttpErrorResponse) {
        let errorMessage: string;
        if (err.error instanceof Error) {
            errorMessage = `Network error: ${err.error.message}`;
        } else {
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }
}
