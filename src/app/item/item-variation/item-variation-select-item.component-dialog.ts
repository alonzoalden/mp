import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ItemList, Item, ItemInsert, ItemAttribute, ItemVariationListing, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';

@Component({
    selector: 'o-variation-select-item',
    templateUrl: 'item-variation-select-item.component-dialog.html',
})
export class ItemVariationSelectItemComponentDialog implements OnInit {
    itemList: ItemList[];
    item: Item;

    
    constructor(
        public dialogRef: MatDialogRef<ItemVariationSelectItemComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            //console.log(data);
            // if (this.data) {
            //     this.itemList = this.data;
            // }
        }
    ngOnInit() {
        console.log(this.data);
        if (this.data.item) this.item = this.data.item;
    }
    onCancelClick(): void {
        this.dialogRef.close(this.item);
    }
    
    onAddItemClick() {
        if (!this.item) return;
        this.dialogRef.close(this.item);
    }
}
