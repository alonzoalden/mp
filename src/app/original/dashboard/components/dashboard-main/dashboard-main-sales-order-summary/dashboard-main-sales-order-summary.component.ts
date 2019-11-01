import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SalesOrderSummary } from '../../../../../shared/class/dashboard';
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
    @Input() salesOrderSummaryMatTable: MatTableDataSource<SalesOrderSummary>;
    @Input() errorMessage: string;
    @Output() getSalesOrderSummary = new EventEmitter<void>();
    salesOrderSummary: SalesOrderSummary[];
    displayedColumns = ['NumberOfDays', 'SalesAmount', 'SalesQuantity'];
    dataSource: any = null;

    constructor() { }

    ngOnInit() {
        this.getSalesOrderSummary.emit();
    }
}
