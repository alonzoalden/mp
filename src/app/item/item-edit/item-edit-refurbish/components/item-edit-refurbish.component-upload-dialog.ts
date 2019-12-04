import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ItemService } from '../../../item.service';
import { ItemImageSerialized } from '../../../../shared/class/item';
import { environment } from '../../../../../environments/environment';

@Component({
    templateUrl: 'item-edit-refurbish.component-upload-dialog.html',
})

export class ItemEditRefurbishImageComponentUploadDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    itemRefurbishImages: ItemImageSerialized[] = [];
    dataSource: MatTableDataSource<ItemImageSerialized>;
    displayedColumns = ['Image'];
    pendingUpload: boolean;
    isLoadingData: boolean = false;
    refurbishURL = environment.refurbishURL;
    uploadError: string;
    uploadImageErrors: ItemImageSerialized[] = [];
    currentIndex: boolean;

    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor(
        public dialogRef: MatDialogRef<ItemEditRefurbishImageComponentUploadDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: ItemImageSerialized[] ) {
    }

    ngOnInit() {
        if (this.data.length) {
            this.itemRefurbishImages = [...this.data];
        }
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
