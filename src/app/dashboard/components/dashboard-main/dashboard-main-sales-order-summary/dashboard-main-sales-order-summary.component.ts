import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../../../dashboard.service';

import { SalesOrderSummary } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'o-dashboard-main-sales-order-summary',
    templateUrl: './dashboard-main-sales-order-summary.component.html',
    styleUrls: ['../../../dashboard.component.css'],
    animations: [
        trigger('smoothOpen', [
          transition('void => *', [
            useAnimation(growContainerAnimation)
          ])
        ])
      ]
})


export class DashboardMainSalesOrderSummaryComponent implements OnInit {
    errorMessage: string;
    salesOrderSummary: SalesOrderSummary[];

    displayedColumns = ['NumberOfDays', 'SalesAmount', 'SalesQuantity'];
    dataSource: any = null;
    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getSalesOrderSummary().subscribe(
            (salesOrderSummary: SalesOrderSummary[]) => {
                this.salesOrderSummary = salesOrderSummary;
                this.refreshDataSource(this.salesOrderSummary);
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(salesOrderSummary: SalesOrderSummary[]) {
        this.dataSource = new MatTableDataSource<SalesOrderSummary>(salesOrderSummary);
    }
}
