import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ItemSalesForecast} from '../../../../../shared/class/dashboard';
import {growContainerAnimation} from '../smooth-open-animation.component';
import {transition, trigger, useAnimation} from '@angular/animations';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'o-dashboard-main-item-sales-forecast',
    styleUrls: ['dashboard-main-item-sales-forecast.component.css', '../../../dashboard.component.css'],
    templateUrl: './dashboard-main-item-sales-forecast.component.html',
    animations: [
        trigger('smoothOpen', [
            transition('void => *', [
                useAnimation(growContainerAnimation)
            ])
        ])
    ]
})


export class DashboardMainItemSalesForecastComponent implements OnInit, OnChanges {
    linkURL = environment.linkURL;
    displayedColumns = ['MerchantID', 'SKU', 'TPIN', 'InventoryQuantity', 'SaleQuantity', 'SaleForecastDays'];

    @Input() itemSalesForecaseMatTable: MatTableDataSource<ItemSalesForecast>;
    @Output() getItemSalesForecast = new EventEmitter<void>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemSalesForecaseMatTable && changes.itemSalesForecaseMatTable.currentValue.data) {
            this.itemSalesForecaseMatTable.paginator = this.paginator;
            this.itemSalesForecaseMatTable.sort = this.sort;
        }
    }

    ngOnInit() {
        this.getItemSalesForecast.emit();
    }
}
