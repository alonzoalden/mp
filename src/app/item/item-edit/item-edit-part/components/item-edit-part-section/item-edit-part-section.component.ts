import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemList, ItemSection, ItemPart } from '../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../app.service';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'o-item-edit-part-section',
    templateUrl: './item-edit-part-section.component.html'
})

export class ItemEditPartSectionComponent implements OnInit {
    @Input() errorMessage: string;
    @Input() item: Item;
    imageURL = environment.imageURL;
    isPM: boolean;
    itemlist: ItemList[];
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'ItemName', 'Remove'];
    dataSource: any = null;
    pendingAdd: boolean;
    pendingChange: boolean;
    currentIndex: number;
    itemid: number;
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

    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService,
        private appService: AppService
    ) { }

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

        if (this.item) {
            this.removePendingLine();
            this.addPendingLine();
            this.currentIndex = this.item.ItemSections.length - 1;
            this.refreshDataSource(this.item.ItemSections);
        }

        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
                this.itemlist.splice(0, 0, _temp);
                this.refreshDataSource(this.item.ItemSections);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    addPendingLine() {
        const _temp = new ItemSection(0, this.item.ItemID, null, null, null, this.item.ItemSections.length + 1,  null,  null, [],  true, true);
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
    onAddItemPartSection(itemPart: ItemSection) {
        if (this.existName(itemPart.Name)) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Section name exists.  Please choose another.' });
            return;
        }
        if (this.isRequirementValid(itemPart)) {
                this.pendingAdd = true;
                itemPart.pendingAdd = false;
                const _temp = new ItemSection(0, this.item.ItemID, null, null,  null, this.item.ItemSections.length + 1, null, null, [], true, true);
                this.item.ItemSections.push(_temp);
                this.refreshDataSource(this.item.ItemSections);
                this.pendingChange = false;
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please choose a name.' });
        }
    }
    onChangeSectionName(section: ItemSection) {
        if (this.pendingChange) {
            return;
        }
        if (this.existName(section.Name)) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Section name exists.  Please choose another.' });
            section.Name = '';
        }
    }

    existName(name: string, isNew: boolean = false) {
        let counter: number = 0;
        this.item.ItemSections.forEach((value, index) => {
                if (value.Name === name) {
                    counter += 1;
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    isRequirementValid(ItemSection: ItemSection): boolean {
        if (ItemSection
            && ItemSection.Name) {
            return true;
        } else {
            return false;
        }
    }

    existItemID(itemID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.item.ItemSections.forEach((value, index) => {
                if (value.ItemID === itemID) {
                    if (isNew || index !== this.item.ItemSections.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    onEditItemPartGroup(index: number) {
        if (index !== this.item.ItemSections.length - 1) {
            this.itemService.currentItemPartSelection.next(this.item.ItemSections[index]);
        } else {
            this.itemService.currentItemPartSelection.next(null);
        }
        this.refreshDataSource(this.item.ItemSections);
        if (this.pendingAdd) {
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    onEditItemPart(index: number) {
        if (this.currentIndex !== index) {
            this.item.ItemSections.forEach((itempart, i) => {
                if (i !== this.item.ItemSections.length - 1) {
                    if (!itempart.Name || itempart.Name === '' ) {
                        this.item.ItemSections.splice(i, 1);
                        this.refreshDataSource(this.item.ItemSections);
                    }
                }
            });
        }

        if (this.pendingAdd) {
            this.currentIndex = this.item.ItemSections.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    clickIsNew(itemPart: ItemPart, index: number) {
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
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
    clearFields(itemsectioninsert: ItemSection) {
        itemsectioninsert.Name = null;
        itemsectioninsert.ImageFilePath = null;
        itemsectioninsert.ImageRaw = null;
        itemsectioninsert = null;
        this.formDirty = false;
    }
    overflowFix(bool: Boolean): void {
        const container = document.getElementsByClassName('ibox-content')[0];
        bool ? container.classList.add('overflow-visible') : container.classList.remove('overflow-visible');
    }
    setPlaceholderText(i: number, itemPart: any) {
        if (this.itemlist) {
            return i === this.item.ItemSections.length - 1
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
                const reader = new FileReader();
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
                const reader = new FileReader();
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

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}
