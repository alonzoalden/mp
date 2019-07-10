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
        @Inject(MAT_DIALOG_DATA) public data: any) {
            //console.log(data);
            // if (this.data) {
            //     this.itemList = this.data;
            // }
        }
    ngOnInit() {
        console.log(this.data);
        if (this.data.item) this.itemList = this.data.item;

        this.data.variationListing.ItemVariations.forEach((itemvariation) => {
            
            if (this.data.item) {
                const index = this.data.itemLists.findIndex((item) => {
                    if (this.data.item.ItemID !== itemvariation.ItemID) {
                        return item.ItemID === itemvariation.ItemID;
                    }
                });
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
    validateItemSelection(id) {

        const matchingID = this.data.variationListing.ItemVariations.find((variation) => variation.ItemID === id);
        console.log(matchingID);
        if (matchingID) {
            this.formInvalid = true;
            this.itemService.sendNotification({ type: 'error', title: 'Choose Another Item', content: 'Item already selected in different variation' });
        }
        else {
            this.formInvalid = false;
        }

    }
}
