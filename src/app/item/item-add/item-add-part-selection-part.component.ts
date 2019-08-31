import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Item, ItemInsert, ItemList, ItemPartInsert, ItemPartSelectionInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

import { AppService } from '../../app.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-add-part-selection-part',
    templateUrl: './item-add-part-selection-part.component.html'
})

export class ItemAddPartSelectionPartComponent implements OnInit {
    private imageURL = environment.imageURL;
    isPM: boolean;
    
    errorMessage: string;
    item: ItemInsert;

    itemlist: ItemList[];    
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'New', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail','ItemName', 'Remove'];
    partGroups: ItemPartSelectionInsert[] = [];
    currentItemPartSelection: ItemPartSelectionInsert;

    dataSource: any = null;
    dataSourceGroups: any = null;

    pendingAdd: boolean;

    currentIndex: number;
    currentIndexGroup: number;


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



        

        //this.refreshDataSource(this.currentItemPartSelection.ItemParts.ItemParts);


        if(this.currentItemPartSelection.ItemParts.length === 0) {
            const _temp = new ItemPartInsert(null, null, null, null, null, null, null, null, null, null,  null, true, null, true);
            this.currentItemPartSelection.ItemParts.push(_temp);
            //

            const _tempGroupInsert = new ItemPartSelectionInsert(null, null, null, null, null,null, null,  null, true, null, []);
            this.partGroups.push(_tempGroupInsert);
            
            this.dataSourceGroups = new MatTableDataSource<ItemPartSelectionInsert>(this.partGroups);


        }
        

        this.currentIndex = this.currentItemPartSelection.ItemParts.length - 1;
        this.currentIndexGroup = this.partGroups.length - 1;


        

        //make this based off group
        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null);
                this.itemlist.splice(0,0,_temp);

                //this.refreshDataSource(this.currentItemPartSelection.ItemParts.ItemParts);
            },
            (error: any) => this.errorMessage = <any>error
        );        
    }

    refreshDataSource(itemParts: ItemPartInsert[]) { 
        console.log(itemParts);
        this.dataSource = new MatTableDataSource<ItemPartInsert>(itemParts);
    }
    refreshDataSourceGroups(partgroups: ItemPartSelectionInsert[]) { 
        this.dataSourceGroups = new MatTableDataSource<ItemPartSelectionInsert>(partgroups);
    }
    

    
    onAddItemPartGroup(group: ItemPartSelectionInsert) {
        const _temp = new ItemPartInsert(null, null, null, null, null, null, null, null, null, null,  null, true, null, true);
        group.ItemParts.push(_temp)
        this.currentItemPartSelection = group;
        this.refreshDataSource(this.currentItemPartSelection.ItemParts);

        const _tempGroupInsert = new ItemPartSelectionInsert(null, null, null, null, null,null, null,  null, true, null, []);
        console.log(this.partGroups);
        this.partGroups.push(_tempGroupInsert);
        this.refreshDataSourceGroups(this.partGroups)
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
                
                const _temp = new ItemPartInsert(0, null, null, null, null, null, null, null, null, null, null, true, this.currentItemPartSelection.ItemParts.length + 1, true);
                this.currentItemPartSelection.ItemParts.push(_temp);
                this.refreshDataSource(this.currentItemPartSelection.ItemParts);
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
        this.currentItemPartSelection.ItemParts.forEach((value, index) => {
                if(value.PartItemID === itemID) { 
                    if(isNew || index != this.currentItemPartSelection.ItemParts.length - 1) {
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
        this.currentItemPartSelection.ItemParts.forEach((value, index) => {
                if(value.PartItemVendorSKU === vendorSKU) { 
                    if(isNew || index != this.currentItemPartSelection.ItemParts.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }


    onEditItemPartGroup(index: number) {
        
        this.currentItemPartSelection = this.partGroups[index];

        this.refreshDataSource(this.currentItemPartSelection.ItemParts)

        if (index === this.partGroups.length - 1 && this.partGroups.length > 0) {
            this.dataSource = null;
            this.currentItemPartSelection.ItemParts = null;
        }
        else {
            
        }
        console.log(this.currentItemPartSelection.ItemParts)
       

        if(this.pendingAdd) {
            this.currentIndexGroup = this.partGroups.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndexGroup = index;
        }    
    }

    onEditItemPart(index: number) {
        if(this.currentIndex != index)
        {
            this.currentItemPartSelection.ItemParts.forEach((itempart, i) => {

                this.onChangeFOBPrice(itempart);
                
                if(i != this.currentItemPartSelection.ItemParts.length - 1) {
                    if(!itempart.PartItemName || itempart.PartItemName == '' 
                        || !itempart.PartItemVendorSKU || itempart.PartItemVendorSKU == '' 
                        || !itempart.PartFOBPrice || itempart.PartFOBPrice == 0 ) {
    
                        this.currentItemPartSelection.ItemParts.splice(i, 1);
                        this.refreshDataSource(this.currentItemPartSelection.ItemParts);
                    }
                }
            });    
        }

        if(this.pendingAdd) {
            this.currentIndex = this.currentItemPartSelection.ItemParts.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }    
    }

    onPartItemChange(index: number, itemPart: any) {  
        if(this.currentItemPartSelection.ItemParts[index].PartItemID && this.currentItemPartSelection.ItemParts[index].PartItemID != 0) {
            if(!this.existItemID(this.currentItemPartSelection.ItemParts[index].PartItemID)) {
                if(this.currentItemPartSelection.ItemParts[index].PartItemID && this.currentItemPartSelection.ItemParts[index].PartItemID != 0)
                {
                    this.itemService.getItem(this.currentItemPartSelection.ItemParts[index].PartItemID).subscribe(
                        (item: Item) => {
                            this.currentItemPartSelection.ItemParts[index].PrevPartItemID = item.ItemID;
                            this.currentItemPartSelection.ItemParts[index].PartItemName = item.Name;
                            this.currentItemPartSelection.ItemParts[index].PartItemVendorSKU = item.VendorSKU;
                            this.currentItemPartSelection.ItemParts[index].PartTPIN = item.TPIN;
                            this.currentItemPartSelection.ItemParts[index].PartFOBPrice = item.FOBPrice;
                            this.currentItemPartSelection.ItemParts[index].PartPrice = item.Price;

                            this.currentItemPartSelection.ItemParts[index].ImageFilePath = item.ImagePath;
                            this.currentItemPartSelection.ItemParts[index].IsNewImage = false;

                            this.refreshDataSource(this.currentItemPartSelection.ItemParts);
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
                            .find(item => item.value.ItemID === this.currentItemPartSelection.ItemParts[index].PrevPartItemID);
                this.selectionCategoriesRef._results[index].itemsList.select(originalItem);

                itemPart.PartItemName = originalItem.value.ItemName;
                itemPart.PartItemVendorSKU = originalItem.value.VendorSKU; 
                itemPart.PartTPIN = originalItem.value.TPIN;
                itemPart.PartFOBPrice = originalItem.value.FOBPrice;
                itemPart.PartPrice = originalItem.value.PartPrice;

                if (!this.currentItemPartSelection.ItemParts[index].isNew) {
                    this.currentItemPartSelection.ItemParts[index].PartItemID = this.currentItemPartSelection.ItemParts[index].PrevPartItemID;
                }
                this.currentIndex = this.currentItemPartSelection.ItemParts.length - 1;
                this.refreshDataSource(this.currentItemPartSelection.ItemParts);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Part already exists" });
            }
        }
        else
        {
            this.currentItemPartSelection.ItemParts[index].isNew = true;
            
            this.currentItemPartSelection.ItemParts[index].PartItemName = null;
            this.currentItemPartSelection.ItemParts[index].PartItemVendorSKU = null;
            this.currentItemPartSelection.ItemParts[index].PartTPIN = null;
            this.currentItemPartSelection.ItemParts[index].PartFOBPrice = null;
            this.currentItemPartSelection.ItemParts[index].PartPrice = null;
            
            this.refreshDataSource(this.currentItemPartSelection.ItemParts);
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
        this.positionMove(this.currentItemPartSelection.ItemParts, itemPart, 1);
        this.currentItemPartSelection.ItemParts.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.currentItemPartSelection.ItemParts);
    }

    moveUpPosition(itemPart: ItemPartInsert) {
        this.positionMove(this.currentItemPartSelection.ItemParts, itemPart, -1);
        this.currentItemPartSelection.ItemParts.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.refreshDataSource(this.currentItemPartSelection.ItemParts);
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
            const foundIndex = this.currentItemPartSelection.ItemParts.findIndex(i => i.PartItemID === itemPart.PartItemID);
            if (foundIndex > -1) {
                this.currentItemPartSelection.ItemParts.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.currentItemPartSelection.ItemParts);
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
            return i === this.currentItemPartSelection.ItemParts.length-1
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
}