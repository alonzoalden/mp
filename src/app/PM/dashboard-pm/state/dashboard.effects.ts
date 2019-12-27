import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DashboardService } from '../dashboard.service';
import * as dashboardActions from './dashboard.actions';
import {
    DashboardSalesOrderSummary,
    InboundShipmentStatusCount,
    ItemSalesTotal,
    Dashboard,
    SalesOrderSummary,
    SalesStatusTotal,
    DashboardVendorNotification,
    ItemSalesForecast
} from 'app/shared/class/dashboard';

@Injectable()
export class DashboardEffects {

    constructor(
        private dashboardService: DashboardService,
        private actions$: Actions) {
    }

    @Effect()
    loadDashboard$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadDashboard),
        mergeMap(() =>
            this.dashboardService.getDashboard().pipe(
                map((dashboard: Dashboard) => (new dashboardActions.LoadDashboardSuccess(dashboard))),
                catchError(err => {
                    of(new dashboardActions.LoadDashboardFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadSalesOrderSummaryMerchant$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadSalesOrderSummaryMerchant),
        mergeMap(() =>
            this.dashboardService.getFulfilledBySalesOrderSummary('merchant').pipe(
                map((members: DashboardSalesOrderSummary[]) => (new dashboardActions.LoadSalesOrderSummaryMerchantSuccess(members))),
                catchError(err => {
                    of(new dashboardActions.LoadSalesOrderSummaryMerchantFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadSalesOrderSummaryToolots$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadSalesOrderSummaryToolots),
        mergeMap(() =>
            this.dashboardService.getFulfilledBySalesOrderSummary('toolots').pipe(
                map((members: DashboardSalesOrderSummary[]) => (new dashboardActions.LoadSalesOrderSummaryToolotsSuccess(members))),
                catchError(err => {
                    of(new dashboardActions.LoadSalesOrderSummaryToolotsFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadInboundShipmentStatusCounts$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadInboundShipmentStatusCounts),
        mergeMap(() =>
            this.dashboardService.getInboundShipmentStatusCounts().pipe(
                map((inboundshipments: InboundShipmentStatusCount[]) => (new dashboardActions.LoadInboundShipmentStatusCountsSuccess(inboundshipments))),
                catchError(err => {
                    of(new dashboardActions.LoadInboundShipmentStatusCountsFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemSalesTotal$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadItemSalesTotal),
        mergeMap(() =>
            this.dashboardService.getItemSalesTotals().pipe(
                map((itemsalestotals: ItemSalesTotal[]) => (new dashboardActions.LoadItemSalesTotalSuccess(itemsalestotals))),
                catchError(err => {
                    of(new dashboardActions.LoadItemSalesTotalFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadSalesOrderSummary$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadSalesOrderSummary),
        mergeMap(() =>
            this.dashboardService.getSalesOrderSummary().pipe(
                map((salesordersummary: SalesOrderSummary[]) => (new dashboardActions.LoadSalesOrderSummarySuccess(salesordersummary))),
                catchError(err => {
                    of(new dashboardActions.LoadSalesOrderSummaryFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadSalesStatusTotals$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadSalesStatusTotals),
        mergeMap(() =>
            this.dashboardService.getSalesStatusTotals().pipe(
                map((salesstatustotals: SalesStatusTotal[]) => (new dashboardActions.LoadSalesStatusTotalsSuccess(salesstatustotals))),
                catchError(err => {
                    of(new dashboardActions.LoadSalesStatusTotalsFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadDashboardVendorNotification$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadDashboardVendorNotification),
        mergeMap(() =>
            this.dashboardService.getDashboarVendorNotification().pipe(
                map((dashboardvendornotification: DashboardVendorNotification) => (new dashboardActions.LoadDashboardVendorNotificationSuccess(dashboardvendornotification))),
                catchError(err => {
                    of(new dashboardActions.LoadDashboardVendorNotificationFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemSalesForecast$: Observable<Action> = this.actions$.pipe(
        ofType(dashboardActions.DashboardActionTypes.LoadItemSalesForecast),
        mergeMap(() =>
            this.dashboardService.getItemSalesForecast().pipe(
                map((itemSalesForecasts: ItemSalesForecast[]) => (new dashboardActions.LoadItemSalesForecastSuccess(itemSalesForecasts))),
                catchError(err => {
                    of(new dashboardActions.LoadItemSalesForecastFail(err));
                    return EMPTY;
                })
            )
        )
    );
}
