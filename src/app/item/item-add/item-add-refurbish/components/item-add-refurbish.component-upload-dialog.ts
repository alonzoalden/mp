
import { Component, OnInit, ViewChild, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemInsert, ItemImageInsert, ItemRefurbishImageInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { environment } from '../../../../../environments/environment';
declare var $: any;

@Component({
    templateUrl: 'item-add-refurbish.component-upload-dialog.html',
})

// tslint:disable-next-line: component-class-suffix
export class ItemAddRefurbishImageComponentUploadDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    selectedFileNames: string[] = [];
    itemRefurbishImages: ItemRefurbishImageInsert[] = [];
    imageUrlResponses: string[] = [];

    pendingUpload: boolean;
    isLoadingData: boolean;
    imageURL = environment.imageURL;

    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor( public dialogRef: MatDialogRef<ItemAddRefurbishImageComponentUploadDialog>,
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

        if (this.selectedFileNames.length + this.data + this.selectedFiles.length > 8) {
            this.itemService.sendNotification({ type: 'error', title: 'Maximum of 8 images', content: '' });
        } else {
            for (let i = 0; i < this.selectedFiles.length; i++) {


                this.filesToUpload.push(this.selectedFiles[i]);
                this.selectedFileNames.push(this.selectedFiles[i].name);

                this.uploadFiles();
            }
        }
    }

    uploadFiles() {
        if (this.filesToUpload.length > 0) {
            this.pendingUpload = true;
            this.isLoadingData = true;
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }

            this.itemService.uploadTempImages(this.newGuid(), formData)
                .subscribe (
                    (data: any) => {
                        this.imageUrlResponses.push(data);
                        
                        // for (let i = 0; i < this.filesToUpload.length; i++) {
                        //     const newItemImage = new ItemRefurbishImageInsert(null, null, null, null, null, this.filesToUpload.length, null, null, null, null, null, null, null, null, null);
                        //     newItemImage.Raw = this.imageURL + '/temp' + data + '_' + i + '.' + this.filesToUpload[i].name.substr(this.filesToUpload[i].name.lastIndexOf('.') + 1).toLowerCase();
                        //     newItemImage.Label = this.filesToUpload[i].name;
                        //     this.itemRefurbishImages.push(newItemImage);
                        //     console.log(data);
                        //     //console.log(newItemImage);
                        // }


                        this.pendingUpload = false;
                    },
                    err => {
                        //this.pendingUpload = false;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                        this.isLoadingData = false;
                        this.filesToUpload = [];
                        this.selectedFileNames = [];
                    },
                    () => {
                        if (this.imageUrlResponses.length === this.filesToUpload.length) {
                            for (let i = 0; i < this.filesToUpload.length; i++) {
                                const newItemImage = new ItemRefurbishImageInsert(null, null, null, null, null, this.filesToUpload.length, null, null, null, null, null, null, null, null, null);
                                newItemImage.Raw = this.imageURL + '/temp' + this.imageUrlResponses[i] + '_' + i + '.' + this.filesToUpload[i].name.substr(this.filesToUpload[i].name.lastIndexOf('.') + 1).toLowerCase();
                                newItemImage.Label = this.filesToUpload[i].name;
                                this.itemRefurbishImages.push(newItemImage);
                                //console.log(this.itemRefurbishImages);
                                //console.log(newItemImage);
                            }
                        }
                        //this.pendingUpload = false;
                        this.isLoadingData = false;
                        //this.filesToUpload = [];
                        //this.selectedFileNames = [];
                    }
                );
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
    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}