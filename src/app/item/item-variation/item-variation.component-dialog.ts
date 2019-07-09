import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ItemInsert, ItemAttribute, ItemVariationListing, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';

@Component({
    selector: 'item-variation.component-dialog',
    templateUrl: 'item-variation.component-dialog.html',
})
export class ItemVariationComponentDialog implements OnInit {
    
    attributesVariationsListData: ItemAttribute[];
    attributesVariationsList: any[] = [];
    oldDefault: any;
    newAttribute: any;
    addItemVariationInvalid: boolean = true;
    canShowDefaultOldSettingsInput: boolean = false;
    
    variationListing: ItemVariationListing;
    //product: ItemInsert[];
    
    originalData: any;
    
    @ViewChild('oldDefaultRef') oldDefaultRef: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (this.data) {
                this.attributesVariationsList = this.data.attributesVariationsList;
                this.originalData = [...this.data.attributesVariationsList];
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
                console.log(data);
                this.attributesVariationsListData = data;
                this.displayAvailableAttributes();
                if (this.attributesVariationsListData.length) {
                    this.newAttribute = this.attributesVariationsListData[0];
                }
            });
        //this.itemService.product.subscribe((product) => this.product = product);
        
        
        if (this.data.isEdit) {
            this.variationListing = this.data.variationListing;
        }
        else {
            this.variationListing = this.itemService.defaultVariationListingInsert();
        }
    }

    createAttribute() {
        if (!this.newAttribute) return;
        const tab = this.attributesVariationsListData.find(x => x.ItemAttributeID === this.newAttribute.ItemAttributeID);
        this.attributesVariationsList.push(tab);
        this.displayAvailableAttributes();
        this.clearNewAttributeField();
        this.validateItemVariation();
        if (this.data.isEdit) this.canShowDefaultOldSettings(this.newAttribute);
    }
    
    displayAvailableAttributes() {
        if (this.attributesVariationsList.length) {
           let updatedListData = [...this.attributesVariationsListData];
           this.attributesVariationsList.forEach((x) => {
               const index = updatedListData.findIndex((item) => item.ItemAttributeID === x.ItemAttributeID);
               updatedListData.splice(index, 1);
           })
           this.attributesVariationsListData = updatedListData;
       }
   }

   canShowDefaultOldSettings(e) {
        this.canShowDefaultOldSettingsInput = (this.data.isEdit && this.data.attributesVariationsList.length > this.originalData.length && this.originalData.length > 0 && this.originalData.indexOf(e) < 0);
   }

    clearNewAttributeField() {    
        this.newAttribute = null;
    }
    
    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddItemVariationClick() {
        const listing = this.itemService.addItemVariation(this.variationListing, this.attributesVariationsList, this.oldDefault);
        
        // this.attributesVariationsList.forEach((item) => {
        //     if (item.variationOptions && item.variationOptions.length > 0) {
        //         item.selectedVariation = item.variationOptions[0];
        //     }
        // })
        
        this.onUpdateItemData(this.attributesVariationsList);
        this.dialogRef.close(listing);
    }

    onUpdateItemData(list) {
        if (list && this.variationListing) {
            const selectedVariations = list.map((i) => {
                if (i.selectedVariation) return i.selectedVariation;
            });
            this.variationListing.ItemVariations.forEach((item) => {
                if (item.ItemVariationLines) {
                    let variation = item.ItemVariationLines.every((variation) => selectedVariations.indexOf(variation) !== -1);
                    if (variation) return this.viewVariationItem(item);
                }
            });
        }
    }
    onNgModelChange(e) {
        console.log(e);
        this.canShowDefaultOldSettings(e);
        this.validateItemVariation();
    }
    viewVariationItem(item) {
        this.itemService.currentProductItemInsert.next(item);
    }
    validateItemVariation() {
        this.addItemVariationInvalid = this.attributesVariationsList.find((item) => {
            return !(item && item.variationOptions && item.variationOptions.length > 1);
        });
        if (this.oldDefaultRef && !this.oldDefault ) {
            this.addItemVariationInvalid = true;
        }
    }
    test(a) {
        console.log(a)
    }
}
