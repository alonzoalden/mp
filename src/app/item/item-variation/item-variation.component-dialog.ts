import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ItemInsert, ItemAttribute, ItemVariationListing, ItemVariation, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';

@Component({
    selector: 'item-variation.component-dialog',
    templateUrl: 'item-variation.component-dialog.html',
})
export class ItemVariationComponentDialog implements OnInit {
    
    attributesVariationsListData: ItemAttribute[];
    selectedItemAttributes: ItemAttribute[] = [];
    oldDefault: any;
    newAttribute: any;
    addItemVariationInvalid: boolean = true;
    canShowDefaultOldSettingsInput: boolean = false;
    
    itemVariationListing: ItemVariationListing;
    //product: ItemInsert[];
    
    originalData: ItemAttribute[];
    
    @ViewChild('oldDefaultRef') oldDefaultRef: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (this.data) {
                this.selectedItemAttributes = this.data.selectedItemAttributes;
                this.originalData = [...this.data.selectedItemAttributes];
            }
        }
    ngOnInit() {
        // let data = this.itemService.getItemAttributes();
        // this.attributesVariationsListData = data;
        // this.displayAvailableAttributes();
        // console.log(this.attributesVariationsListData);
        // if (this.attributesVariationsListData.length) {
        //     this.newAttribute = this.attributesVariationsListData[0];
        // }
        
        //USE THIS WHEN API IS WORKING

        this.itemService.getItemAttributes()
            .subscribe((data) => {
                this.attributesVariationsListData = data;
                this.displayAvailableAttributes();
                if (this.attributesVariationsListData.length) {
                    this.newAttribute = this.attributesVariationsListData[0];
                }
            });
        //this.itemService.product.subscribe((product) => this.product = product);
        
        
        if (this.data.isEdit) {
            this.itemVariationListing = this.data.itemVariationListing;
        }
        else {
            this.itemVariationListing = this.itemService.defaultVariationListingInsert();
        }
    }

    createAttribute() {
        if (!this.newAttribute) return;
        const tab = this.attributesVariationsListData.find(x => x.ItemAttributeID === this.newAttribute.ItemAttributeID);
        this.selectedItemAttributes.push(tab);
        this.displayAvailableAttributes();
        this.clearNewAttributeField();
        this.validateItemVariation();
        if (this.data.isEdit) this.canShowDefaultOldSettings(this.newAttribute);
    }
    
    displayAvailableAttributes() {
        if (this.selectedItemAttributes.length) {
           let updatedListData = [...this.attributesVariationsListData];
           this.selectedItemAttributes.forEach((x) => {
               const index = updatedListData.findIndex((item) => item.ItemAttributeID === x.ItemAttributeID);
               updatedListData.splice(index, 1);
           })
           this.attributesVariationsListData = updatedListData;
       }
   }

   canShowDefaultOldSettings(e) {
        this.canShowDefaultOldSettingsInput = (this.data.isEdit && this.data.selectedItemAttributes.length > this.originalData.length && this.originalData.length > 0 && this.originalData.indexOf(e) < 0);
   }

    clearNewAttributeField() {    
        this.newAttribute = null;
    }
    
    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddItemVariationClick() {
        const listing = this.itemService.addItemVariation(this.itemVariationListing, this.selectedItemAttributes, this.oldDefault);
        
        // this.attributesVariationsList.forEach((item) => {
        //     if (item.variationOptions && item.variationOptions.length > 0) {
        //         item.selectedVariation = item.variationOptions[0];
        //     }
        // })
        
        //this.onUpdateItemData(this.attributesVariationsList);
        console.log(listing);
        this.dialogRef.close(listing);
    }

    // onUpdateItemData(list) {
    //     if (list && this.itemVariationListing) {
    //         const selectedVariations = list.map((i) => {
    //             if (i.selectedVariation) return i.selectedVariation;
    //         });
    //         this.itemVariationListing.ItemVariations.forEach((item) => {
    //             if (item.ItemVariationLines) {
    //                 let variation = item.ItemVariationLines.every((variation) => selectedVariations.indexOf(variation) !== -1);
    //                 if (variation) return this.viewVariationItem(item);
    //             }
    //         });
    //     }
    // }
    onNgModelChange(e) {
        //console.log(e);
        this.canShowDefaultOldSettings(e);
        this.validateItemVariation();
    }
    viewVariationItem(item) {
        this.itemService.currentProductItemInsert.next(item);
    }
    validateItemVariation() {     
        this.addItemVariationInvalid = !!this.selectedItemAttributes.find((item) =>       {  
           return !(item && item.SelectedItemAttributeVariations && item.SelectedItemAttributeVariations.length > 1)
        } );
        if (this.oldDefaultRef && !this.oldDefault ) {
            this.addItemVariationInvalid = true;
        }
    }
    test(a) {
        console.log(a)
    }
}
