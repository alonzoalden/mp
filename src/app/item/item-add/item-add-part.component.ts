import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemInsert, ItemList, ItemPartInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { NgSelectComponent } from '@ng-select/ng-select';

import { AppService } from '../../app.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-add-part',
    templateUrl: './item-add-part.component.html'
})

export class ItemAddPartComponent implements OnInit {
    private imageURL = environment.imageURL;
    isPM: boolean;
    
    errorMessage: string;
    item: ItemInsert;

    itemlist: ItemList[];    
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'New', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    dataSource: any = null;
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;

    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    res: Array<string>;
    pendingUpload: boolean;

    partFilesToUpload: Array<File> = [];
    partSelectedFileNames: string[] = [];
    partPendingUpload: boolean;

    public isLoadingData: Boolean = false;

    @ViewChildren('selectionCategoriesRef') selectionCategoriesRef: any;

    constructor(private router: Router, private itemService: ItemService, private appService: AppService) { }

    ngOnInit() {
        this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.appService.currentMember = data;
                        this.isPM = data.IsPM;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                    }
                );

        this.item = this.itemService.currentItemInsert;

        if(this.item.ItemParts.length === 0) {
            const _temp = new ItemPartInsert(null, null, null, null, null, null, null, null, null, null,  null, true, null, true);
            this.item.ItemParts.push(_temp);
        }

        this.currentIndex = this.item.ItemParts.length - 1;

        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
                this.itemlist.splice(0,0,_temp);

                this.refreshDataSource(this.item.ItemParts);
            },
            (error: any) => this.errorMessage = <any>error
        );        
    }

    refreshDataSource(itemParts: ItemPartInsert[]) { 
        this.dataSource = new MatTableDataSource<ItemPartInsert>(itemParts);
    }

    onAddItemPart(itemPart: ItemPartInsert) {
        
        this.onChangeFOBPrice(itemPart);

        if (this.isRequirementValid(itemPart)) { 
            if(!this.existVendorSKU(itemPart.PartItemVendorSKU, true)) {        
                this.pendingAdd = true;

                if(itemPart.PartItemID && itemPart.PartItemID != 0)
                {
                    this.itemService.getItem(itemPart.PartItemID).subscribe(
                        (item: Item) => {
                            itemPart.PrevPartItemID = item.ItemID;
                        },
                        (error: any) => {
                            this.errorMessage = <any>error;
                            this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                        }
                    );
                }
                
                const _temp = new ItemPartInsert(0, null, null, null, null, null, null, null, null, null, null, true, this.item.ItemParts.length + 1, true);
                this.item.ItemParts.push(_temp);
                this.refreshDataSource(this.item.ItemParts);
            }
            else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Part already exists" });
            }   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
        }
    }

    isRequirementValid(itemPart: ItemPartInsert): boolean {
        if (itemPart
            && itemPart.PartItemName
            && itemPart.PartItemVendorSKU
            && itemPart.PartFOBPrice) {
            return true;
        } 
        else {
            return false;
        }
    }

    existItemID(itemID: number, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemParts.forEach((value, index) => {
                if(value.PartItemID === itemID) { 
                    if(isNew || index != this.item.ItemParts.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    existVendorSKU(vendorSKU: string, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemParts.forEach((value, index) => {
                if(value.PartItemVendorSKU === vendorSKU) { 
                    if(isNew || index != this.item.ItemParts.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    onEditItemPart(index: number) {
        if(this.currentIndex != index)
        {
            this.item.ItemParts.forEach((itempart, i) => {

                this.onChangeFOBPrice(itempart);
                
                if(i != this.item.ItemParts.length - 1) {
                    if(!itempart.PartItemName || itempart.PartItemName == '' 
                        || !itempart.PartItemVendorSKU || itempart.PartItemVendorSKU == '' 
                        || !itempart.PartFOBPrice || itempart.PartFOBPrice == 0 ) {
    
                        this.item.ItemParts.splice(i, 1);
                        this.refreshDataSource(this.item.ItemParts);
                    }
                }
            });    
        }

        if(this.pendingAdd) {
            this.currentIndex = this.item.ItemParts.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }    
    }

    onPartItemChange(index: number, itemPart: any) {  
        if(this.item.ItemParts[index].PartItemID && this.item.ItemParts[index].PartItemID != 0) {
            if(!this.existItemID(this.item.ItemParts[index].PartItemID)) {
                if(this.item.ItemParts[index].PartItemID && this.item.ItemParts[index].PartItemID != 0)
                {
                    this.itemService.getItem(this.item.ItemParts[index].PartItemID).subscribe(
                        (item: Item) => {
                            this.item.ItemParts[index].PrevPartItemID = item.ItemID;
                            this.item.ItemParts[index].PartItemName = item.Name;
                            this.item.ItemParts[index].PartItemVendorSKU = item.VendorSKU;
                            this.item.ItemParts[index].PartTPIN = item.TPIN;
                            this.item.ItemParts[index].PartFOBPrice = item.FOBPrice;
                            this.item.ItemParts[index].PartPrice = item.Price;

                            this.item.ItemParts[index].ImageFilePath = item.ImagePath;
                            this.item.ItemParts[index].IsNewImage = false;

                            this.refreshDataSource(this.item.ItemParts);
                        },
                        (error: any) => {
                            this.errorMessage = <any>error;
                            this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                        }
                    );
                }                
            }
            else {
                //This prevents select input value from changing into an existing value
                var originalItem = this.selectionCategoriesRef._results[index].itemsList.items
                            .find(item => item.value.ItemID === this.item.ItemParts[index].PrevPartItemID);
                this.selectionCategoriesRef._results[index].itemsList.select(originalItem);

                itemPart.PartItemName = originalItem.value.ItemName;
                itemPart.PartItemVendorSKU = originalItem.value.VendorSKU; 
                itemPart.PartTPIN = originalItem.value.TPIN;
                itemPart.PartFOBPrice = originalItem.value.FOBPrice;
                itemPart.PartPrice = originalItem.value.PartPrice;

                if (!this.item.ItemParts[index].isNew) {
                    this.item.ItemParts[index].PartItemID = this.item.ItemParts[index].PrevPartItemID;
                }
                this.currentIndex = this.item.ItemParts.length - 1;
                this.refreshDataSource(this.item.ItemParts);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Part already exists" });
            }
        }
        else
        {
            this.item.ItemParts[index].isNew = true;
            
            this.item.ItemParts[index].PartItemName = null;
            this.item.ItemParts[index].PartItemVendorSKU = null;
            this.item.ItemParts[index].PartTPIN = null;
            this.item.ItemParts[index].PartFOBPrice = null;
            this.item.ItemParts[index].PartPrice = null;
            
            this.refreshDataSource(this.item.ItemParts);
        }
    }

    clickIsNew(itemPart: ItemPartInsert, index: number)
    {
        itemPart.PartItemID = null;
        itemPart.PartItemName = null;
        itemPart.PartItemVendorSKU = null;
        itemPart.PartTPIN = null;
        itemPart.PartFOBPrice = null;
        itemPart.PartPrice = null;
    }

    moveDownPosition(itemPart: ItemPartInsert) {
        this.positionMove(this.item.ItemParts, itemPart, 1);
        this.item.ItemParts.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemParts);
    }

    moveUpPosition(itemPart: ItemPartInsert) {
        this.positionMove(this.item.ItemParts, itemPart, -1);
        this.item.ItemParts.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.refreshDataSource(this.item.ItemParts);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemove(itemPart: ItemPartInsert) {
        const confirmation = confirm(`Remove ${itemPart.PartItemName}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemParts.findIndex(i => i.PartItemID === itemPart.PartItemID);
            if (foundIndex > -1) {
                this.item.ItemParts.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemParts);
        }
    }
    clearFields(ItemPartInsert: ItemPartInsert) {
        ItemPartInsert.PartItemID = null;
        ItemPartInsert.PartFOBPrice = null;
        ItemPartInsert.PartPrice = null;
        ItemPartInsert.PartItemVendorSKU = null;
        ItemPartInsert.PartItemName = null;
        ItemPartInsert.isNew = null;
        ItemPartInsert.PartTPIN = null;
        this.formDirty = false;
    }
    overflowFix(bool: Boolean):void {
        let container = document.getElementsByClassName('ibox-content')[0];
        bool ? container.classList.add("overflow-visible") : container.classList.remove("overflow-visible");
    }
    setPlaceholderText(i: number, itemPart: ItemPartInsert) {
        if (this.itemlist) {
            return i === this.item.ItemParts.length-1
                ? 'Search Item'
                : itemPart.PartItemID
                    ? this.itemlist.find(item => itemPart.PartItemID === item.ItemID).Description
                    : 'New Item'
        }
    }


    fileChangeEvent(fileInput: any, itemPart: ItemPartInsert) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }

        this.uploadFiles(itemPart);
    }
    
    uploadFiles(itemPart: ItemPartInsert) {
        if (this.filesToUpload.length > 0) {
            this.pendingUpload = true;
            this.isLoadingData = true;
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                var reader = new FileReader();
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }

            this.itemService.uploadTempImage(this.newGuid(), formData)
                .subscribe (
                    (data: string) => {
                        this.pendingUpload = false;
                        itemPart.ImageRaw = data;
                        itemPart.IsNewImage = true;
                    },
                    err => {
                        this.pendingUpload = false;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                        this.isLoadingData = false;
                        this.filesToUpload = [];
                        this.selectedFileNames = [];
                    },
                    () => {
                        this.pendingUpload = false;
                        this.isLoadingData = false;
                        this.filesToUpload = [];
                        this.selectedFileNames = [];
                    }
                );
        }
    }

    partFileChangeEvent(fileInput: any, item: ItemInsert) {
        // Clear Uploaded Files result message
        this.partFilesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.partFilesToUpload.length; i++) {
            this.partSelectedFileNames.push(this.partFilesToUpload[i].name);
        }

        this.partUploadFiles(item);
    }
    
    partUploadFiles(item: ItemInsert) {
        if (this.partFilesToUpload.length > 0) {
            this.partPendingUpload = true;
            this.isLoadingData = true;
            const formData: FormData = new FormData();
            for (let i = 0; i < this.partFilesToUpload.length; i++) {
                var reader = new FileReader();
                formData.append('partUploadedFiles', this.partFilesToUpload[i], this.partFilesToUpload[i].name);
            }

            this.itemService.uploadTempImage(this.newGuid(), formData)
                .subscribe (
                    (data: string) => {
                        this.partPendingUpload = false;
                        item.PartImageRaw = data;
                        item.PartIsNewImage = true;                                                
                    },
                    err => {
                        this.partPendingUpload = false;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                        this.isLoadingData = false;
                        this.partFilesToUpload = [];
                        this.partSelectedFileNames = [];
                    },
                    () => {
                        this.partPendingUpload = false;
                        this.isLoadingData = false;
                        this.partFilesToUpload = [];
                        this.partSelectedFileNames = [];
                    }
                );
        }
    }

    onChangeFOBPrice(itemPart: ItemPartInsert)
    {
        if(itemPart.PartFOBPrice) {
            itemPart.PartFOBPrice = Number(itemPart.PartFOBPrice.toFixed(2));
        }

        if(itemPart.PartPrice)
        {
            if(itemPart.PartPrice <= 0) {
                itemPart.PartPrice = itemPart.PartFOBPrice * 3;    
                itemPart.PartPrice = Number(itemPart.PartPrice.toFixed(2));                 
            }                    
        }
        else {
            itemPart.PartPrice = itemPart.PartFOBPrice * 3;    
            itemPart.PartPrice = Number(itemPart.PartPrice.toFixed(2));  
        }
          
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }

    test() {
        console.log(this.item);
    }
}

