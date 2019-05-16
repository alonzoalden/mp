import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemBatch } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { AppService } from '../../app.service';
import { MatMenu } from '@angular/material/menu';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-batch-approval',
    templateUrl: './item-batch-approval.component.html'
})

export class ItemBatchApprovalComponent implements OnInit {
    errorMessage: string;
    items: ItemBatch[];
    allSelected: boolean;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    private previewURL = environment.previewURL;

    displayedColumns = ['Approve', 'ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity','Approval'];
    dataSource: any = null;

    loading: boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
                    if(!data.IsPM) {
                        this.router.navigate(['dashboard']);
                    }  
                    else if (data.DefaultPageSize) {
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

        //Get Pending Items
        this.itemService.getPendingItems().subscribe(
            (items: ItemBatch[]) => {
                this.loading = false;
                this.items = items;
                this.refreshDataSource(items);
            },
            (error: any) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                //this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(items: ItemBatch[]) {
        this.dataSource = new MatTableDataSource<ItemBatch>(items);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
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
            this.loading = true;
            this.itemService.editItemBatch(this.items).subscribe(
                (items: ItemBatch[]) => {
                    this.loading = false;                
                    this.items = items;

                    this.itemService.resetItems();

                    this.refreshDataSource(items);
                    this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: '' });                                             
                },
                (error: any) => {
                    this.loading = false;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                }
            );
        }
    }
}
