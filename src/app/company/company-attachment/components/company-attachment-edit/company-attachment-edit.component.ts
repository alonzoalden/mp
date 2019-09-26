import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { CompanyService } from '../../../company.service';
import { VendorAttachment } from '../../../../shared/class/vendor-attachment';

@Component({
    selector: 'o-company-attachment-edit',
    templateUrl: './company-attachment-edit.component.html'
})

export class CompanyAttachmentEditComponent implements OnChanges {
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    title: string; 
    @Input() vendorAttachmentsMatTable: MatTableDataSource<VendorAttachment>;
    @Input() vendorAttachment: VendorAttachment;
    @Input() pendingUpload: boolean = false;
    @Input() errorMessage: string;
    @Output() getCurrentVendorAttachment = new EventEmitter<number>();
    @Output() uploadUpdateVendorAttachment = new EventEmitter<{ id: number, form: FormData, title: string, exclude: boolean}>();
    @Output() editVendorAttachment = new EventEmitter<VendorAttachment>();

    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.vendorAttachment) {
            if (changes.vendorAttachment.currentValue) {
                this.selectedFileNames.push(changes.vendorAttachment.currentValue.UploadedFile);
            }
            else if (!changes.vendorAttachment.currentValue && changes.vendorAttachment.firstChange) {
                this.getCurrentVendorAttachment.emit(this.route.snapshot.params['id']);
            }
        }
    }

    fileChangeEvent(fileInput: any) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    }

    upload() {
        if (this.selectedFileNames.length === 0) {
            this.companyService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
        }
        else {
            this.uploadFiles();
        }
    }

    uploadFiles() {
        if (this.filesToUpload.length > 0) {
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }

            this.uploadUpdateVendorAttachment.emit({
                    id: this.vendorAttachment.VendorAttachmentID,
                    form: formData,
                    title: this.vendorAttachment.Title,
                    exclude: this.vendorAttachment.Exclude
                });
        }
        else {
            this.editVendorAttachment.emit(this.vendorAttachment);
        }
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }
}
