import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { AppService } from '../../app.service';
import { MatMenu } from '@angular/material/menu';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-batch-update-select',
    templateUrl: './item-batch-update-select.component.html'
})

export class ItemBatchUpdateSelectComponent {
    errorMessage: string;
    items: Item[];
    allSelected: boolean;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    private previewURL = environment.previewURL;

    displayedColumns = ['Select', 'ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity','Approval'];
    dataSource: any = null;

    loading: boolean;

    selectedCount: number;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private router: Router,
        private itemService: ItemService,
        private appService: AppService,
        public itemPrintDialog: MatDialog,
        public itemImportDialog: MatDialog) { 
            
    }

    ngOnInit() {
        this.allSelected = false;
        this.loading = true;
        
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if (data.DefaultPageSize) {
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                    else {
                        this.paginator.pageSize = 100;
                    }
                },
                (error: any) => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        //Get Items
        this.itemService.getItems().subscribe(
            (items: Item[]) => {
                this.loading = false;
                this.itemService.batchUpdateItems = items;
                this.items = this.itemService.batchUpdateItems;
                this.refreshDataSource(items);
                this.updateSelectedCount();
            },
            (error: any) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                //this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(items: Item[]) {
        this.dataSource = new MatTableDataSource<Item>(items);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    SelectFiltered() {
        this.dataSource.filteredData.forEach( (item) => {
            this.items.find( x => x.ItemID === item.ItemID).isSelected = true;
        });
        this.updateSelectedCount();
    }

    Uncheck() {
        this.items.forEach( (item) => item.isSelected = false );
        this.updateSelectedCount();
    }

    updateSelectedCount(): void {
        if (this.dataSource) {
            this.selectedCount = this.dataSource.filteredData.filter( item => item.isSelected === true).length
        }
    }

}