import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Item } from '../../../../../../shared/class/item';
import { BatchUpdate, BatchUpdateValue } from '../../../../../../shared/class/batch-update';
import { ItemService } from '../../../../../item.service';
import { environment } from '../../../../../../../environments/environment';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-item-batch-update-update',
    templateUrl: './item-batch-update-update.component.html'
})

export class ItemBatchUpdateUpdateComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() itemBatchItemsMatTable: MatTableDataSource<Item>;
    @Input() batchUpdates: BatchUpdate[];
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Output() getItemBatchUpdates = new EventEmitter<void>();
    @Output() editItemBatchUpdate = new EventEmitter<BatchUpdateValue[]>();
    batchUpdateValues: BatchUpdateValue[];
    selectedBatchUpdate: BatchUpdate;
    batchUpdateField: string;
    batchUpdateValue: string;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    private previewURL = environment.previewURL;

    displayedColumns = ['ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity', 'Approval', 'Remove'];
    loading: boolean;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private router: Router
        , private itemService: ItemService) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.batchUpdates && !changes.batchUpdates.currentValue.length) {
            this.getItemBatchUpdates.emit();
        }
        if (changes.itemBatchItemsMatTable && changes.itemBatchItemsMatTable.currentValue.data) {
            this.refreshDataSource();
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (this.userInfo.DefaultPageSize) {
                this.paginator.pageSize = this.userInfo.DefaultPageSize;
            } else {
                this.paginator.pageSize = 100;
            }
        }
    }

    ngOnInit() {}

    onFieldChange(batchUpdateField: string) {
        this.selectedBatchUpdate = this.batchUpdates.find(x => x.FieldName === batchUpdateField);
        this.batchUpdateValue = '';
    }

    refreshDataSource() {
        if (this.countSelected() > 0) {
            this.itemBatchItemsMatTable = new MatTableDataSource<Item>(this.itemBatchItemsMatTable.data.filter(x => x.isSelected === true));
            this.itemBatchItemsMatTable.sort = this.sort;
            this.itemBatchItemsMatTable.paginator = this.paginator;
        } else {
            this.itemService.sendNotification({ type: 'info', title: 'Info', content: 'Please select item(s) that requires the update' });
            this.router.navigate(['item', 'batchupdate', 'select']);
        }
    }

    onRemove(item: Item) {
        item.isSelected = false;
        this.refreshDataSource();
    }

    updateBatch() {
        this.batchUpdateValues = [];

        if (this.validate()) {
            this.itemBatchItemsMatTable.data.filter( x => x.isSelected === true ).forEach( (item) => {
                const newBatchUpdateValue = new BatchUpdateValue('item', this.batchUpdateField, 'ItemID', String(item.ItemID), this.batchUpdateValue);
                this.batchUpdateValues.push(newBatchUpdateValue);
            });

            this.editItemBatchUpdate.emit(this.batchUpdateValues);
            this.batchUpdateValues = [];

        }
    }

    validate(): boolean {
        if (this.selectedBatchUpdate && this.selectedBatchUpdate.FieldType && this.selectedBatchUpdate.FieldType.Type == 'number' && isNaN(Number(this.batchUpdateValue)) ) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Invalid Format' });
            return false;
        } else {
            return true;
        }
    }

    countSelected(): number {
        return this.itemBatchItemsMatTable.data.filter(x => x.isSelected === true).length;
    }
}
