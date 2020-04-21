import {
    Component,
    EventEmitter, Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {VendorTradeShow} from '../../../../../shared/class/vendor-b2b';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../../company.service';
import {NgForm} from '@angular/forms';
import {AppService} from '../../../../../app.service';

@Component({
    selector: 'app-company-b2b-info-trade-show-add-dialog',
    templateUrl: './company-trade-show-add-dialog.component.html'
})
export class CompanyTradeShowAddDialogComponent implements OnInit, OnDestroy {
    vendorTradeShow: VendorTradeShow;
    minDate = new Date(1950, 0, 1);
    maxDate = new Date(2040, 0, 1);
    subject: Subscription;
    pendingUpload = false;

    constructor(
        public dialogRef: MatDialogRef<CompanyTradeShowAddDialogComponent>,
        private companyService: CompanyService,
        @Inject(MAT_DIALOG_DATA) public data: VendorTradeShow,
        private appService: AppService
    ) {
    }


    ngOnInit() {
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                this.vendorTradeShow.ImagePath = data.Path;
            }
        });
        this.vendorTradeShow = new VendorTradeShow(null, null, null, null, null,
            null, null, null, null, 'NotSubmitted');
        if (this.data) {
            this.vendorTradeShow = {...this.vendorTradeShow, ...this.data};
        }
    }

    ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

    onCancelClick() {
        this.dialogRef.close();
    }

    save(vendorTradeShowForm: NgForm) {
        vendorTradeShowForm.form.markAllAsTouched();
        vendorTradeShowForm.form.markAsDirty();
        if (vendorTradeShowForm.form.invalid) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        this.dialogRef.close(this.vendorTradeShow);
    }

    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
    }

    fileChangeEvent(event) {
        this.pendingUpload = true;
        const form = new FormData();
        form.append('upload', event.target.files[0], event.target.files[0].name);
        this.companyService.uploadVendorImage(form).subscribe(data => {
            this.pendingUpload = false;
            this.vendorTradeShow.ImagePath = data;
            const upload: any = document.getElementById('UploadFileId');
            upload.value = '';
        }, error => {
            this.pendingUpload = false;
        });
    }

    deleteImage() {
        this.vendorTradeShow.ImagePath = '';
    }

    submitApproval(vendorServiceForm: NgForm) {
        vendorServiceForm.form.markAllAsTouched();
        vendorServiceForm.form.markAsDirty();
        if (vendorServiceForm.form.invalid) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        this.vendorTradeShow.Approval = 'Pending';
        this.dialogRef.close(this.vendorTradeShow);
    }

    approve() {
        this.vendorTradeShow.Approval = 'Approved';
        this.dialogRef.close(this.vendorTradeShow);
    }

    notApprove() {
        this.vendorTradeShow.Approval = 'NotApproved';
        this.dialogRef.close(this.vendorTradeShow);
    }
}
