import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../item.service';

@Component({
    selector: 'item-edit-image.component-upload-dialog',
    templateUrl: 'item-edit-image.component-upload-dialog.html',
})

export class ItemEditImageComponentUploadDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    selectedFileNames: string[] = [];

    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor( public dialogRef: MatDialogRef<ItemEditImageComponentUploadDialog>,
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
