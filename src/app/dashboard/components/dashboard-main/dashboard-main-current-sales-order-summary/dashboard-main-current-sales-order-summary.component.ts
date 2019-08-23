import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DashboardSalesOrderSummary } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Member } from 'app/shared/class/member';

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
    // @Output() getSalesOrderSummaryMerchant = new EventEmitter<void>();
    // @Output() getSalesOrderSummaryToolots = new EventEmitter<void>();

    constructor() { }

    ngOnInit() {
        // this.getSalesOrderSummaryMerchant.emit();
        // this.getSalesOrderSummaryToolots.emit();
    }
}
