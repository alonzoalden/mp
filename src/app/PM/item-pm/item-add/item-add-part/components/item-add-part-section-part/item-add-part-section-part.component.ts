import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemList, ItemPartInsert, ItemSectionInsert } from '../../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../../app.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'o-item-add-part-section-part',
    templateUrl: './item-add-part-section-part.component.html'
})

export class ItemAddPartSectionPartComponent implements OnInit {
    imageURL = environment.imageURL;
    isPM: boolean;
    errorMessage: string;
    itemlist: ItemList[];
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Select', 'ItemName', 'SKU', 'TPIN', 'Price', 'Remove'];
    currentItemPartSelectionInsert: ItemSectionInsert;
    dataSource: any = null;
    pendingAdd: boolean;
    pendingLoad: boolean;
    currentIndex: number;
    formDirty = false;
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
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

        this.itemService.currentItemPartSelectionInsert.subscribe(partselection => {
            this.currentItemPartSelectionInsert = partselection;
            if (partselection) {
                if (partselection.ItemParts.length === 0) {
                    const _temp = new ItemPartInsert(null, null, null, null, null, null, null, null, null, null, null, true, null, true);
                    this.currentItemPartSelectionInsert.ItemParts.push(_temp);
                }

                this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
                this.currentIndex = this.currentItemPartSelectionInsert.ItemParts.length - 1;
            }

        });

        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
                this.itemlist.splice(0, 0, _temp);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemParts: ItemPartInsert[]) {
        this.dataSource = new MatTableDataSource<ItemPartInsert>(itemParts);
    }

    onAddItemPart(itemPart: ItemPartInsert) {
        if (this.pendingLoad) { return; }
        this.onChangeFOBPrice(itemPart);
        if (this.isRequirementValid(itemPart)) {
            if (!this.existVendorSKU(itemPart.PartItemVendorSKU, true)) {
                this.pendingAdd = true;

                if (itemPart.PartItemID && itemPart.PartItemID !== 0) {
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

                const _temp = new ItemPartInsert(null, null, null, null, null, null, null, null, null, null, null, true, this.currentItemPartSelectionInsert.ItemParts.length + 1, true);
                this.currentItemPartSelectionInsert.ItemParts.push(_temp);
                this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Part already exists' });
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an item' });
        }
    }

    isRequirementValid(itemPart: ItemPartInsert): boolean {
        if (itemPart
            && itemPart.PartItemName
            && itemPart.PartItemVendorSKU
            && itemPart.PartFOBPrice) {
            return true;
        } else {
            return false;
        }
    }

    existItemID(itemID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.currentItemPartSelectionInsert.ItemParts.forEach((value, index) => {
                if (value.PartItemID === itemID) {
                    if (isNew || index !== this.currentItemPartSelectionInsert.ItemParts.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    existVendorSKU(vendorSKU: string, isNew: boolean = false) {
        let counter: number = 0;
        this.currentItemPartSelectionInsert.ItemParts.forEach((value, index) => {
                if (value.PartItemVendorSKU === vendorSKU) {
                    if (isNew || index !== this.currentItemPartSelectionInsert.ItemParts.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    onEditItemPart(index: number) {
        if (this.currentIndex !== index) {
            this.currentItemPartSelectionInsert.ItemParts.forEach((itempart, i) => {

                this.onChangeFOBPrice(itempart);

                if (i !== this.currentItemPartSelectionInsert.ItemParts.length - 1) {
                    if (!itempart.PartItemName || itempart.PartItemName === ''
                        || !itempart.PartItemVendorSKU || itempart.PartItemVendorSKU === ''
                        || !itempart.PartFOBPrice || itempart.PartFOBPrice === 0 ) {

                        this.currentItemPartSelectionInsert.ItemParts.splice(i, 1);
                        this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
                    }
                }
            });
        }
        if (this.pendingAdd) {
            this.currentIndex = this.currentItemPartSelectionInsert.ItemParts.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    onPartItemChange(index: number, itemPart: any) {
        if (this.currentItemPartSelectionInsert.ItemParts[index] && this.currentItemPartSelectionInsert.ItemParts[index].PartItemID && this.currentItemPartSelectionInsert.ItemParts[index].PartItemID !== 0) {
            if (!this.existItemID(this.currentItemPartSelectionInsert.ItemParts[index].PartItemID)) {
                if (this.currentItemPartSelectionInsert.ItemParts[index].PartItemID && this.currentItemPartSelectionInsert.ItemParts[index].PartItemID !== 0) {
                    this.pendingLoad = true;
                    this.itemService.getItem(this.currentItemPartSelectionInsert.ItemParts[index].PartItemID).subscribe(
                        (item: Item) => {
                            this.currentItemPartSelectionInsert.ItemParts[index].PrevPartItemID = item.ItemID;
                            this.currentItemPartSelectionInsert.ItemParts[index].PartItemName = item.Name;
                            this.currentItemPartSelectionInsert.ItemParts[index].PartItemVendorSKU = item.VendorSKU;
                            this.currentItemPartSelectionInsert.ItemParts[index].PartTPIN = item.TPIN;
                            this.currentItemPartSelectionInsert.ItemParts[index].PartFOBPrice = item.FOBPrice;
                            this.currentItemPartSelectionInsert.ItemParts[index].PartPrice = item.Price;
                            this.currentItemPartSelectionInsert.ItemParts[index].ImageFilePath = item.ImagePath;
                            this.currentItemPartSelectionInsert.ItemParts[index].IsNewImage = false;
                            this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
                            this.pendingLoad = false;
                        },
                        (error: any) => {
                            this.errorMessage = <any>error;
                            this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                            this.pendingLoad = false;
                        }
                    );
                }
            } else {
                // This prevents select input value from changing into an existing value
                const originalItem = this.selectionCategoriesRef._results[index].itemsList.items
                            .find(item => item.value.ItemID === this.currentItemPartSelectionInsert.ItemParts[index].PrevPartItemID);
                this.selectionCategoriesRef._results[index].itemsList.select(originalItem);

                itemPart.PartItemName = originalItem.value.ItemName;
                itemPart.PartItemVendorSKU = originalItem.value.VendorSKU;
                itemPart.PartTPIN = originalItem.value.TPIN;
                itemPart.PartFOBPrice = originalItem.value.FOBPrice;
                itemPart.PartPrice = originalItem.value.PartPrice;

                if (!this.currentItemPartSelectionInsert.ItemParts[index].isNew) {
                    this.currentItemPartSelectionInsert.ItemParts[index].PartItemID = this.currentItemPartSelectionInsert.ItemParts[index].PrevPartItemID;
                }
                this.currentIndex = this.currentItemPartSelectionInsert.ItemParts.length - 1;
                this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Part already exists' });
            }
        } else {
            this.currentItemPartSelectionInsert.ItemParts[index].isNew = true;
            this.currentItemPartSelectionInsert.ItemParts[index].PartItemName = null;
            this.currentItemPartSelectionInsert.ItemParts[index].PartItemVendorSKU = null;
            this.currentItemPartSelectionInsert.ItemParts[index].PartTPIN = null;
            this.currentItemPartSelectionInsert.ItemParts[index].PartFOBPrice = null;
            this.currentItemPartSelectionInsert.ItemParts[index].PartPrice = null;
            this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
        }
    }

    clickIsNew(itemPart: ItemPartInsert, index: number) {
        itemPart.PartItemID = null;
        itemPart.PartItemName = null;
        itemPart.PartItemVendorSKU = null;
        itemPart.PartTPIN = null;
        itemPart.PartFOBPrice = null;
        itemPart.PartPrice = null;
    }

    moveDownPosition(itemPart: ItemPartInsert) {
        this.positionMove(this.currentItemPartSelectionInsert.ItemParts, itemPart, 1);
        this.currentItemPartSelectionInsert.ItemParts.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
    }

    moveUpPosition(itemPart: ItemPartInsert) {
        this.positionMove(this.currentItemPartSelectionInsert.ItemParts, itemPart, -1);
        this.currentItemPartSelectionInsert.ItemParts.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemove(itemPart: ItemPartInsert) {
        const confirmation = confirm(`Remove ${itemPart.PartItemName}?`);
        if (confirmation) {
            const foundIndex = this.currentItemPartSelectionInsert.ItemParts.findIndex(i => i.PartItemID === itemPart.PartItemID);
            if (foundIndex > -1) {
                this.currentItemPartSelectionInsert.ItemParts.splice(foundIndex, 1);
            }
            this.refreshDataSource(this.currentItemPartSelectionInsert.ItemParts);
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

    setPlaceholderText(i: number, itemPart: ItemPartInsert) {
        if (this.itemlist) {
            return i === this.currentItemPartSelectionInsert.ItemParts.length - 1
                ? 'Search Item'
                : itemPart.PartItemID
                    ? this.itemlist.find(item => itemPart.PartItemID === item.ItemID).Description
                    : 'New Item';
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

    onChangeFOBPrice(itemPart: ItemPartInsert) {
        if (itemPart.PartFOBPrice) {
            itemPart.PartFOBPrice = Number(itemPart.PartFOBPrice.toFixed(2));
        }

        if (itemPart.PartPrice) {
            if (itemPart.PartPrice <= 0) {
                itemPart.PartPrice = itemPart.PartFOBPrice * 3;
                itemPart.PartPrice = Number(itemPart.PartPrice.toFixed(2));
            }
        } else {
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
    scrollToElement($element): void {
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
}
