import { Component, OnInit, Inject } from '@angular/core';
import { ItemList } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-inbound-shipment-select-item',
    templateUrl: 'inbound-shipment-edit-carton-list.component-select-dialog.html',
})
export class InboundShipmentSelectItemComponentDialog implements OnInit {
    items: ItemList[];
    currentItem: ItemList;
    private imageURL = environment.imageURL;
    formInvalid: boolean = false;

    itemList: ItemList;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentSelectItemComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        if (this.data.items) {
            // this.currentItem = this.data.items.find((item) => item.ItemID === this.data.item.ItemID);
            this.items = this.data.items
            this.currentItem = this.data.item;
        }
        //this.removeExistingItems();
        
    }
    onCancelClick(): void {
        this.dialogRef.close('cancel');
    }
    
    onAddItemClick() {
        
    }
    
    // removeExistingItems() {
    //     //splice out existing variation items from itemLists
    //     this.data.variationListing.ItemVariations.forEach((itemvariation) => {
    //         if (this.data.item && this.data.item.ItemID === itemvariation.ItemID) return;
    //         if (this.data.itemLists.length) {
    //             const index = this.data.itemLists.findIndex((item) => item.ItemID === itemvariation.ItemID);
    //             this.data.itemLists.splice(index, 1);
    //         }
    //     });
    // }
}