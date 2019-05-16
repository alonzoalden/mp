import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../dashboard.service';

import { SalesStatusTotal } from '../../shared/class/dashboard';
import { growContainerAnimation } from './smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'o-dashboard-main-sales-status-total',
    styleUrls: ['dashboard-main-sales-status-total.component.css', '../dashboard.component.css'],
    templateUrl: './dashboard-main-sales-status-total.component.html',
    animations: [
        trigger('smoothOpen', [
          transition('void => *', [
            useAnimation(growContainerAnimation)
          ])
        ])
      ]
})


export class DashboardMainSalesStatusTotalComponent implements OnInit {
    errorMessage: string;
    salesStatusTotals: SalesStatusTotal[];

    displayedColumns = ['Status', 'VendorTotal'];
    dataSource: any = null;

    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getSalesStatusTotals().subscribe(
            (salesStatusTotals: SalesStatusTotal[]) => {
                this.salesStatusTotals = salesStatusTotals;
                this.refreshDataSource(this.salesStatusTotals);
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(salesStatusTotals: SalesStatusTotal[]) {
        this.dataSource = new MatTableDataSource<SalesStatusTotal>(salesStatusTotals);
    }
}
