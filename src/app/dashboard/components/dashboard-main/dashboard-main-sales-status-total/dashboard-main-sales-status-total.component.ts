import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SalesStatusTotal } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'o-dashboard-main-sales-status-total',
    styleUrls: ['../../../dashboard.component.css'],
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
    @Input() salesStatusTotalsMatTable: MatTableDataSource<SalesStatusTotal>;
    @Input() errorMessage: string;
    @Output() getSalesStatusTotals = new EventEmitter<void>();
    displayedColumns = ['Status', 'VendorTotal'];

    constructor() { }

    ngOnInit() {
        this.getSalesStatusTotals.emit();
    }
}
