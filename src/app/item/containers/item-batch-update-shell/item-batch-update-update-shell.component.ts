import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../../shared/class/item';
import { BatchUpdate, FieldDropDown, FieldType, BatchUpdateValue } from '../../../shared/class/batch-update';
import { ItemService } from '../../item.service';
import { AppService } from '../../../app.service';

import { environment } from '../../../../environments/environment';

@Component({
    templateUrl: './item-batch-update-update-shell.component.html'
})


export class ItemBatchUpdateUpdateShellComponent implements OnInit {
    errorMessage: string;
    items: Item[];

    batchUpdates: BatchUpdate[];
    batchUpdateValues: BatchUpdateValue[];
    selectedBatchUpdate: BatchUpdate;

    batchUpdateField: string;
    batchUpdateValue: string;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    private previewURL = environment.previewURL;

    displayedColumns = ['ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity','Approval','Remove'];
    dataSource: any = null;

    loading: boolean;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private router: Router
        , private appService: AppService
        , private itemService: ItemService) { 
            
    }

    ngOnInit() {
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

        this.items = this.itemService.batchUpdateItems;
    
        if(this.items) {
            this.refreshDataSource();
        }
        else {
            this.router.navigate(['item','batchupdate','select']);
        }

        this.itemService.getItemBatchUpdate().subscribe(
                (data) => {
                    this.batchUpdates = data;
                }
            )
    }

    onFieldChange(batchUpdateField: string) {        
        this.selectedBatchUpdate = this.batchUpdates.find(x => x.FieldName === batchUpdateField);
        this.batchUpdateValue = '';
    }

    refreshDataSource() {
        if(this.countSelected() > 0) {
            this.dataSource = new MatTableDataSource<Item>(this.items.filter(x => x.isSelected === true));
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;    
        }
        else {
            this.itemService.sendNotification({ type: 'info', title: 'Info', content: 'Please select item(s) that requires the update' });
            this.router.navigate(['item','batchupdate','select']);
        }
    }

    onRemove(item: Item) {
        item.isSelected = false;
        this.refreshDataSource();
    }

    updateBatch() {
        this.batchUpdateValues = [];

        if(this.validate())
        {
            this.items.filter( x => x.isSelected === true ).forEach( (item) => {
                const newBatchUpdateValue = new BatchUpdateValue('item', this.batchUpdateField, 'ItemID', String(item.ItemID), this.batchUpdateValue);
                this.batchUpdateValues.push(newBatchUpdateValue);
            });

            this.itemService.editItemBatchUpdate(this.batchUpdateValues).subscribe(
                () => {
                    this.itemService.resetItems();
                    this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: '' });
                    this.items.forEach( (item) => item.isSelected = false );
                    this.batchUpdateValues = [];
                    this.router.navigate(['item','batchupdate','select']);
                },
                (error: any) => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                    this.batchUpdateValues = [];
                }
            )

        }
    }

    validate() : boolean {
        if (this.selectedBatchUpdate.FieldType.Type == "number" && isNaN(Number(this.batchUpdateValue)) ) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Invalid Format' });
            return false;
        }
        else {
            return true;
        }
    }

    countSelected() : number {
        return this.items.filter(x => x.isSelected === true).length;
    }
}
