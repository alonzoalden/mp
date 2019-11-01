import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ItemBatch } from '../../../../../../shared/class/item';

import { environment } from '../../../../../../../environments/environment';
import { Member } from '../../../../../../shared/class/member';

@Component({
    selector: 'o-item-batch-approval',
    templateUrl: './item-batch-approval.component.html'
})

export class ItemBatchApprovalComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() items: ItemBatch[];
    @Input() itemBatchMatTable: MatTableDataSource<ItemBatch>;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Output() getPendingItems = new EventEmitter<void>();
    @Output() editItemBatch = new EventEmitter<ItemBatch[]>();
    allSelected: boolean = false;
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    previewURL = environment.previewURL;

    displayedColumns = ['Approve', 'ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity', 'Approval'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        public itemPrintDialog: MatDialog,
        public itemImportDialog: MatDialog
    ) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemBatchMatTable && changes.itemBatchMatTable.currentValue.data.length) {
            this.itemBatchMatTable.paginator = this.paginator;
            this.itemBatchMatTable.sort = this.sort;
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (this.userInfo.DefaultPageSize) {
                this.paginator.pageSize = this.userInfo.DefaultPageSize;
            } else {
                this.paginator.pageSize = 100;
            }
        }
    }

    ngOnInit() {
        this.applyFilter('');
        this.getPendingItems.emit();
    }

    refreshDataSource(items: ItemBatch[]) {
        this.itemBatchMatTable = new MatTableDataSource<ItemBatch>(items);
        this.itemBatchMatTable.sort = this.sort;
        this.itemBatchMatTable.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.itemBatchMatTable.filter = filterValue.trim().toLowerCase();
        if (this.itemBatchMatTable.paginator) {
            this.itemBatchMatTable.paginator.firstPage();
        }
    }

    checkAll() {
        if (this.allSelected) {
            this.items.forEach(item => { item.Approve = false; });
            this.allSelected = false;
        } else {
            this.items.forEach(item => { item.Approve = true; });
            this.allSelected = true;
        }
    }

    checkApprove() {
        // if (this.allSelected) {
        //     this.allSelected = false;
        // }
    }

    approve() {
        const confirmation = confirm(`All selected items will be approved. Will you like to continue?`);
        if (confirmation) {
            this.editItemBatch.emit(this.items);
        }
    }
}
