import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DashboardSalesOrderSummary } from '../../../../../shared/class/dashboard';
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
    displayedColumns = ['Status', 'Count'];
    displayedMerchantColumns = ['Unshipped', 'Shipped'];
    displayedToolotsColumns = ['Unshipped', 'Shipped'];

    @Input() salesOrderSummaryMerchantMatTable: MatTableDataSource<DashboardSalesOrderSummary>;
    @Input() salesOrderSummaryToolotsMatTable: MatTableDataSource<DashboardSalesOrderSummary>;
    @Input() errorMessage: string;

    constructor() { }

    ngOnInit() {
    }
}
