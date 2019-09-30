import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Item } from '../../../../../../shared/class/item';
import { ItemService } from '../../../../../item.service';
import { AppService } from '../../../../../../app.service';
import { environment } from '../../../../../../../environments/environment';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-item-batch-update-select',
    templateUrl: './item-batch-update-select.component.html'
})

export class ItemBatchUpdateSelectComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() itemBatchItemsMatTable: MatTableDataSource<Item>;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Output() getItems = new EventEmitter<void>();

    selectedCount: number;
    allSelected: boolean = false;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    private previewURL = environment.previewURL;

    displayedColumns = ['Select', 'ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity', 'Approval'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private router: Router,
        private itemService: ItemService,
        private appService: AppService,
        public itemPrintDialog: MatDialog,
        public itemImportDialog: MatDialog) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemBatchItemsMatTable && changes.itemBatchItemsMatTable.currentValue.data) {
            this.itemBatchItemsMatTable.paginator = this.paginator;
            this.itemBatchItemsMatTable.sort = this.sort;
        }
        if (changes.itemBatchItemsMatTable && !changes.itemBatchItemsMatTable.currentValue.data.length && changes.itemBatchItemsMatTable.firstChange) {
            this.getItems.emit();
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

    }

    refreshDataSource(items: Item[]) {
        this.itemBatchItemsMatTable = new MatTableDataSource<Item>(items);
        this.itemBatchItemsMatTable.sort = this.sort;
        this.itemBatchItemsMatTable.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.itemBatchItemsMatTable.filter = filterValue.trim().toLowerCase();
        if (this.itemBatchItemsMatTable.paginator) {
            this.itemBatchItemsMatTable.paginator.firstPage();
        }
    }

    SelectFiltered() {
        this.itemBatchItemsMatTable.filteredData.forEach( (item) => {
            this.itemBatchItemsMatTable.data.find( x => x.ItemID === item.ItemID).isSelected = true;
        });
        this.updateSelectedCount();
    }

    Uncheck() {
        this.itemBatchItemsMatTable.data.forEach( (item) => item.isSelected = false );
        this.updateSelectedCount();
    }

    updateSelectedCount(): void {
        if (this.itemBatchItemsMatTable) {
            this.selectedCount = this.itemBatchItemsMatTable.filteredData.filter( item => item.isSelected === true).length;
        }
    }

}
