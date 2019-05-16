import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../dashboard.service';
import { InboundShipmentStatusCount } from '../../shared/class/dashboard';
import { growContainerAnimation } from './smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'o-dashboard-main-inbound-shipment-status-count',
    styleUrls: ['dashboard-main-inbound-shipment-status-count.component.css', '../dashboard.component.css'],
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
    errorMessage: string;
    inboundShipmentStatusCounts: InboundShipmentStatusCount[];

    displayedColumns = ['Status', 'Count'];
    dataSource: any = null;
    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getInboundShipmentStatusCounts().subscribe(
            (inboundShipmentStatusCounts: InboundShipmentStatusCount[]) => {
                this.inboundShipmentStatusCounts = inboundShipmentStatusCounts;
                this.refreshDataSource(this.inboundShipmentStatusCounts);
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(inboundShipmentStatusCounts: InboundShipmentStatusCount[]) {
        this.dataSource = new MatTableDataSource<InboundShipmentStatusCount>(inboundShipmentStatusCounts);
    }
}
