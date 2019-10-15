import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
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
    linkURL = environment.linkURL;
    displayedColumns = ['ItemName', 'Quantity', 'Amount'];

    @Input() itemSalesTotalsMatTable: MatTableDataSource<ItemSalesTotal>;
    @Input() errorMessage: string;
    @Output() getItemSalesTotal = new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
        this.getItemSalesTotal.emit();
    }
}
