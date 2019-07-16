import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ItemAttribute, ItemVariationListing, ItemAttributeVariation } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';

@Component({
    selector: 'item-variation.component-dialog',
    templateUrl: 'item-variation.component-dialog.html',
})
export class ItemVariationComponentDialog implements OnInit {
    
    attributesVariationsListData: ItemAttribute[];
    selectedItemAttributes: ItemAttribute[] = [];
    oldDefault: ItemAttributeVariation;
    newAttribute: ItemAttribute;
    addItemVariationInvalid: boolean = true;
    canShowDefaultOldSettingsInput: boolean = false;
    
    itemVariationListing: ItemVariationListing;
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
        this.itemService.getItemAttributes()
            .subscribe((data) => {
                this.attributesVariationsListData = data;
                this.displayAvailableAttributes();
                if (this.attributesVariationsListData.length) {
                    this.newAttribute = this.attributesVariationsListData[0];
                }
            });
            
        if (this.data.isEdit) {
            this.itemVariationListing = this.data.itemVariationListing;
        }
        else {
            this.itemVariationListing = this.itemService.defaultVariationListingInsert();
        }
        this.validateItemVariation();
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
           this.selectedItemAttributes.forEach((itemAttribute) => {
               const index = updatedListData.findIndex((item) => item.ItemAttributeID === itemAttribute.ItemAttributeID);
               if (index > -1) updatedListData.splice(index, 1);
           })
           this.attributesVariationsListData = updatedListData;
       }
   }

   canShowDefaultOldSettings(e) {
        this.canShowDefaultOldSettingsInput = (this.data.isEdit
            && this.data.selectedItemAttributes.length > this.originalData.length
            && this.originalData.length > 0
            && this.originalData.indexOf(e) < 0
        );
   }

    clearNewAttributeField() {    
        this.newAttribute = null;
    }
    
    onCancelClick(): void {
        this.dialogRef.close();
    }
    
    onAddItemVariationClick() {
        this.selectedItemAttributes = this.selectedItemAttributes.filter((itemAttribute:  ItemAttribute) => itemAttribute.SelectedItemAttributeVariations.length);
        const listing = this.itemService.addItemVariation(this.itemVariationListing, this.selectedItemAttributes);
        this.dialogRef.close(listing);
    }

    onNgModelChange(tab) {        
        if (tab.OldDefault && tab.OldDefault.ItemAttributeVariationID) {
            const variationUnselected = tab.SelectedItemAttributeVariations.find((attributevariation) => { 
                return attributevariation.ItemAttributeVariationID === tab.OldDefault.ItemAttributeVariationID;
            })
            if (!variationUnselected) tab.OldDefault = tab.SelectedItemAttributeVariations[0];
        }
         
        if (this.canShowDefaultOldSettingsInput && !tab.OldDefault) {
            tab.OldDefault = tab.SelectedItemAttributeVariations[0];
        }
        if (this.canShowDefaultOldSettingsInput && !tab.SelectedItemAttributeVariations.length && tab.OldDefault) {
            tab.OldDefault = null;
        }
        this.validateItemVariation();
    }
    validateItemVariation() {
        this.addItemVariationInvalid = !!this.selectedItemAttributes.find((item) => {  
           return !(item && item.SelectedItemAttributeVariations && item.SelectedItemAttributeVariations.length !== 1);
        } );
        const noVariationsSelected = this.selectedItemAttributes.every((itemattribute) => {
            if (itemattribute.SelectedItemAttributeVariations) return itemattribute.SelectedItemAttributeVariations.length === 0;
        });
        if (noVariationsSelected) this.addItemVariationInvalid = true;
    }
}