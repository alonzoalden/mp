import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { VendorAttachment } from '../../shared/class/vendor-attachment';
import { CompanyService } from '../company.service';

@Component({
    selector: 'o-company-attachment-edit',
    templateUrl: './company-attachment-edit.component.html'
})

export class CompanyAttachmentEditComponent implements OnInit {
    vendorAttachment: VendorAttachment;
    vendorAttachmentID: number;
    title: string;
    errorMessage: string;

    pendingUpload: boolean;

    private isUploadBtn: Boolean = true;
    public isLoadingData: Boolean = false;

    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    res: Array<string>

    @ViewChild('fileUpload') fileUploadVar: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService) { }

    ngOnInit(): void {
        const vendorattachmentid = this.route.snapshot.params['id'];
        this.companyService.getVendorAttachment(vendorattachmentid).subscribe(
            (vendorAttachment: VendorAttachment) => {
                this.vendorAttachment = vendorAttachment;
                this.vendorAttachmentID = this.vendorAttachment.VendorAttachmentID;
                this.title = this.vendorAttachment.Title;
                this.selectedFileNames.push(vendorAttachment.UploadedFile);
            },
            (error: any) => this.errorMessage = <any>error
        );
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
            //alert('Please select at least 1 files to upload!');
            this.companyService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
        }
        else {
            this.uploadFiles();
        }
    }

    uploadFiles() {
        if (this.filesToUpload.length > 0) {
            this.pendingUpload = true;
            this.isLoadingData = true;
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                var reader = new FileReader();
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }
            this.companyService.uploadUpdateAttachment(this.vendorAttachment.VendorAttachmentID, formData)
                .subscribe (
                    (data: VendorAttachment) => {
                        this.pendingUpload = false;
                        //this.errorMessage = '';
                        data.Title = this.vendorAttachment.Title;
                        data.Exclude = this.vendorAttachment.Exclude;
                        this.companyService.editVendorAttachment(data).subscribe(
                            () => {
                                this.onSaveComplete(`Attachment saved`);
                                //route to list
                                this.router.navigate(['/company/attachment']);
                            },
                            (error: any) => {
                                this.errorMessage = <any>error;
                                this.companyService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                            }
                        );
                    },
                    err => {
                        this.pendingUpload = false;
                        //this.errorMessage = err;
                        this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
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
        else {
            this.companyService.editVendorAttachment(this.vendorAttachment).subscribe(
                () => {
                    this.onSaveComplete(`Attachment saved`);
                    //route to list
                    this.router.navigate(['/company/attachment']);
                },
                (error: any) => {
                    this.errorMessage = <any>error;
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );
        }
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }

    onSaveComplete(message?: string): void {
        // Navigate back to the item list
        this.companyService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
    }

    ngOnDestroy() {
    }
}
