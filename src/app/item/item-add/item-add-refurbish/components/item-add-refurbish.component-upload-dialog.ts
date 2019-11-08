
import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemRefurbishImageInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { environment } from '../../../../../environments/environment';

@Component({
    templateUrl: 'item-add-refurbish.component-upload-dialog.html',
})

export class ItemAddRefurbishImageComponentUploadDialog {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    itemRefurbishImages: ItemRefurbishImageInsert[] = [];
    pendingUpload: boolean;
    isLoadingData: boolean = false;
    imageURL = environment.imageURL;
    uploadError: string;
    uploadImageErrors: ItemRefurbishImageInsert[] = [];

    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor( public dialogRef: MatDialogRef<ItemAddRefurbishImageComponentUploadDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: number ) {
    }

    onCancelClick(): void {
        if (this.itemRefurbishImages.length) {
            const confirmiation = confirm('You have images ready for upload. Are you sure you want to cancel?');
            if (!confirmiation) {
                return;
            }
        }
        this.dialogRef.close();
    }

    fileChangeEvent(fileInput: any) {
        this.selectedFiles = <Array<File>>fileInput.target.files;

        if (this.selectedFiles.length > 8) {
            this.uploadError = 'Error: Maximum of 8 images';
            this.itemService.sendNotification({ type: 'error', title: 'Maximum of 8 images', content: '' });
            return;
        }
        if (this.exceedsFileSizeLimit(this.selectedFiles)) {
            return;
        }
        else {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.filesToUpload.push(this.selectedFiles[i]);
            }
            this.uploadFiles();
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
            this.uploadImageErrors.splice(0);
            this.itemService.uploadTempImages(this.newGuid(), formData)
                .subscribe (
                    (data: any) => {
                        for (let i = 0; i < this.filesToUpload.length; i++) {
                            const newItemImage = new ItemRefurbishImageInsert(null, null, null, null, null, this.filesToUpload.length, null, null, null, null, null, null, null, null, null);
                            newItemImage.Raw = this.imageURL + '/temp' + data + '_' + i + '.' + this.filesToUpload[i].name.substr(this.filesToUpload[i].name.lastIndexOf('.') + 1).toLowerCase();
                            newItemImage.Label = this.filesToUpload[i].name;
                            this.itemRefurbishImages.push(newItemImage);
                        }
                        this.filesToUpload = [];
                        this.pendingUpload = false;
                        this.isLoadingData = false;
                    },
                    err => {
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                        this.isLoadingData = false;
                        this.filesToUpload = [];
                    },
                );
        }
    }
    exceedsFileSizeLimit(filestoupload: any[]) {
        for (const file of filestoupload) {
            if (file.size > 2300000) {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: `File size exceeded (max is 2.3MB)` });
                this.uploadError = 'Error: File size exceeded - ' + file.name;
                return true;
            }
        }
        return false;
    }
    removeFile(index: number) {
        this.itemRefurbishImages.splice(index, 1);
    }

    cancelUpload() {
        this.filesToUpload.splice(0);
        this.itemRefurbishImages.splice(0);
    }
    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
    errorUploadingImage(image: ItemRefurbishImageInsert, index: number) {
        image.Raw = null;
        this.uploadImageErrors.push(image);
        this.itemRefurbishImages.splice(index, 1);
    }
}
