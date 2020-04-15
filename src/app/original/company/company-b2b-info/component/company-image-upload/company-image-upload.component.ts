import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {VendorImage} from '../../../../../shared/class/vendor-b2b';
import {CompanyService} from '../../../company.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-company-image-upload',
    templateUrl: './company-image-upload.component.html',
})
export class CompanyImageUploadComponent implements OnInit, OnDestroy {
    image = new VendorImage();
    @Input() filesToUpload: Array<File>;
    @Input() selectedFileNames: string[];
    @Input() pendingUpload: boolean;
    @Input() titleRequired: boolean;
    @Output() uploadImage = new EventEmitter<{ form: FormData, title: string }>();
    @Output() clearUploadList = new EventEmitter();

    constructor(
        private companyService: CompanyService
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.clearUploadList.emit();
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    }


    uploadFiles() {
        if (this.filesToUpload.length > 0) {
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }
            this.uploadImage.emit({form: formData, title: this.image.Title});
        }
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }

    isRequirementValid(): boolean {
        if (!this.titleRequired) {
            return true;
        }
        if (this.titleRequired && this.image
            && this.image.Title) {
            return true;
        } else {
            return false;
        }
    }

    upload() {
        if (this.isRequirementValid()) {
            if (this.filesToUpload.length === 0) {
                this.companyService.sendNotification({
                    type: 'error',
                    title: 'Invalid Upload',
                    content: 'Please select at least 1 files to upload!'
                });
            } else if (this.filesToUpload.length > 3) {
                this.companyService.sendNotification({
                    type: 'error',
                    title: 'Invalid Upload',
                    content: 'Please select at least 1 files to upload!'
                });
            } else {
                this.uploadFiles();
            }
        } else {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
        }
    }
}
