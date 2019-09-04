import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemInsert, ItemList, ItemPartInsert, ItemSectionInsert, ItemSection } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { AppService } from '../../app.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-add-part-section',
    templateUrl: './item-add-part-section.component.html'
})

export class ItemAddPartSectionComponent implements OnInit {
    private imageURL = environment.imageURL;
    isPM: boolean;
    
    errorMessage: string;
    item: ItemInsert;

    itemlist: ItemList[];    
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'New', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail','ItemName', 'Remove'];
    partGroups: ItemSectionInsert[] = [];
        
    
    


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



        

        //this.refreshDataSource(this.selectedPartGroup.ItemParts);


        if(this.item.ItemSections.length === 0) {
            const _temp = new ItemSectionInsert(null, null, null, null, null, []);
            this.item.ItemSections.push(_temp);
            //

            // const _tempGroupInsert = new ItemPartSelectionInsert(null, null, null, null, null,null, null,  null, true, null, []);
            // this.partGroups.push(_tempGroupInsert);
            
            this.dataSource = new MatTableDataSource<ItemSectionInsert>(this.item.ItemSections);
        }
        

        this.currentIndex = this.item.ItemSections.length - 1;
        //this.currentIndexGroup = this.partGroups.length - 1;


        

        //make this based off group
        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
                this.itemlist.splice(0,0,_temp);

                //this.refreshDataSource(this.selectedPartGroup.ItemParts);
            },
            (error: any) => this.errorMessage = <any>error
        );        
    }

    // refreshDataSource(itemParts: ItemPartInsert[]) { 
    //     console.log(itemParts);
    //     this.dataSource = new MatTableDataSource<ItemPartInsert>(itemParts);
    // }
    refreshDataSource(partgroups: ItemSectionInsert[]) { 
        this.dataSource = new MatTableDataSource<ItemSectionInsert>(partgroups);
    }
    

    
    // onAddItemPartSection(selection: ItemSectionInsert) {
    //     const _temp = new ItemPartInsert(null, null, null, null, null, null, null, null, null, null, null,  null, true, null, true);
    //     selection.ItemParts.push(_temp)
    //     //this.selectedPartGroup = group;
    //     this.itemService.currentItemPartSelection.next(selection);
        
    //     this.refreshDataSource(this.item.ItemSections);

    //     // const _tempGroupInsert = new ItemPartSelectionInsert(null, null, null, null, null,null, null,  null, true, null, []);
    //     // console.log(this.partGroups);
    //     // this.partGroups.push(_tempGroupInsert);
    //     // this.refreshDataSourceGroups(this.partGroups)
    // }

    onAddItemPart(itemPart: ItemSectionInsert) {
        
        //this.onChangeFOBPrice(itemPart);

        if (this.isRequirementValid(itemPart)) { 
            
                this.pendingAdd = true;

                // if(itemPart.PartSelectionID && itemPart.PartSelectionID != 0)
                // {
                //     this.itemService.getItem(itemPart.PartSelectionID).subscribe(
                //         (item: Item) => {
                //             itemPart.PrevPartSelectionID = item.ItemID;
                //         },
                //         (error: any) => {
                //             this.errorMessage = <any>error;
                //             this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                //         }
                //     );
                // }
                
                const _temp = new ItemSectionInsert(0, null, null, null, this.item.ItemSections.length + 1, []);
                this.item.ItemSections.push(_temp);
                this.refreshDataSource(this.item.ItemSections);   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
        }
    }

    isRequirementValid(itemPart: ItemSectionInsert): boolean {
        if (itemPart
            && itemPart.Name) {
            return true;
        } 
        else {
            return false;
        }
    }

    existName(name: string, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemSections.forEach((value, index) => {
                if(value.Name === name) { 
                    if(isNew || index != this.item.ItemSections.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
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
    //     this.item.ItemPartSelections.forEach((value, index) => {
    //             if(value.ItemPartSelectionID === vendorSKU) { 
    //                 if(isNew || index != this.item.ItemPartSelections.length - 1) {
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

    // onEditItemPart(index: number) {
    //     if(this.currentIndex != index)
    //     {
    //         this.item.ItemPartSelections.forEach((itempart, i) => {

    //             this.onChangeFOBPrice(itempart);
                
    //             if(i != this.item.ItemPartSelections.length - 1) {
    //                 if(!itempart.PartItemName || itempart.PartItemName == '' 
    //                     || !itempart.PartItemVendorSKU || itempart.PartItemVendorSKU == '' 
    //                     || !itempart.PartFOBPrice || itempart.PartFOBPrice == 0 ) {
    
    //                     this.item.ItemPartSelections.splice(i, 1);
    //                     this.refreshDataSource(this.item.Sel);
    //                 }
    //             }
    //         });    
    //     }

    //     if(this.pendingAdd) {
    //         this.currentIndex = this.item.ItemPartSelections.length - 1;
    //         this.pendingAdd = false;
    //     }
    //     else {
    //         this.currentIndex = index;
    //     }    
    // }

    onPartItemChange(index: number, itemPart: any) {  
        if(this.item.ItemSections[index].ItemID && this.item.ItemSections[index].ItemID != 0) {
            if(!this.existName(this.item.ItemSections[index].Name)) {
                if(this.item.ItemSections[index].Name && this.item.ItemSections[index].Name != '')
                {
                    this.itemService.getItem(this.item.ItemSections[index].ItemID).subscribe(
                        (item: Item) => {
                            this.item.ItemSections[index].ItemID = item.ItemID;
                            //this.item.ItemSections[index].Name = item.Name;
                            // this.item.ItemPartSelections[index].PartItemVendorSKU = item.VendorSKU;
                            // this.item.ItemPartSelections[index].PartTPIN = item.TPIN;
                            // this.item.ItemPartSelections[index].PartFOBPrice = item.FOBPrice;
                            // this.item.ItemPartSelections[index].PartPrice = item.Price;

                            this.item.ItemSections[index].ImageFilePath = item.ImagePath;
                            //this.item.ItemSections[index].IsNewImage = false;

                            this.refreshDataSource(this.item.ItemSections);
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
                            .find(item => item.value.Name === this.item.ItemSections[index].Name);
                this.selectionCategoriesRef._results[index].itemsList.select(originalItem);

                itemPart.PartItemName = originalItem.value.ItemName;
                itemPart.PartItemVendorSKU = originalItem.value.VendorSKU; 
                itemPart.PartTPIN = originalItem.value.TPIN;
                itemPart.PartFOBPrice = originalItem.value.FOBPrice;
                itemPart.PartPrice = originalItem.value.PartPrice;

                // if (!this.item.ItemSections[index].isNew) {
                //     this.item.ItemSections[index].PartSelectionID = this.item.ItemSections[index].ItemID;
                // }
                this.currentIndex = this.item.ItemSections.length - 1;
                this.refreshDataSource(this.item.ItemSections);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Part already exists" });
            }
        }
        else
        {
            //this.item.ItemSections[index].isNew = true;
            
            this.item.ItemSections[index].Name = null;
            // this.item.ItemPartSelections[index].PartItemVendorSKU = null;
            // this.item.ItemPartSelections[index].PartTPIN = null;
            // this.item.ItemPartSelections[index].PartFOBPrice = null;
            // this.item.ItemPartSelections[index].PartPrice = null;
            
            this.refreshDataSource(this.item.ItemSections);
        }
    }

    clickIsNew(itemPart: ItemSectionInsert, index: number) {
        itemPart.Name = null;
        itemPart.ItemID = null;
        itemPart.ImageRaw = null;
        itemPart.ImageFilePath = null;
        itemPart.ItemParts = [];
    }

    moveDownPosition(itemPart: ItemPartInsert) {
        this.positionMove(this.item.ItemSections, itemPart, 1);
        this.item.ItemSections.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemSections);
    }

    moveUpPosition(itemPart: ItemSectionInsert) {
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

    onRemove(itemPart: ItemSectionInsert) {
        const confirmation = confirm(`Remove ${itemPart.Name}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemSections.findIndex(i => i.Name === itemPart.Name);
            if (foundIndex > -1) {
                this.item.ItemSections.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemSections);
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
            return i === this.item.ItemSections.length-1
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