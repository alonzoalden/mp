import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource, MatSidenav } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Dashboard, DashboardNews, DashboardVendorNotification, DashboardSalesOrderSummary, InboundShipmentStatusCount, ItemSalesTotal, SalesOrderSummary, SalesStatusTotal } from '../../../../shared/class/dashboard';
import { trigger, transition, useAnimation } from '@angular/animations';
import { growContainerAnimation, shinkContainerAnimation } from '../../components/dashboard-main/smooth-open-animation.component';
import { AppService } from '../../../../app.service';
import { Observable } from 'rxjs';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import * as dashboardActions from '../../state/dashboard.actions';
import * as fromDashboard from '../../state';
import { select, Store } from '@ngrx/store';
import { Member } from 'app/shared/class/member';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'o-dashboard-main-shell',
    templateUrl: './dashboard-main-shell.component.html',
    styleUrls: ['../../dashboard.component.css'],
    animations: [
        trigger('smoothOpen', [
            transition('void => false', [
                /*no transition on first load*/
            ]),
            transition('* => void', [
                useAnimation(shinkContainerAnimation)
            ]),
            transition('void => *', [
                useAnimation(growContainerAnimation)
            ])
        ])
    ]
})

export class DashboardMainShellComponent implements OnInit {
    opened: boolean = true;
    dashboard$: Observable<Dashboard>;
    dashboardNews$: Observable<DashboardNews[]>;
    salesOrderSummaryMatTable$: Observable<MatTableDataSource<SalesOrderSummary>>;
    salesOrderSummaryMerchantMatTable$: Observable<MatTableDataSource<DashboardSalesOrderSummary>>;
    salesOrderSummaryToolotsMatTable$: Observable<MatTableDataSource<DashboardSalesOrderSummary>>;
    inboundShipmentStatusCountsMatTable$: Observable<MatTableDataSource<InboundShipmentStatusCount>>;
    itemSalesTotalsMatTable$: Observable<MatTableDataSource<ItemSalesTotal>>;
    salesStatusTotalsMatTable$: Observable<MatTableDataSource<SalesStatusTotal>>;
    userInfo$: Observable<Member>;
    dashboardVendorNotification$: Observable<DashboardVendorNotification>;
    errorMessage$: Observable<string>;

    @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
    @HostListener('window:resize', [])
    onResize() {
        if (window.innerWidth < 700) {
            this.sidenav.close();
        } else {
            this.sidenav.open();
        }
    }

    constructor(
        private store: Store<fromDashboard.State>,
        private route: ActivatedRoute,
        private dashboardService: DashboardService,
        private appService: AppService,
        private oauthService: OAuthService, ) {
    }

    ngOnInit() {
        if (this.route.snapshot.queryParams['init']) {
            this.dashboardService.reset();
        }
        this.store.dispatch(new dashboardActions.LoadSalesOrderSummaryToolots());
        this.store.dispatch(new dashboardActions.LoadSalesOrderSummaryMerchant());
        this.store.dispatch(new dashboardActions.LoadDashboard());
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.dashboard$ = this.store.pipe(select(fromDashboard.getDashboard));
        this.dashboardNews$ = this.store.pipe(select(fromDashboard.getDashboardNews));
        this.dashboardVendorNotification$ = this.store.pipe(select(fromDashboard.getDashboardVendorNotification));
        this.salesOrderSummaryMatTable$ = this.store.pipe(select(fromDashboard.getSalesOrderSummaryMatTable));
        this.itemSalesTotalsMatTable$ = this.store.pipe(select(fromDashboard.getItemSalesTotalsMatTable));
        this.salesStatusTotalsMatTable$ = this.store.pipe(select(fromDashboard.getSalesStatusTotalsMatTable));
        this.salesOrderSummaryMerchantMatTable$ = this.store.pipe(select(fromDashboard.getSalesOrderSummaryMerchantMatTable));
        this.salesOrderSummaryToolotsMatTable$ = this.store.pipe(select(fromDashboard.getSalesOrderSummaryToolotsMatTable));
        this.inboundShipmentStatusCountsMatTable$ = this.store.pipe(select(fromDashboard.getInboundShipmentStatusCountsMatTable));
        this.errorMessage$ = this.store.pipe(select(fromDashboard.getError));

        this.oauthService.events.subscribe(e => {
            this.appService.setWasLoggedIn();
        });

        if ((window.innerWidth) < 700) {
            this.opened = false;
        }
    }
    getDashboardVendorNotification() {
        this.store.dispatch(new dashboardActions.LoadDashboardVendorNotification());
    }
    getInboundShipmentStatusCounts() {
        this.store.dispatch(new dashboardActions.LoadInboundShipmentStatusCounts());
    }
    getItemSalesTotal() {
        this.store.dispatch(new dashboardActions.LoadItemSalesTotal());
    }
    getSalesOrderSummary() {
        this.store.dispatch(new dashboardActions.LoadSalesOrderSummary());
    }
    getSalesStatusTotals() {
        this.store.dispatch(new dashboardActions.LoadSalesStatusTotals());
    }
    getSalesOrderSummaryMerchant() {
        this.store.dispatch(new dashboardActions.LoadSalesOrderSummaryMerchant());
    }
    getSalesOrderSummaryToolots() {
        this.store.dispatch(new dashboardActions.LoadSalesOrderSummaryToolots());
    }

}
