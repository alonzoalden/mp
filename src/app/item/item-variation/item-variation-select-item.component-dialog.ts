import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ItemList, Item, ItemInsert, ItemAttribute, ItemVariationListing, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-variation-select-item',
    templateUrl: 'item-variation-select-item.component-dialog.html',
})
export class ItemVariationSelectItemComponentDialog implements OnInit {
    itemLists: ItemList[];
    itemList: ItemList;
    private imageURL = environment.imageURL;
    formInvalid: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationSelectItemComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        console.log(this.data);
        
        console.log(this.itemList);
        if (this.data.item) {
            this.itemList = new ItemList(this.data.item.ItemID, this.data.item.ItemName, null, this.data.item.ItemName, this.data.item.ItemTPIN, this.data.item.ItemVendorSKU, this.data.item.ItemImagePath)
        }
        //splice out existing variation items from itemLists
        this.data.variationListing.ItemVariations.forEach((itemvariation) => {
            if (this.data.item && this.data.item.ItemID === itemvariation.ItemID) return;
            if (this.data.itemLists.length) {
                const index = this.data.itemLists.findIndex((item) => item.ItemID === itemvariation.ItemID);
                this.data.itemLists.splice(index, 1);
            }
        })
    }
    onCancelClick(): void {
        this.dialogRef.close();
    }
    
    onAddItemClick() {
        if (!this.itemList) return;
        this.dialogRef.close(this.itemList);
    }

    //don't need because we splice out existing items on nginit
    validateItemSelection(id) {
        const matchingID = this.data.variationListing.ItemVariations.find((variation) => variation.ItemID === id);
        if (matchingID) {
            this.formInvalid = true;
            this.itemService.sendNotification({ type: 'error', title: 'Choose Another Item', content: 'Item already selected in different variation' });
        }
        else {
            this.formInvalid = false;
        }

    }
}
