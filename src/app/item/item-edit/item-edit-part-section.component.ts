import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemInsert, ItemList, ItemPartInsert, ItemSectionInsert, ItemSection, ItemPart } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { AppService } from '../../app.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-edit-part-section',
    templateUrl: './item-edit-part-section.component.html'
})

export class ItemEditPartSectionComponent implements OnInit {
    private imageURL = environment.imageURL;
    isPM: boolean;
    
    errorMessage: string;
    item: Item;

    itemlist: ItemList[];    
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'New', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail','ItemName', 'Remove'];
    //partGroups: ItemSectionInsert[] = [];
        

    dataSource: any = null;

    pendingAdd: boolean;
    pendingChange: boolean;
    currentIndex: number;

    itemid: number;

    //currentItemSection: ItemSection;
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

    constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private appService: AppService) { }
    ngOnInit(): void {
        this.itemid = this.route.parent.snapshot.params['id'];

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

        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;

                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
                this.itemlist.splice(0,0,_temp);
                this.refreshDataSource(this.item.ItemSections);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemSections === null) {
            this.itemService.getItemParts(this.itemid).subscribe(
                (itemParts: ItemPart[]) => {
                    // this.item.ItemSections.ItemParts = itemParts;                    
                    // this.addPendingLine();
                    console.log(itemParts);
                    this.currentIndex = this.item.ItemSections.length - 1;
                    this.refreshDataSource(this.item.ItemSections);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.removePendingLine();
            this.addPendingLine();               
            this.currentIndex = this.item.ItemSections.length - 1;
            this.refreshDataSource(this.item.ItemSections);
        }
    }

    addPendingLine() {
        const _temp = new ItemSection(0, null, null, null, null, this.item.ItemSections.length + 1,  null,  null, [],  false, true);
        
        this.item.ItemSections.push(_temp);
    }

    removePendingLine() {
        const foundIndex = this.item.ItemSections.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemSections.splice(foundIndex, 1);
        }
    }

    refreshDataSource(itemsections: ItemSection[]) { 
        this.dataSource = new MatTableDataSource<ItemSection>(itemsections);
    }

    onAddItemPart(itemPart: ItemPart) {

        //this.onChangeFOBPrice(itemPart);

        if (this.isRequirementValid(itemPart)) { 
            if(!this.existItemID(itemPart.ItemPartID, true)) {    
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

                itemPart.pendingAdd = false;
                
                this.addPendingLine();  
                this.refreshDataSource(this.item.ItemSections);
            }
            else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Up-sell product already exists" });
            }   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
        }
    }

    isRequirementValid(itemPart: ItemPart): boolean {
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
        this.item.ItemSections.forEach((value, index) => {
                if(value.ItemID === itemID) { 
                    if(isNew || index != this.item.ItemSections.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    // existVendorSKU(vendorSKU: string, isNew: boolean = false){
    //     var counter: number = 0;
    //     this.item.ItemSections.forEach((value, index) => {
    //             if(value.PartItemVendorSKU === vendorSKU) { 
    //                 if(isNew || index != this.item.ItemSections.length - 1) {
    //                     counter += 1; 
    //                 }
    //             }
    //         }
    //     );
    //     if(counter > 1) { return true; }
    //     else { return false; }
    // }

    onEditItemPartGroup(index: number) {
        
        //this.selectedPartGroup = this.partGroups[index];
        if (index !== this.item.ItemSections.length - 1) {
            this.itemService.currentItemPartSelection.next(this.item.ItemSections[index]);
        }
        else {
            this.itemService.currentItemPartSelection.next(null);
        }

        this.refreshDataSource(this.item.ItemSections)

        // if (index === this.item.ItemPartSelections.length - 1 && this.item.ItemPartSelections.length > 0) {
        //     this.dataSource = null;
        //     this.item.ItemPartSelections = null;
        // }
        // else {
            
        // }
        //console.log(this.item.ItemPartSelections)
       

        if(this.pendingAdd) {
            //this.currentIndex = this.item.ItemPartSelections.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }    
    }
    
    onEditItemPart(index: number) {
        if(this.currentIndex != index)
        {
            this.item.ItemSections.forEach((itempart, i) => {
                
                //this.onChangeFOBPrice(itempart);

                if(i != this.item.ItemSections.length - 1) {
                    if(!itempart.Name || itempart.Name == '' ) {
    
                        this.item.ItemSections.splice(i, 1);
                        this.refreshDataSource(this.item.ItemSections);
                    }
                }
            });    
        }

        if(this.pendingAdd) {
            this.currentIndex = this.item.ItemSections.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }    
    }

    // onPartItemChange(index: number, itemPart: any) {          
    //     if(this.currentItemSection.ItemParts[index].PartItemID && this.currentItemSection.ItemParts[index].PartItemID != 0) {
    //         if(!this.existItemID(this.currentItemSection.ItemParts[index].PartItemID)) {
    //             if(this.currentItemSection.ItemParts[index].PartItemID && this.currentItemSection.ItemParts[index].PartItemID != 0)
    //             {
    //                 this.itemService.getItem(this.currentItemSection.ItemParts[index].PartItemID).subscribe(
    //                     (item: Item) => {
    //                         this.item.ItemSections[index].PrevPartItemID = item.ItemID;
    //                         this.item.ItemSections[index].PartItemName = item.Name;
    //                         this.item.ItemSections[index].PartItemVendorSKU = item.VendorSKU;
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
    //                 );this.item.ItemSections
    //             }
    //         }
    //         else {
    //             //This prevents selected value from changing into an existing value
    //             var originalItem = this.selectionCategoriesRef._results[index].itemsList.items
    //                         .find(item => item.value.ItemID === this.currentItemSection.ItemParts[index].PrevPartItemID);
    //             this.selectionCategoriesRef._results[index].itemsList.select(originalItem);

                
    //             // itemPart.PartItemName = originalItem.value.ItemName;
    //             // itemPart.PartItemVendorSKU = originalItem.value.VendorSKU; 
    //             // itemPart.PartTPIN = originalItem.value.TPIN;
    //             // itemPart.PartFOBPrice = originalItem.value.FOBPrice;
    //             // itemPart.PartPrice = originalItem.value.PartPrice;

    //             // if (!this.item.ItemSections[index].isNew) {
    //             //     this.item.ItemSections[index].ItemID = this.item.ItemSections[index].P;
    //             // }
    //             this.currentIndex = this.item.ItemSections.length - 1;
    //             this.refreshDataSource(this.item.ItemSections);
    //             this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Part already exists" });
    //         }
    //     }            
    //     else
    //     {
    //         this.item.ItemSections[index].isNew = true;
    //         this.item.ItemSections[index].Name = null;
    //         this.item.ItemSections[index].ImageFilePath = null;
    //         this.item.ItemSections[index].ImageRaw = null;

    //         this.refreshDataSource(this.item.ItemSections);
    //     }
    // }
    
    clickIsNew(itemPart: ItemPart, index: number)
    {
        itemPart.PartItemID = null;
        itemPart.PartItemName = null;
        itemPart.PartItemVendorSKU = null;
        itemPart.PartTPIN = null;
        itemPart.PartFOBPrice = null;
        itemPart.PartPrice = null;
    }

    moveDownPosition(itemPart: ItemPart) {
        this.positionMove(this.item.ItemSections, itemPart, 1);
        this.item.ItemSections.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemSections);
    }

    moveUpPosition(itemPart: ItemPart) {
        this.positionMove(this.item.ItemSections, itemPart, -1);
        this.item.ItemSections.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.refreshDataSource(this.item.ItemSections);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemove(itemPart: ItemPart) {
        const confirmation = confirm(`Remove ${itemPart.PartItemName}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemSections.findIndex(i => i.ItemSectionID === itemPart.ItemSectionID);
            if (foundIndex > -1) {
                this.item.ItemSections.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemSections);
        }
    }
    clearFields(ItemPartInsert: ItemPart) {
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
    setPlaceholderText(i: number, itemPart: any) {
        if (this.itemlist) {
            return i === this.item.ItemSections.length-1
                ? 'Search Item'
                : itemPart.PartItemID
                    ? this.itemlist.find(item => itemPart.PartItemID === item.ItemID).Description
                    : 'New Item';
        }
    }

    fileChangeEvent(fileInput: any, itemPart: ItemPart) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }

        this.uploadFiles(itemPart);
    }
    
    uploadFiles(itemPart: ItemPart) {
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

    partFileChangeEvent(fileInput: any, item: Item) {
        // Clear Uploaded Files result message
        this.partFilesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.partFilesToUpload.length; i++) {
            this.partSelectedFileNames.push(this.partFilesToUpload[i].name);
        }

        this.partUploadFiles(item);
    }
    
    partUploadFiles(item: Item) {
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

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}