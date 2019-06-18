import { Component, OnInit, Inject } from '@angular/core';
import { FakeItemInsert, ItemInsert, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';

@Component({
    selector: 'item-variation.component-dialog',
    templateUrl: 'item-variation.component-dialog.html',
})
export class ItemVariationComponentDialog implements OnInit {
    
    tabsListData: any[];


    oldDefault: any = {};
    
    tabsList: any[] = [];
    updatedListData: any[];

    newTab: any;
    // selectedProperties: any = {};
    // selectedAttributes: any;

    newTabVariations: any = [];


    tabName: any[] = [];
    tabProperties: any[] = [];

    tempPropertyName: any = '';
    showInput = false;

    tabsListTest: any;
    addItemVariationInvalid: any = true;

    showDefaultSettingsSelection: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ItemVariationComponentDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        
        }
    ngOnInit() {

        this.itemService.getGlobalAttributesVariations();

        this.itemService.globalProductVariationsList
                        .subscribe((tabListData) => {
                            this.tabsListData = tabListData;
                        });
        //this.tabsList = this.data.itemVariationData;
        //this.tabsListData = this.data.updatedListData;
    }



    canShowDefaultOldSettingsInput(tabname) {
        if (this.data && this.data.updatedListData) {
            var item = this.data.updatedListData.find((x) => x.name === tabname);
            if (item && this.data.updatedListData && this.data.updatedListData.length > 0) {
                return true;
            } 
            else {
                return false;
            }
        }
        
    }

    // onAddTabProperty(tabName): void {
    //     this.addTabProperty(tabName);
    // }
    // addTabProperty(tabName: any) {
    //     // if (tabName) {
    //     //     const tab = this.tabsList.find(x => x.name === tabName)
    //     //     console.log(tab);
    //     //     tab.properties.push(this.tempPropertyName);
    //     //     this.tempPropertyName = '';
    //     //     this.showInput = false;
    //     // } 
    //     // else {
            
    //         this.newTabVariations.push({});
            
    //     //}
    // }
    createTab() {
        
        const tab = this.tabsListData.find(x => x.name === this.newTab.name);
        this.tabsList.push(tab);
        console.log(this.tabsList);
        if (tab.name){
            const index = this.tabsListData.map((item) => item.name).indexOf(tab.name)
        
            //THIS IS THE LOGIC TO CLEAN UP THE this.tabsListData
            this.updatedListData = [...this.tabsListData];
            this.updatedListData.splice(index, 1)
            this.tabsListData = this.updatedListData;
        }
        
        this.clearNewTabFields();
        this.validateItemVariation();
    }

    clearNewTabFields() {    
        this.newTab = null;
    }
    
    onCancelClick(): void {
        this.dialogRef.close();
    }


    onAddItemVariationClick() {
        
        //const data = {
            //tabsList: this.tabsList,
            // updatedListData: this.updatedListData,
            // oldDefault: this.oldDefault
        //};
        
        var itemVariation = {
            
            // VariationID:
            // AttributeID:
        }

        this.itemService.addItemVariation(this.tabsList, )
            
        this.dialogRef.close();
    }
    onUpdateOldDefault(tabname) {
        this.oldDefault.name = tabname;
    }
    onNgModelChange(e) {
        //console.log(e);
        this.validateItemVariation();
    }

    validateItemVariation() {
        this.addItemVariationInvalid = !!this.tabsList.find((item) => {
            if (item && item.selectedProperties) {
                if (item.selectedProperties.length > 1) {
                    return false;
                }
            }
            return true;
        })
    }
    ngOnDestroy() {

    }
}
