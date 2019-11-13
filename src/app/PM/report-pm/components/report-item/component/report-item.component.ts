import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Item, ItemList} from '../../../../../shared/class/item';
import {Member} from '../../../../../shared/class/member';
import { InventoryReport } from 'app/shared/class/report';

@Component({
    selector: 'app-report-item',
    templateUrl: './report-item.component.html',
    styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit, OnChanges {
    @Input() isItemReportLoading: boolean;
    @Input() reportMatTable: MatTableDataSource<InventoryReport>;
    @Output() getItemReport = new EventEmitter<ItemList>();
    @Output() getItemList = new EventEmitter();
    @Input() itemList: ItemList[];
    @Input() userInfo: Member;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    columnsToDisplay = ['Location', 'QuantityOnHand', 'QuantityAvailable'];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.reportMatTable && changes.reportMatTable.currentValue.data) {
            this.reportMatTable.paginator = this.paginator;
            this.reportMatTable.sort = this.sort;
        }
    }
    ngOnInit() {
        this.getItemList.emit();
        this.getItemReport.emit(null);
    }
    onSelect(item) {
        this.getItemReport.emit(item);
    }
}
