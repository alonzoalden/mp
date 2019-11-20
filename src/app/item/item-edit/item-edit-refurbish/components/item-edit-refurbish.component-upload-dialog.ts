import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ItemService } from '../../../item.service';
import { ItemRefurbishImageInsert } from '../../../../shared/class/item';
import { environment } from '../../../../../environments/environment';

@Component({
    templateUrl: 'item-edit-refurbish.component-upload-dialog.html',
})

export class ItemEditRefurbishImageComponentUploadDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    itemRefurbishImages: ItemRefurbishImageInsert[] = [];
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['Down', 'Position', 'Up', 'Base', 'Image', 'Label', 'Remove'];
    pendingUpload: boolean;
    isLoadingData: boolean = false;
    imageURL = environment.imageURL;
    uploadError: string;
    uploadImageErrors: ItemRefurbishImageInsert[] = [];
    currentIndex: boolean;

    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor(
        public dialogRef: MatDialogRef<ItemEditRefurbishImageComponentUploadDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: ItemRefurbishImageInsert[] ) {
    }

    ngOnInit() {
        if (this.data.length) {
            this.itemRefurbishImages = [...this.data];
            this.refreshDataSource(this.itemRefurbishImages);
        }
    }

    refreshDataSource(data: any[]) {
        this.dataSource = new MatTableDataSource<any>(data);
    }

    onCancelClick(): void {
        if (this.itemRefurbishImages.length && !this.data.length) {
            const confirmiation = confirm('You have images ready for upload. Are you sure you want to cancel?');
            if (!confirmiation) {
                return;
            }
        }
        if (this.itemRefurbishImages.length !== this.data.length && this.data.length) {
            const confirmiation = confirm('You\'ve made some changes. Are you sure you want to cancel?');
            if (!confirmiation) {
                return;
            }
        }
        this.dialogRef.close();
    }
    onDialogClose(): void {
        this.itemRefurbishImages.find((image, i) => {
            if (image.IsBaseImage) {
                const item = this.itemRefurbishImages.splice(i, 1);
                this.itemRefurbishImages.unshift(item[0]);
            }
        });
        console.log(this.itemRefurbishImages);
        this.dialogRef.close(this.itemRefurbishImages);
    }

    fileChangeEvent(fileInput: any) {
        this.selectedFiles = <Array<File>>fileInput.target.files;

        if (this.selectedFiles.length > 8) {
            this.uploadError = 'Error: Maximum of 8 images';
            this.itemService.sendNotification({ type: 'error', title: 'Maximum of 8 images', content: '' });
            return;
        }
        if (this.exceedsFileSizeLimit(this.selectedFiles)) {
            this.selectedFiles = [];
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


                        const containsBaseImage = this.itemRefurbishImages.find(image => image.IsBaseImage);
                        if (!containsBaseImage) {
                            this.itemRefurbishImages[0].IsBaseImage = true;
                        }
                        this.refreshDataSource(this.itemRefurbishImages);

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
        this.refreshDataSource(this.itemRefurbishImages);
    }

    moveDownPosition(itemrefurbishimage: ItemRefurbishImageInsert) {
        this.positionMove(this.itemRefurbishImages, itemrefurbishimage, 1);
        this.itemRefurbishImages.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.itemRefurbishImages);
    }

    moveUpPosition(itemrefurbishimage: ItemRefurbishImageInsert) {
        this.positionMove(this.itemRefurbishImages, itemrefurbishimage, -1);
        this.itemRefurbishImages.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.itemRefurbishImages);
    }
    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }


    cancelUpload() {
        if (this.itemRefurbishImages.length) {
            const confirmation = confirm(`Are you sure you want to remove selected images?`);
            if (!confirmation) {
                return;
            }
        }
        this.filesToUpload.splice(0);
        this.itemRefurbishImages.splice(0);
        this.refreshDataSource(this.itemRefurbishImages);
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
    isBaseImageClick(image: any, index: number) {
        this.itemRefurbishImages.forEach((value, i) => {
            if (i !== index) {
                value.IsBaseImage = false;
            }
        });
        this.refreshDataSource(this.itemRefurbishImages);
    }
}
