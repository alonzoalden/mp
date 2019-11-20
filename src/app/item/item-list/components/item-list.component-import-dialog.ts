import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../item.service';

@Component({
    selector: 'item-list.component-import-dialog',
    templateUrl: 'item-list.component-import-dialog.html',
})

export class ItemListComponentImportDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    selectedFileNames: string[] = [];
    loading: boolean;
    updated: boolean;
    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor(
        public dialogRef: MatDialogRef<ItemListComponentImportDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.updated = false;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = [];
        this.selectedFileNames = [];
        this.selectedFiles = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.filesToUpload.push(this.selectedFiles[i]);
            this.selectedFileNames.push(this.selectedFiles[i].name);
        }
    }

    removeFile(index: number) {
        this.filesToUpload.splice(index, 1);
        this.selectedFileNames.splice(index, 1);
    }

    onImportClick() {
        const formData: FormData = new FormData();
        this.loading = true;
        formData.append('uploadedFiles', this.filesToUpload[0], this.filesToUpload[0].name);
        this.itemService.importItemFile(formData).subscribe (
            (data: string) => {
                this.loading = false;
                this.updated = true;
                this.dialogRef.close(this.updated);
            },
            (error: any) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.dialogRef.close();
            });
    }

    onTemplateClick() {
        this.itemService.downloadItemTemplate().subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Item_Template';
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.xlsx'); // IE is the worst!!!
                } else {
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = 'Item_Template';
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }
}
