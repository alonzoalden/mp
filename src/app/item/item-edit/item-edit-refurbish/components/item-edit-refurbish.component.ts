import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Item, ItemRefurbish, ItemRefurbishImage } from '../../../../shared/class/item';
import { Member } from '../../../../shared/class/member';
import { ItemService } from '../../../item.service';
import { environment } from '../../../../../environments/environment';
import { ItemEditRefurbishImageComponentUploadDialog } from './item-edit-refurbish.component-upload-dialog';
declare var $: any;

@Component({
    selector: 'o-item-edit-refurbish',
    templateUrl: './item-edit-refurbish.component.html'
})

export class ItemEditRefurbishComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() userInfo: Member;
    @Input() itemRefurbishesMatTable: MatTableDataSource<ItemRefurbish>;
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Images', 'PrintLabel', 'SerialNumber', 'Condition', 'SellingPrice', 'Remove'];
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    itemid: number;
    imageURL = environment.imageURL;
    pendingUpload: boolean;
    guid: string;
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    public isLoadingData: Boolean = false;
    public isLoadingMultipleData: Boolean = false;

    conditionTypes: any = [
        {
            Name: 'Bad',
            Value: 1
        },
        {
            Name: 'Used',
            Value: 2
        },
        {
            Name: 'Decent',
            Value: 3
        },
        {
            Name: 'New',
            Value: 4
        },
        {
            Name: 'Unopened',
            Value: 5
        }
    ];


    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService,
        public itemUploadDialog: MatDialog
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.item && changes.item.currentValue && !changes.item.currentValue.ItemRefurbishes) {
            this.item.ItemRefurbishes = [];
            this.addPendingLine();
        }
    }
    ngOnInit(): void {
        this.guid = this.newGuid();
        this.currentIndex = this.item.ItemRefurbishes.length - 1;
        this.itemid = this.route.parent.snapshot.params['id'];
    }

    addPendingLine() {
        const _temp = new ItemRefurbish(0, this.itemid, null, null, null, null, null, [], null);
        this.item.ItemRefurbishes.push(_temp);
        this.refreshDataSource(this.item.ItemRefurbishes);
    }

    removePendingLine() {
        const foundIndex = this.item.ItemRefurbishes.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemRefurbishes.splice(foundIndex, 1);
        }
    }

    refreshDataSource(itemrefurbishes: ItemRefurbish[]) {
        this.itemRefurbishesMatTable = new MatTableDataSource<ItemRefurbish>(itemrefurbishes);
    }

    onAddItemImage(itemrefurbish: ItemRefurbish) {
        if (this.isRequirementValid(itemrefurbish)) {
            this.pendingAdd = true;
            itemrefurbish.pendingAdd = false;
            this.addPendingLine();
            this.refreshDataSource(this.item.ItemRefurbishes);
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please fill in required fields' });
        }
    }

    onEditItemImage(index: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.item.ItemRefurbishes.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemrefurbish: ItemRefurbish): boolean {
        return !!(itemrefurbish
            && itemrefurbish.Images.length
            && itemrefurbish.SellingPrice
            && itemrefurbish.SerialNumber
            && itemrefurbish.Condition
        );
    }
    containsAnyValues(itemRefurbish: ItemRefurbish) {
        return !!(itemRefurbish
            || itemRefurbish.Images.length
            || itemRefurbish.SellingPrice
            || itemRefurbish.SerialNumber
            || itemRefurbish.Condition
        );
    }
    moveDownPosition(itemrefurbish: ItemRefurbish) {
        this.positionMove(this.item.ItemRefurbishes, itemrefurbish, 1);
        this.item.ItemRefurbishes.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemRefurbishes);
    }

    moveUpPosition(itemrefurbish: ItemRefurbish) {
        this.positionMove(this.item.ItemRefurbishes, itemrefurbish, -1);
        this.item.ItemRefurbishes.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemRefurbishes);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemoveRefurbish(itemrefurbish: ItemRefurbish) {
        const confirmation = confirm(`Remove ${itemrefurbish.SerialNumber}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemRefurbishes.findIndex(i => i.Position === itemrefurbish.Position);
            if (foundIndex > -1) {
                this.item.ItemRefurbishes.splice(foundIndex, 1);
            }
            this.refreshDataSource(this.item.ItemRefurbishes);
        }
    }

    fileChangeEvent(fileInput: any, itemImage: ItemRefurbishImage) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }

        this.uploadFiles(itemImage);
    }

    uploadFiles(itemImage: ItemRefurbishImage) {
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
                        itemImage.Raw = data;
                        itemImage.IsNewImage = true;
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

    clearFields(form) {
        if (form.Images.length) {
            const confirmation = confirm(`You currently have ${form.Images.length} uploaded images. Are you sure you want to clear?`);
            if (!confirmation) {
                return;
            }
        }
        this.formDirty = false;
        form.Images.splice(0);
        form.SerialNumber = null;
        form.Condition = null;
        form.SellingPrice = null;
    }

    uploadMultipleImages(index: number) {
        const dialogRef = this.itemUploadDialog.open(ItemEditRefurbishImageComponentUploadDialog, {
            width: '920px',
            data: this.item.ItemRefurbishes[index].Images,
            disableClose: true
        });


        dialogRef.afterClosed().subscribe(result => {
            if (result && result.length > 0) {
                this.item.ItemRefurbishes[index].Images = result;
                this.formDirty = true;
            }
        },
        (error: any) => {
            this.removePendingLine();
            this.addPendingLine();
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}
