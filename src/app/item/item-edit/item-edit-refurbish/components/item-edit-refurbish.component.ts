import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Item, InventoryDetailSerialized, ItemImageSerialized } from '../../../../shared/class/item';
import { Member } from '../../../../shared/class/member';
import { ItemService } from '../../../item.service';
import { environment } from '../../../../../environments/environment';
import { ItemEditRefurbishImageComponentUploadDialog } from './item-edit-refurbish.component-upload-dialog';
declare var $: any;

@Component({
    selector: 'o-item-edit-refurbish',
    templateUrl: './item-edit-refurbish.component.html'
})

export class ItemEditRefurbishComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() userInfo: Member;
    @Input() itemRefurbishesMatTable: MatTableDataSource<InventoryDetailSerialized>;
    displayedColumns = ['Images', 'SerialNumber', 'Condition', 'Comment', 'SellingPrice'];
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    itemid: number;
    refurbishURL = environment.refurbishURL;
    pendingUpload: boolean;
    guid: string;
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    public isLoadingData: Boolean = false;
    public isLoadingMultipleData: Boolean = false;

    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService,
        public itemUploadDialog: MatDialog
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
      
    }
    ngOnInit(): void {
        this.itemid = this.route.parent.snapshot.params['id'];
    }


    refreshDataSource(itemrefurbishes: InventoryDetailSerialized[]) {
        this.itemRefurbishesMatTable = new MatTableDataSource<InventoryDetailSerialized>(itemrefurbishes);
    }


    onEditItemImage(index: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.item.InventoryDetailsSerialized.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemrefurbish: InventoryDetailSerialized): boolean {
        return !!(itemrefurbish
            && itemrefurbish.ItemImagesSerialized.length
            && itemrefurbish.UnitPrice
            && itemrefurbish.SerialNumber
            && itemrefurbish.Condition
        );
    }
    containsAnyValues(itemRefurbish: InventoryDetailSerialized) {
        return !!(itemRefurbish
            || itemRefurbish.ItemImagesSerialized.length
            || itemRefurbish.UnitPrice
            || itemRefurbish.SerialNumber
            || itemRefurbish.Condition
        );
    }
    moveDownPosition(itemrefurbish: InventoryDetailSerialized) {
        this.positionMove(this.item.InventoryDetailsSerialized, itemrefurbish, 1);
        this.item.InventoryDetailsSerialized.forEach((value, index) => {
            //value.Position = index + 1;
        });

        this.refreshDataSource(this.item.InventoryDetailsSerialized);
    }

    moveUpPosition(itemrefurbish: InventoryDetailSerialized) {
        this.positionMove(this.item.InventoryDetailsSerialized, itemrefurbish, -1);
        this.item.InventoryDetailsSerialized.forEach((value, index) => {
            //value.Position = index + 1;
        });

        this.refreshDataSource(this.item.InventoryDetailsSerialized);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    clearFields(form) {
        if (form.ItemImagesSerialized.length) {
            const confirmation = confirm(`You currently have ${form.ItemImagesSerialized.length} uploaded images. Are you sure you want to clear?`);
            if (!confirmation) {
                return;
            }
        }
        this.formDirty = false;
        form.SellingPrice = null;
    }

    viewImages(index: number) {
        const dialogRef = this.itemUploadDialog.open(ItemEditRefurbishImageComponentUploadDialog, {
            data: this.item.InventoryDetailsSerialized[index].ItemImagesSerialized,
        });

        dialogRef.afterClosed().subscribe(result => {
        },
        (error: any) => {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }
}