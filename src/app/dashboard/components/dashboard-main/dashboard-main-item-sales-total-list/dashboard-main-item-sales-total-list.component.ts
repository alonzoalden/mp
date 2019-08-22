import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../../../dashboard.service';

import { ItemSalesTotal } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';

import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'o-dashboard-main-item-sales-total-list',
    styleUrls: ['dashboard-main-item-sales-total-list.component.css', '../../../dashboard.component.css'],
    templateUrl: './dashboard-main-item-sales-total-list.component.html',
    animations: [
        trigger('smoothOpen', [
          transition('void => *', [
            useAnimation(growContainerAnimation)
          ])
        ])
      ]
})


export class DashboardMainItemSalesTotalListComponent implements OnInit {
    errorMessage: string;
    itemSalesTotals: ItemSalesTotal[];

    private linkURL = environment.linkURL;

    displayedColumns = ['ItemName', 'Quantity', 'Amount'];
    dataSource: any = null;
  
    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getItemSalesTotals().subscribe(
            (itemSalesTotals: ItemSalesTotal[]) => {
                this.itemSalesTotals = itemSalesTotals;
                this.refreshDataSource(this.itemSalesTotals);
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(itemSalesTotals: ItemSalesTotal[]) {
        this.dataSource = new MatTableDataSource<ItemSalesTotal>(itemSalesTotals);
    }
}
