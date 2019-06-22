import { Component, OnInit, Inject } from '@angular/core';
import { FakeItemInsert, ItemInsert, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';

@Component({
    selector: 'item-variation.component-dialog',
    templateUrl: 'item-variation.component-dialog.html',
})
export class ItemVariationComponentDialog implements OnInit {
    
    attributesVariationsListData: any[];

    attributesVariationsList: any[] = [];

    oldDefault: any = {};
    
    
    //updatedListData: any[];

    newAttribute: any;
    // selectedProperties: any = {};
    // selectedAttributes: any;
    // selectedVariations: any = [];

    // newTabVariations: any = [];


    // tabName: any[] = [];
    // tabProperties: any[] = [];

    // tempPropertyName: any = '';
    // showInput = false;

    // tabsListTest: any;
    addItemVariationInvalid: boolean = true;
    originalData: any;
    // showDefaultSettingsSelection: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (this.data) this.attributesVariationsList = this.data;
            if (this.data.length > 0) {}
            console.log(this.data);
            this.originalData = [...this.data];
        }
    ngOnInit() {
        
        this.itemService.getGlobalAttributesVariations()
            .subscribe((data) => {
                this.attributesVariationsListData = data;
            });            
            
        // This displays the attributes that are available for selection
        if (this.data && this.data.length > 0) {
            const updatedListData = [...this.attributesVariationsListData];
            this.attributesVariationsList.forEach((x) => {
                const index = this.attributesVariationsListData.findIndex((item) => item.attributeID === x.attributeID);
                updatedListData.splice(index, 1);
            })
            this.attributesVariationsListData = updatedListData;
        }

    }
    
    canShowDefaultOldSettingsInput(tab) {
        // console.log('Original Data', this.originalData)
        // console.log('Data', this.data)
        // console.log(tab)
        
        if (this.data.length > this.originalData.length && this.originalData.length  > 0 && this.originalData.indexOf(tab) < 0) {
            return true;
        }
        else {
            return false;
        }
        
        
        // if (this.data && this.data.length > 0) {
        //     var item = this.data.updatedListData.find((x) => x.name === tabname);
        //     if (item && this.data.updatedListData && this.data.updatedListData.length > 0) {
        //         return true;
        //     } 
        //     else {
        //         return false;
        //     }
        // }
        
    }

    createAttribute() {
        const tab = this.attributesVariationsListData.find(x => x.attributeName === this.newAttribute.attributeName);
        this.attributesVariationsList.push(tab);
        
        const index = this.attributesVariationsListData.map((item) => item.attributeName).indexOf(tab.attributeName)
    
        //THIS IS THE LOGIC TO CLEAN UP THE this.tabsListData
        const updatedListData = [...this.attributesVariationsListData];
        updatedListData.splice(index, 1)
        this.attributesVariationsListData = updatedListData;
        
        
        this.clearNewAttributeField();
        this.validateItemVariation();
    }

    clearNewAttributeField() {    
        this.newAttribute = null;
    }
    
    onCancelClick(): void {
        this.dialogRef.close();
    }


    onAddItemVariationClick() {
        this.itemService.addItemVariation(this.attributesVariationsList, this.oldDefault.variation)
        this.dialogRef.close();
    }
    onUpdateOldDefault(b) {
        //this.oldDefault.name = tabname;
        //console.log(tabname)
        //console.log(b)
    }
    onNgModelChange(tab) {
        this.validateItemVariation();
    }

    validateItemVariation() {
        this.addItemVariationInvalid = !!this.attributesVariationsList.find((item) => {
            if (item && item.variationOptions) {
                if (item.variationOptions.length > 1) {
                    return false;
                }
            }
            return true;
        })
    }
    ngOnDestroy() {

    }
}
