import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { InboundShipmentStatusCount } from '../../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'o-dashboard-main-inbound-shipment-status-count',
    styleUrls: ['../../../dashboard.component.css'],
    templateUrl: './dashboard-main-inbound-shipment-status-count.component.html',
    animations: [
        trigger('smoothOpen', [
          transition('void => *', [
            useAnimation(growContainerAnimation)
          ])
        ])
      ]
})

export class DashboardMainInboundShipmentStatusCountComponent implements OnInit {
    displayedColumns = ['Status', 'Count'];
    @Input() inboundShipmentStatusCountsMatTable: MatTableDataSource<InboundShipmentStatusCount>;
    @Input() errorMessage: string;
    @Output() getInboundShipmentStatusCounts = new EventEmitter<void>();

    constructor() { }

    ngOnInit() {
        this.getInboundShipmentStatusCounts.emit();
    }
}
