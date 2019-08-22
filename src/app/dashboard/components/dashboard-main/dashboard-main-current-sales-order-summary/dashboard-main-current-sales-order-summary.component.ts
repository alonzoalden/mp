import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../../../dashboard.service';

import { CurrentSalesOrderSummary, DashboardSalesOrderSummary } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'o-dashboard-main-current-sales-order-summary',
    templateUrl: './dashboard-main-current-sales-order-summary.component.html',
    animations: [
        trigger('smoothOpen', [
          transition('void => *', [
            useAnimation(growContainerAnimation)
          ])
        ])
      ]
})


export class DashboardMainCurrentSalesOrderSummaryComponent implements OnInit {
    errorMessage: string;
    currentSalesOrderSummary: CurrentSalesOrderSummary[];

    merchantSalesOrderSummary: DashboardSalesOrderSummary[];
    toolotsSalesOrderSummary: DashboardSalesOrderSummary[];

    displayedColumns = ['Status', 'Count'];

    displayedMerchantColumns = ['Unshipped', 'Shipped'];
    displayedToolotsColumns = ['Unshipped', 'Shipped'];
    
    dataSource: any = null;
    dataSourceToolots: any = null;
    dataSourceMerchant: any = null;

    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
        // this.dashboardService.getCurrentSalesOrderSummary().subscribe(
        //     (currentSalesOrderSummary: CurrentSalesOrderSummary[]) => {
        //         this.currentSalesOrderSummary = currentSalesOrderSummary;
        //         console.log('old');
        //         console.log(this.currentSalesOrderSummary);
        //         this.refreshDataSource(this.currentSalesOrderSummary);
        //     },
        //     (error: any) => {
        //         this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
        //         this.errorMessage = <any>error;
        //     }
        // );

        this.dashboardService.getFulfilledBySalesOrderSummary('merchant').subscribe(
            (dashboardSalesOrderSummary: DashboardSalesOrderSummary[]) => {
                this.merchantSalesOrderSummary = dashboardSalesOrderSummary;
                this.refreshDataSource(this.merchantSalesOrderSummary, 'merchant');
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );

        this.dashboardService.getFulfilledBySalesOrderSummary('toolots').subscribe(
            (dashboardSalesOrderSummary: DashboardSalesOrderSummary[]) => {
                this.toolotsSalesOrderSummary = dashboardSalesOrderSummary;
                this.refreshDataSource(this.toolotsSalesOrderSummary, 'toolots');
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(currentSalesOrderSummary: DashboardSalesOrderSummary[], type: String) {
        if (type === 'merchant') {
            this.dataSourceMerchant = new MatTableDataSource<DashboardSalesOrderSummary>(currentSalesOrderSummary);
        }
        else {
            this.dataSourceToolots = new MatTableDataSource<DashboardSalesOrderSummary>(currentSalesOrderSummary);
        }
    }
}
