import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ItemInsert, ItemAttribute, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

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
    
    product: ItemInsert[];
    originalData: any;
    
    @ViewChild('oldDefaultRef') oldDefaultRef: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (this.data) {
                this.attributesVariationsList = this.data;
                this.originalData = [...this.data];
            }
        }
    ngOnInit() {
        this.itemService.getItemAttributes()
            .subscribe((data) => {
                this.attributesVariationsListData = data;
                this.displayAvailableAttributes();
                if (this.attributesVariationsListData.length) {
                    this.newAttribute = this.attributesVariationsListData[0];
                }
            });
        this.itemService.product.subscribe((product) => this.product = product);
    }

    createAttribute() {
        if (!this.newAttribute) return;
        const tab = this.attributesVariationsListData.find(x => x.ItemAttributeID === this.newAttribute.ItemAttributeID);
        this.attributesVariationsList.push(tab);
        this.displayAvailableAttributes();
        this.clearNewAttributeField();
        this.validateItemVariation();
        this.canShowDefaultOldSettings(this.newAttribute);
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
        this.canShowDefaultOldSettingsInput = (this.data.length > this.originalData.length && this.originalData.indexOf(e) < 0);
   }

    clearNewAttributeField() {    
        this.newAttribute = null;
    }
    
    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddItemVariationClick() {
        this.itemService.addItemVariation(this.attributesVariationsList, this.oldDefault);
        
        this.attributesVariationsList.forEach((item) => {
            if (item.variationOptions && item.variationOptions.length > 0) {
                item.selectedVariation = item.variationOptions[0];
            }
        })
        
        this.onUpdateItemData(this.attributesVariationsList);
        this.dialogRef.close();
    }
    onUpdateItemData(list) {
        if (list && this.product) {
            const selectedVariations = list.map((i) => {
                if (i.selectedVariation) return i.selectedVariation;
            });
            this.product.forEach((item) => {
                if (item.ItemVariationItems) {
                    let variation = item.ItemVariationItems.every((variation) => selectedVariations.indexOf(variation) !== -1);
                    if (variation) return this.viewVariationItem(item);
                }
            });
        }
    }
    onNgModelChange() {
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
}
