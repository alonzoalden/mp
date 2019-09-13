import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemBatch } from '../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../app.service';
import { MatMenu } from '@angular/material/menu';

import { environment } from '../../../../../../environments/environment';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-item-batch-approval',
    templateUrl: './item-batch-approval.component.html'
})

export class ItemBatchApprovalComponent implements OnInit {
    @Input() userInfo: Member;
    @Input() items: ItemBatch[];
    @Input() itemBatchMatTable: MatTableDataSource<ItemBatch>;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Output() getPendingItems = new EventEmitter<void>();
    @Output() editItemBatch = new EventEmitter<ItemBatch[]>();
    allSelected: boolean = false;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    private previewURL = environment.previewURL;

    displayedColumns = ['Approve', 'ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity','Approval'];

    //loading: boolean;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private router: Router,
        private itemService: ItemService,
        private appService: AppService,
        public itemPrintDialog: MatDialog,
        public itemImportDialog: MatDialog) { 
            
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemBatchMatTable && changes.itemBatchMatTable.currentValue.data.length) {
            this.itemBatchMatTable.paginator = this.paginator;
            this.itemBatchMatTable.sort = this.sort;
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (this.userInfo.DefaultPageSize) {
                this.paginator.pageSize = this.userInfo.DefaultPageSize;
            }
            else {
                this.paginator.pageSize = 100;
            }
        }
    }
    
    ngOnInit() {
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
    
    CheckAll() {        
        if(this.allSelected) {
            this.items.forEach(item => { item.Approve = false; });
            this.allSelected = false;            
        }
        else {            
            this.items.forEach(item => { item.Approve = true; })
            this.allSelected = true;
        }
    }

    checkApprove() {
        // if (this.allSelected) {
        //     this.allSelected = false;
        // }
    }

    Approve() {
        const confirmation = confirm(`All selected items will be approved. Will you like to continue?`);
        if (confirmation) {
            this.editItemBatch.emit(this.items);
        }
    }
}
