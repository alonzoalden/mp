import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemPart, ItemSection } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { AppService } from '../../app.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-edit-part',
    templateUrl: './item-edit-part.component.html'
})

export class ItemEditPartComponent {

    constructor() { }
    
    // ngOnInit(): void {
    //     this.itemid = this.route.parent.snapshot.params['id'];

    //     this.appService.getCurrentMember()
    //             .subscribe(
    //                 (data) => {
    //                     this.appService.currentMember = data;
    //                     this.isPM = data.IsPM;
    //                 },
    //                 (error: any) => {
    //                     this.errorMessage = <any>error;
    //                 }
    //             );

    //     this.itemService.getCurrentItemEdit(this.itemid).subscribe(
    //         (item: Item) => {
    //             this.itemService.currentItemEdit = item;
    //             this.item = this.itemService.currentItemEdit;

    //             this.initialize();
    //         },
    //         (error: any) => this.errorMessage = <any>error
    //     );

    //     this.itemService.getPartItemList().subscribe(
    //         (itemlist: ItemList[]) => {
    //             this.itemlist = itemlist;
    //             const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
    //             this.itemlist.splice(0,0,_temp);
    //             this.refreshDataSource(this.currentItemSection.ItemParts);
    //         },
    //         (error: any) => this.errorMessage = <any>error
    //     );
    // }

    // initialize() {
    //     if (this.itemService.currentItemEdit.ItemSections === null) {
    //         this.itemService.getItemParts(this.itemid).subscribe(
    //             (itemParts: ItemPart[]) => {
    //                 this.currentItemSection.ItemParts = itemParts;                    
    //                 this.addPendingLine();         
    //                 this.currentIndex = this.item.ItemSections.length - 1;
    //                 this.refreshDataSource(this.currentItemSection.ItemParts);
    //             },
    //             (error: any) => this.errorMessage = <any>error
    //         );
    //     } else {
    //         this.removePendingLine();
    //         this.addPendingLine();               
    //         this.currentIndex = this.item.ItemSections.length - 1;
    //         this.refreshDataSource(this.currentItemSection.ItemParts);
    //     }
    // }

    // addPendingLine() {
    //     const _temp = new ItemPart(0, null, null, null, null, null, null, null, null, null, null, null, true, this.currentItemSection.ItemParts.length + 1, null, null, true, true);
        
    //     this.currentItemSection.ItemParts.push(_temp);
    // }

    // removePendingLine() {
    //     const foundIndex = this.item.ItemSections.findIndex(i => i.pendingAdd === true);
    //     if (foundIndex > -1) {
    //         this.item.ItemSections.splice(foundIndex, 1);
    //     }
    // }

    // refreshDataSource(itemParts: ItemPart[]) { 
    //     this.dataSource = new MatTableDataSource<ItemPart>(itemParts);
    // }

    // onAddItemPart(itemPart: ItemPart) {

    //     this.onChangeFOBPrice(itemPart);

    //     if (this.isRequirementValid(itemPart)) { 
    //         if(!this.existItemID(itemPart.ItemPartID, true)) {    
    //             this.pendingAdd = true; 

    //             if(itemPart.PartItemID && itemPart.PartItemID != 0)
    //             {
    //                 this.itemService.getItem(itemPart.PartItemID).subscribe(
    //                     (item: Item) => {
    //                         itemPart.PrevPartItemID = item.ItemID;
    //                     },
    //                     (error: any) => {
    //                         this.errorMessage = <any>error;
    //                         this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
    //                     }
    //                 );
    //             }

    //             itemPart.pendingAdd = false;
                
    //             this.addPendingLine();  
    //             this.refreshDataSource(this.currentItemSection.ItemParts);
    //         }
    //         else {
    //             this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Up-sell product already exists" });
    //         }   
    //     }
    //     else {
    //         this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
    //     }
    // }

    // isRequirementValid(itemPart: ItemPart): boolean {
    //     if (itemPart
    //         && itemPart.PartItemName
    //         && itemPart.PartItemVendorSKU
    //         && itemPart.PartFOBPrice) {
    //         return true;
    //     } 
    //     else {
    //         return false;
    //     }
    // }

    // existItemID(itemID: number, isNew: boolean = false){
    //     var counter: number = 0;
    //     this.currentItemSection.ItemParts.forEach((value, index) => {
    //             if(value.PartItemID === itemID) { 
    //                 if(isNew || index != this.currentItemSection.ItemParts.length - 1) {
    //                     counter += 1; 
    //                 }
    //             }
    //         }
    //     );
    //     if(counter > 1) { return true; }
    //     else { return false; }
    // }

    // existVendorSKU(vendorSKU: string, isNew: boolean = false){
    //     var counter: number = 0;
    //     this.currentItemSection.ItemParts.forEach((value, index) => {
    //             if(value.PartItemVendorSKU === vendorSKU) { 
    //                 if(isNew || index != this.currentItemSection.ItemParts.length - 1) {
    //                     counter += 1; 
    //                 }
    //             }
    //         }
    //     );
    //     if(counter > 1) { return true; }
    //     else { return false; }
    // }

    // onEditItemPart(index: number) {
    //     if(this.currentIndex != index)
    //     {
    //         this.currentItemSection.ItemParts.forEach((itempart, i) => {
                
    //             this.onChangeFOBPrice(itempart);

    //             if(i != this.currentItemSection.ItemParts.length - 1) {
    //                 if(!itempart.PartItemName || itempart.PartItemName == '' 
    //                     || !itempart.PartItemVendorSKU || itempart.PartItemVendorSKU == '' 
    //                     || !itempart.PartFOBPrice || itempart.PartFOBPrice == 0 ) {
    
    //                         this.currentItemSection.ItemParts.splice(i, 1);
    //                     this.refreshDataSource(this.currentItemSection.ItemParts);
    //                 }
    //             }
    //         });    
    //     }

    //     if(this.pendingAdd) {
    //         this.currentIndex = this.currentItemSection.ItemParts.length - 1;
    //         this.pendingAdd = false;
    //     }
    //     else {
    //         this.currentIndex = index;
    //     }    
    // }

    // onPartItemChange(index: number, itemPart: any) {          
    //     if(this.currentItemSection.ItemParts[index].PartItemID && this.currentItemSection.ItemParts[index].PartItemID != 0) {
    //         if(!this.existItemID(this.currentItemSection.ItemParts[index].PartItemID)) {
    //             if(this.currentItemSection.ItemParts[index].PartItemID && this.currentItemSection.ItemParts[index].PartItemID != 0)
    //             {
    //                 this.itemService.getItem(this.currentItemSection.ItemParts[index].PartItemID).subscribe(
    //                     (item: Item) => {
    //                         this.currentItemSection.ItemParts[index].PrevPartItemID = item.ItemID;
    //                         this.currentItemSection.ItemParts[index].PartItemName = item.Name;
    //                         this.currentItemSection.ItemParts[index].PartItemVendorSKU = item.VendorSKU;
    //                         this.currentItemSection.ItemParts[index].PartTPIN = item.TPIN;
    //                         this.currentItemSection.ItemParts[index].PartFOBPrice = item.FOBPrice;
    //                         this.currentItemSection.ItemParts[index].PartPrice = item.Price;

    //                         this.currentItemSection.ItemParts[index].ImageFilePath = item.ImagePath;
    //                         this.currentItemSection.ItemParts[index].IsNewImage = false;

    //                         this.refreshDataSource(this.currentItemSection.ItemParts);
    //                     },
    //                     (error: any) => {
    //                         this.errorMessage = <any>error;
    //                         this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
    //                     }
    //                 );
    //             }
    //         }
    //         else {
    //             //This prevents selected value from changing into an existing value
    //             var originalItem = this.selectionCategoriesRef._results[index].itemsList.items
    //                         .find(item => item.value.ItemID === this.currentItemSection.ItemParts[index].PrevPartItemID);
    //             this.selectionCategoriesRef._results[index].itemsList.select(originalItem);

    //             itemPart.PartItemName = originalItem.value.ItemName;
    //             itemPart.PartItemVendorSKU = originalItem.value.VendorSKU; 
    //             itemPart.PartTPIN = originalItem.value.TPIN;
    //             itemPart.PartFOBPrice = originalItem.value.FOBPrice;
    //             itemPart.PartPrice = originalItem.value.PartPrice;

    //             if (!this.currentItemSection.ItemParts[index].isNew) {
    //                 this.currentItemSection.ItemParts[index].PartItemID = this.currentItemSection.ItemParts[index].PrevPartItemID;
    //             }
    //             this.currentIndex = this.currentItemSection.ItemParts.length - 1;
    //             this.refreshDataSource(this.currentItemSection.ItemParts);
    //             this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Part already exists" });
    //         }
    //     }            
    //     else
    //     {
    //         this.currentItemSection.ItemParts[index].isNew = true;
            
    //         this.currentItemSection.ItemParts[index].PartItemName = null;
    //         this.currentItemSection.ItemParts[index].PartItemVendorSKU = null;
    //         this.currentItemSection.ItemParts[index].PartTPIN = null;
    //         this.currentItemSection.ItemParts[index].PartFOBPrice = null;
    //         this.currentItemSection.ItemParts[index].PartPrice = null;

    //         this.refreshDataSource(this.currentItemSection.ItemParts);
    //     }
    // }
    
    // clickIsNew(itemPart: ItemPart, index: number)
    // {
    //     itemPart.PartItemID = null;
    //     itemPart.PartItemName = null;
    //     itemPart.PartItemVendorSKU = null;
    //     itemPart.PartTPIN = null;
    //     itemPart.PartFOBPrice = null;
    //     itemPart.PartPrice = null;
    // }

    // moveDownPosition(itemPart: ItemPart) {
    //     this.positionMove(this.currentItemSection.ItemParts, itemPart, 1);
    //     this.currentItemSection.ItemParts.forEach((value, index) => {
    //         value.Position = index + 1;
    //     });

    //     this.refreshDataSource(this.currentItemSection.ItemParts);
    // }

    // moveUpPosition(itemPart: ItemPart) {
    //     this.positionMove(this.currentItemSection.ItemParts, itemPart, -1);
    //     this.currentItemSection.ItemParts.forEach((value, index) => {
    //         value.Position = index + 1;                        
    //     });

    //     this.refreshDataSource(this.currentItemSection.ItemParts);
    // }

    // positionMove(array, element, delta) {
    //     const index = array.indexOf(element);
    //     const newIndex = index + delta;
    //     if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
    //     const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
    //     array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    // }

    // onRemove(itemPart: ItemPart) {
    //     const confirmation = confirm(`Remove ${itemPart.PartItemName}?`);
    //     if (confirmation) {
    //         const foundIndex = this.currentItemSection.ItemParts.findIndex(i => i.PartItemID === itemPart.PartItemID);
    //         if (foundIndex > -1) {
    //             this.currentItemSection.ItemParts.splice(foundIndex, 1);
    //         }            
    //         this.refreshDataSource(this.currentItemSection.ItemParts);
    //     }
    // }
    // clearFields(ItemPartInsert: ItemPart) {
    //     ItemPartInsert.PartItemID = null;
    //     ItemPartInsert.PartFOBPrice = null;
    //     ItemPartInsert.PartPrice = null;
    //     ItemPartInsert.PartItemVendorSKU = null;
    //     ItemPartInsert.PartItemName = null;
    //     ItemPartInsert.isNew = null;
    //     ItemPartInsert.PartTPIN = null;
        
    //     this.formDirty = false;
    // }
    // overflowFix(bool: Boolean):void {
    //     let container = document.getElementsByClassName('ibox-content')[0];
    //     bool ? container.classList.add("overflow-visible") : container.classList.remove("overflow-visible");
    // }
    // setPlaceholderText(i: number, itemPart: any) {
    //     if (this.itemlist) {
    //         return i === this.currentItemSection.ItemParts.length-1
    //             ? 'Search Item'
    //             : itemPart.PartItemID
    //                 ? this.itemlist.find(item => itemPart.PartItemID === item.ItemID).Description
    //                 : 'New Item';
    //     }
    // }

    // fileChangeEvent(fileInput: any, itemPart: ItemPart) {
    //     // Clear Uploaded Files result message
    //     this.filesToUpload = <Array<File>>fileInput.target.files;
    //     for (let i = 0; i < this.filesToUpload.length; i++) {
    //         this.selectedFileNames.push(this.filesToUpload[i].name);
    //     }

    //     this.uploadFiles(itemPart);
    // }
    
    // uploadFiles(itemPart: ItemPart) {
    //     if (this.filesToUpload.length > 0) {
    //         this.pendingUpload = true;
    //         this.isLoadingData = true;
    //         const formData: FormData = new FormData();
    //         for (let i = 0; i < this.filesToUpload.length; i++) {
    //             var reader = new FileReader();
    //             formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
    //         }

    //         this.itemService.uploadTempImage(this.newGuid(), formData)
    //             .subscribe (
    //                 (data: string) => {
    //                     this.pendingUpload = false;
    //                     itemPart.ImageRaw = data;
    //                     itemPart.IsNewImage = true;
    //                 },
    //                 err => {
    //                     this.pendingUpload = false;
    //                     this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                     this.isLoadingData = false;
    //                     this.filesToUpload = [];
    //                     this.selectedFileNames = [];
    //                 },
    //                 () => {
    //                     this.pendingUpload = false;
    //                     this.isLoadingData = false;
    //                     this.filesToUpload = [];
    //                     this.selectedFileNames = [];
    //                 }
    //             );
    //     }
    // }

    // partFileChangeEvent(fileInput: any, item: Item) {
    //     // Clear Uploaded Files result message
    //     this.partFilesToUpload = <Array<File>>fileInput.target.files;
    //     for (let i = 0; i < this.partFilesToUpload.length; i++) {
    //         this.partSelectedFileNames.push(this.partFilesToUpload[i].name);
    //     }

    //     this.partUploadFiles(item);
    // }
    
    // partUploadFiles(item: Item) {
    //     if (this.partFilesToUpload.length > 0) {
    //         this.partPendingUpload = true;
    //         this.isLoadingData = true;
    //         const formData: FormData = new FormData();
    //         for (let i = 0; i < this.partFilesToUpload.length; i++) {
    //             var reader = new FileReader();
    //             formData.append('partUploadedFiles', this.partFilesToUpload[i], this.partFilesToUpload[i].name);
    //         }

    //         this.itemService.uploadTempImage(this.newGuid(), formData)
    //             .subscribe (
    //                 (data: string) => {
    //                     this.partPendingUpload = false;
    //                     item.PartImageRaw = data;
    //                     item.PartIsNewImage = true;                                                
    //                 },
    //                 err => {
    //                     this.partPendingUpload = false;
    //                     this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                     this.isLoadingData = false;
    //                     this.partFilesToUpload = [];
    //                     this.partSelectedFileNames = [];
    //                 },
    //                 () => {
    //                     this.partPendingUpload = false;
    //                     this.isLoadingData = false;
    //                     this.partFilesToUpload = [];
    //                     this.partSelectedFileNames = [];
    //                 }
    //             );
    //     }
    // }

    // onChangeFOBPrice(itemPart: ItemPart)
    // {

    //     if(itemPart.PartFOBPrice) {
    //         itemPart.PartFOBPrice = Number(itemPart.PartFOBPrice.toFixed(2));
    //     }
        
    //     if(itemPart.PartPrice)
    //     {
    //         if(itemPart.PartPrice <= 0) {                
    //             itemPart.PartPrice = itemPart.PartFOBPrice * 3;    
    //             itemPart.PartPrice = Number(itemPart.PartPrice.toFixed(2));                 
    //         }                    
    //     }
    //     else {
    //         itemPart.PartPrice = itemPart.PartFOBPrice * 3;    
    //         itemPart.PartPrice = Number(itemPart.PartPrice.toFixed(2));  
    //     }
    // }

    // newGuid() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //         const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
    //         return v.toString(16);
    //     });
    // }
}

