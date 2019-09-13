import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemImage } from '../../../shared/class/item';
import { ItemService } from '../../item.service';

import { environment } from '../../../../environments/environment';

declare var $ :any;

@Component({
    selector: 'o-item-part-edit-image',
    templateUrl: './item-part-edit-image.component.html'
})

export class ItemPartEditImageComponent implements OnInit {
    private imageURL = environment.imageURL;

    errorMessage: string;
    item: Item;
    itemid: number;

    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'IsBaseImage', 'IsSmallImage', 'IsThumbnail', 'IsRotatorImage', 'Exclude', 'Remove'];
    dataSource: any = null;
    pendingAdd: boolean;
    currentIndex: number;

    formDirty = false;

    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    res: Array<string>;

    pendingUpload: boolean;
    public isLoadingData: Boolean = false;
    public isLoadingMultipleData: Boolean = false;
    
    constructor(private route: ActivatedRoute,
        private itemService: ItemService) { }

    guid: string;

    ngOnInit(): void {
        this.guid = this.newGuid();

        this.itemid = this.route.parent.snapshot.params['id'];

        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemImages === null) {
            this.itemService.getItemImages(this.itemid).subscribe(
                (itemImages: ItemImage[]) => {
                    this.item.ItemImages = itemImages;                    
                    this.addPendingLine();         
                    
                    this.currentIndex = this.item.ItemImages.length - 1;

                    this.refreshDataSource(this.item.ItemImages);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.removePendingLine();
            this.addPendingLine();               

            this.currentIndex = this.item.ItemImages.length - 1;

            this.refreshDataSource(this.item.ItemImages);
        }
    }

    addPendingLine() {
        const _temp = new ItemImage(0, this.itemid, null, null, null,  this.item.ItemImages.length + 1, false, false, false, false, false, false, null, null, true, true);
        
        if(this.item.ItemImages.length === 0) {
            _temp.IsBaseImage = true;
            _temp.IsSmallImage = true;
            _temp.IsThumbnail = true;
            _temp.IsRotatorImage = true;
        }

        this.item.ItemImages.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.item.ItemImages.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemImages.splice(foundIndex, 1);
        }
    }

    refreshDataSource(itemImages: ItemImage[]) { 
        this.dataSource = new MatTableDataSource<ItemImage>(itemImages);
    }

    onAddItemImage(itemImage: ItemImage) {
        if (this.isRequirementValid(itemImage)) {      
            this.pendingAdd = true;
            
            itemImage.pendingAdd = false; 

            this.addPendingLine();
            this.refreshDataSource(this.item.ItemImages);
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an Image" });
        }
    }

    onEditItemImage(index: number) {
        if(this.pendingAdd) {
            this.currentIndex = this.item.ItemImages.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemImage: ItemImage): boolean {
        if (itemImage
            && itemImage.Raw) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemImage: ItemImage) {
        this.positionMove(this.item.ItemImages, itemImage, 1);
        this.item.ItemImages.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemImages);
    }

    moveUpPosition(itemImage: ItemImage) {
        this.positionMove(this.item.ItemImages, itemImage, -1);
        this.item.ItemImages.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.refreshDataSource(this.item.ItemImages);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    isBaseImageClick(image: ItemImage, index: number) {
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsBaseImage = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    isSmallImageClick(image: ItemImage, index: number) {
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsSmallImage = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    isThumbnailClick(image: ItemImage, index: number) {
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsThumbnail = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    isRotatorImageClick(image: ItemImage, index: number) {
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsRotatorImage = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    onRemoveImage(itemImage: ItemImage) {
        const confirmation = confirm(`Remove ${itemImage.Label}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemImages.findIndex(i => i.Position === itemImage.Position);
            if (foundIndex > -1) {
                this.item.ItemImages.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemImages);
        }
    }

    fileChangeEvent(fileInput: any, itemImage: ItemImage) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }

        this.uploadFiles(itemImage);
    }

    uploadFiles(itemImage: ItemImage) {
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

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }

    clearFields(form) {
        this.formDirty = false;
        form.Label = '';
        form.Raw = null;
        form.IsBaseImage = null;
        form.IsNewImage = null;
        form.IsRotatorImage = null;
        form.IsThumbnail = null;
        form.IsSmallImage = null;
        form.ItemID = null;
        $( "#isBaseImage, #isSmallImage, #isThumbnail, #isRotatorImage" ).prop( "checked", false );
    }
    clickInputEvents() {
        $('#isBaseImage')
        $('#isSmallImage')
        $('#isThumbnail')
        $('#isRotatorImage')
    }
}