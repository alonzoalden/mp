import { Component, OnInit, Inject } from '@angular/core';
import { ItemList } from '../../shared/class/item';
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
    imageURL = environment.imageURL;
    formInvalid: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationSelectItemComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        if (this.data.item) {
            this.itemList = this.data.itemLists.find((item) => item.ItemID === this.data.item.ItemID);
        }
        this.removeExistingItems();

    }
    onCancelClick(): void {
        this.dialogRef.close('cancel');
    }

    onAddItemClick() {
        if (this.data.item && this.data.item.IsPrimary && this.itemList) {
            this.data.variationListing.PrimaryItemID = this.itemList.ItemID;
        }
        this.dialogRef.close(this.itemList);
    }

    removeExistingItems() {
        //splice out existing variation items from itemLists
        this.data.variationListing.ItemVariations.forEach((itemvariation) => {
            if (this.data.item && this.data.item.ItemID === itemvariation.ItemID) { return; }
            if (this.data.itemLists.length) {
                const index = this.data.itemLists.findIndex((item) => item.ItemID === itemvariation.ItemID);
                this.data.itemLists.splice(index, 1);
            }
        });
    }
}
