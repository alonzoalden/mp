import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { VendorAttachment, VendorAttachmentInsert } from '../../../../shared/class/vendor-attachment';
import { CompanyService } from '../../../company.service';

@Component({
    selector: 'o-company-attachment-add',
    templateUrl: './company-attachment-add.component.html'
})

export class CompanyAttachmentAddComponent implements OnInit {
    vendorAttachment: VendorAttachmentInsert;
    errorMessage: string;

    pendingUpload: boolean;

    private isUploadBtn: Boolean = true;
    public isLoadingData: Boolean = false;

    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    res: Array<string>
    
    @Output() uploadVendorAttachment = new EventEmitter<{ form: FormData, title: string}>();

    @ViewChild('fileUpload', { static: false }) fileUploadVar: any;

    constructor( 
        private router: Router,
        private companyService: CompanyService) { }

    ngOnInit(): void {
        this.vendorAttachment = new VendorAttachmentInsert(null, null, null);
    }

    fileChangeEvent(fileInput: any) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    }

    upload() {
        if(this.isRequirementValid()) {
            if (this.filesToUpload.length === 0) {
                this.companyService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
            } else if (this.filesToUpload.length > 3) {
                this.companyService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
            } else {
                this.uploadFiles();
            }
        }
        else {
            this.companyService.sendNotification({ type: 'error', title: 'Error', content: "Please enter all required fields" });
        }
    }

    isRequirementValid(): boolean {
        if (this.vendorAttachment
            && this.vendorAttachment.Title) {
            return true;
        } 
        else {
            return false;
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
            this.uploadVendorAttachment.emit({form: formData, title: this.vendorAttachment.Title});
            
            // this.companyService.uploadAttachment(formData)
            //     .subscribe (
            //         (data: VendorAttachment) => {

            //             console.log(data);
                        
            //             this.pendingUpload = false;
            //             //this.errorMessage = '';
            //             data[0].Title = this.vendorAttachment.Title;
            //             this.companyService.editVendorAttachment(data[0]).subscribe(
            //                 () => {
            //                     this.onSaveComplete(`Attachment saved`);
            //                     //route to list
            //                     this.router.navigate(['/company/attachment']);
            //                 },
            //                 (error: any) => {
            //                     this.errorMessage = <any>error;
            //                     this.companyService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
            //                 }
            //             );
            //         },
            //         err => {
            //             this.pendingUpload = false;
            //             //this.errorMessage = err;
            //             this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
            //             this.isLoadingData = false;
            //             this.filesToUpload = [];
            //             this.selectedFileNames = [];
            //         },
            //         () => {
            //             this.pendingUpload = false;
            //             this.isLoadingData = false;
            //             this.filesToUpload = [];
            //             this.selectedFileNames = [];
            //         }
            //     );
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
}
