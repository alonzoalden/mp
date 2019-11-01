import { Component, OnInit, OnChanges,   ViewChildren, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemList, ItemPartInsert, ItemSectionInsert, ItemSection } from '../../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../../app.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'o-item-add-part-section',
    templateUrl: './item-add-part-section.component.html'
})

export class ItemAddPartSectionComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    imageURL = environment.imageURL;
    isPM: boolean;
    itemlist: ItemList[];
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'ItemName', 'Remove'];
    dataSource: any = null;
    pendingAdd: boolean;
    pendingChange: boolean;
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

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemSections.length === 0) {
            this.addPendingLine();
        }
    }
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

        // this.item = this.itemService.currentItemInsert;

        // if (this.item.ItemSections.length === 0) {
        //     const _temp = new ItemSectionInsert(0, null, null, null, null, []);
        //     this.item.ItemSections.push(_temp);

        // }
        this.refreshDataSource(this.item.ItemSections);

        this.currentIndex = this.item.ItemSections.length - 1;


        this.itemService.getPartItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                const _temp = new ItemList(null, 'New Item', null, null, null, null, null);
                this.itemlist.splice(0, 0, _temp);

            },
            (error: any) => this.errorMessage = <any>error
        );
    }
    addPendingLine(): void {
        const _temp = new ItemSectionInsert(0, null, null, null, null, []);
        this.item.ItemSections.push(_temp);
    }

    refreshDataSource(partgroups: ItemSectionInsert[]) {
        this.dataSource = new MatTableDataSource<ItemSectionInsert>(partgroups);
    }

    onAddItemPartSection(itemPart: ItemSectionInsert) {

        // this.onChangeFOBPrice(itemPart);
        if (this.existName(itemPart.Name)) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Section name exists.  Please choose another.' });
            return;
        }

        if (this.isRequirementValid(itemPart)) {

                this.pendingAdd = true;
                const _temp = new ItemSectionInsert(0, null, null, null, this.item.ItemSections.length + 1, []);
                this.item.ItemSections.push(_temp);
                this.refreshDataSource(this.item.ItemSections);
                this.pendingChange = false;
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please choose a name.' });
        }
    }

    isRequirementValid(itemPart: ItemSectionInsert): boolean {
        if (itemPart
            && itemPart.Name) {
            return true;
        } else {
            return false;
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
            this.itemService.currentItemPartSelectionInsert.next(this.item.ItemSections[index]);
        } else {
            this.itemService.currentItemPartSelectionInsert.next(null);
        }
        this.refreshDataSource(this.item.ItemSections);
        if (this.pendingAdd) {
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemove(itemPart: ItemSectionInsert) {
        const confirmation = confirm(`Remove ${itemPart.Name}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemSections.findIndex(i => i.Name === itemPart.Name);
            if (foundIndex > -1) {
                this.item.ItemSections.splice(foundIndex, 1);
            }
            this.itemService.currentItemPartSelectionInsert.next(null);
            this.refreshDataSource(this.item.ItemSections);
        }
    }
    clearFields(itemsectioninsert: ItemSectionInsert) {
        itemsectioninsert.Name = null;
        itemsectioninsert.ImageFilePath = null;
        itemsectioninsert.ImageRaw = null;
        itemsectioninsert = null;
        this.formDirty = false;
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

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}
