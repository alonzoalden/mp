import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemInsert, ItemImageInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { NgForm } from '@angular/forms';

import { environment } from '../../../environments/environment';

declare var $ :any;

@Component({
    selector: 'o-item-add-image',
    templateUrl: './item-add-image.component.html'
})

export class ItemAddImageComponent implements OnInit {
    private imageURL = environment.imageURL;
    
    errorMessage: string;
    item: ItemInsert;
    
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

    constructor(private itemService: ItemService, public itemUploadDialog: MatDialog) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;

        if(this.item.ItemImages.length === 0) {
            // const _temp = new ItemImageInsert(null, null, null, null, null, false, false, false, false, false, false, true);
            // this.item.ItemImages.push(_temp);

            this.addPendingLine();
        }

        this.currentIndex = this.item.ItemImages.length - 1;

        this.refreshDataSource(this.item.ItemImages);

    }
    
    refreshDataSource(itemImages: ItemImageInsert[]) {
        this.dataSource = new MatTableDataSource<ItemImageInsert>(itemImages);
    }

    onAddItemImage(itemImage: ItemImageInsert) {
        if (this.isRequirementValid(itemImage)) {      
            this.pendingAdd = true;
            //const _temp = new ItemImageInsert(null, null, null, null, this.item.ItemImages.length, false, false, false, false, false, false, true);
            //this.item.ItemImages.push(_temp);
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

    isRequirementValid(itemImage: ItemImageInsert): boolean {
        if (itemImage
            && itemImage.Raw) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemImage: ItemImageInsert) {
        this.positionMove(this.item.ItemImages, itemImage, 1);
        this.item.ItemImages.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemImages);
    }

    moveUpPosition(itemImage: ItemImageInsert) {
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

    isBaseImageClick(image: ItemImageInsert, index: number) {
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsBaseImage = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    isSmallImageClick(image: ItemImageInsert, index: number) {
        // this.item.ItemImages.forEach((value, index) => value.IsSmallImage = false);
        // image.IsSmallImage = true;
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsSmallImage = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    isThumbnailClick(image: ItemImageInsert, index: number) {
        // this.item.ItemImages.forEach((value, index) => value.IsThumbnail = false);
        // image.IsThumbnail = true;
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsThumbnail = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }

    isRotatorImageClick(image: ItemImageInsert, index: number) {
        // this.item.ItemImages.forEach((value, index) => value.IsRotatorImage = false);
        // image.IsRotatorImage = true;
        this.item.ItemImages.forEach((value, i) => {
            if(i != index) {
                value.IsRotatorImage = false;
            }
        });
        this.refreshDataSource(this.item.ItemImages);
    }
    
    onRemoveImage(itemImage: ItemImageInsert) {
        const confirmation = confirm(`Remove ${itemImage.Label}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemImages.findIndex(i => i.Position === itemImage.Position);
            if (foundIndex > -1) {
                this.item.ItemImages.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemImages);
        }
    }

    fileChangeEvent(fileInput: any, itemImage: ItemImageInsert) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }

        this.uploadFiles(itemImage);
    }
    
    uploadFiles(itemImage: ItemImageInsert) {
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

    addPendingLine() {    
        const _temp = new ItemImageInsert(null, null, null, null, this.item.ItemImages.length, false, false, false, false, false, false, true);

        if(this.item.ItemImages.length === 0) {
            _temp.IsBaseImage = true;
            _temp.IsSmallImage = true;
            _temp.IsThumbnail = true;
            _temp.IsRotatorImage = true;
        }

        this.item.ItemImages.push(_temp);   
    }

    removePendingLine() {
        if(this.item.ItemImages) {
            this.item.ItemImages.splice(this.item.ItemImages.length-1, 1);
        }
    }

    uploadMultipleImages() {
        const dialogRef = this.itemUploadDialog.open(ItemAddImageComponentUploadDialog, {
            width: '350px',
            data: this.item.ItemImages.length - 1
        });


        dialogRef.afterClosed().subscribe(result => {
            if (result && result.length > 0) {                                
                this.isLoadingMultipleData = true;
                this.removePendingLine();
                const formData: FormData = new FormData(); 
                for (let i = 0; i < result.length; i++) {                       
                    formData.append('uploadedFiles', result[i], result[i].name); 
                }
                this.itemService.uploadTempImages(this.newGuid(), formData).subscribe (
                    (data: string) => {
                        for (let i = 0; i < result.length; i++) {   
                            const newItemImage = new ItemImageInsert(null, null, null, null, this.item.ItemImages.length, false, false, false, false, false, false, true);
                            if(this.item.ItemImages.length === 0) {
                                newItemImage.IsBaseImage = true;
                                newItemImage.IsSmallImage = true;
                                newItemImage.IsThumbnail = true;
                                newItemImage.IsRotatorImage = true;
                            }      

                            newItemImage.Raw = this.imageURL + '/temp' + data + '_' + i + '.' + result[i].name.substr(result[i].name.lastIndexOf('.')+1).toLowerCase();
                            this.item.ItemImages.push(newItemImage);

                            if(i == result.length - 1)
                            {                                
                                this.addPendingLine();
                                this.currentIndex = this.item.ItemImages.length - 1;
                                this.refreshDataSource(this.item.ItemImages);
                            }
                        }
                        this.isLoadingMultipleData = false;
                    }                    
                )
            }
        },
        (error: any) => {
            if(this.item.ItemImages.length === 0) {
                this.addPendingLine();
            }
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }
}

@Component({
    selector: 'item-add-image.component-upload-dialog',
    templateUrl: 'item-add-image.component-upload-dialog.html',
})

export class ItemAddImageComponentUploadDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    selectedFileNames: string[] = [];

    @ViewChild('fileUpload') fileUploadVar: any;

    constructor( public dialogRef: MatDialogRef<ItemAddImageComponentUploadDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: number ) {        
    }

    ngOnInit() {
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    fileChangeEvent(fileInput: any) {
        this.selectedFiles = <Array<File>>fileInput.target.files;

        if(this.selectedFileNames.length + this.data + this.selectedFiles.length > 8) {
            this.itemService.sendNotification({ type: 'error', title: 'Maximum of 8 images', content: '' });
        }
        else {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.filesToUpload.push(this.selectedFiles[i])
                this.selectedFileNames.push(this.selectedFiles[i].name);
            }
        }        
    }

    removeFile(index: number) {
        this.filesToUpload.splice(index, 1);
        this.selectedFileNames.splice(index, 1);
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }
}