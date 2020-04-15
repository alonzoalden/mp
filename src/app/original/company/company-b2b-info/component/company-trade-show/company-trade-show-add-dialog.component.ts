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

@Component({
    selector: 'app-company-b2b-info-trade-show-add-dialog',
    templateUrl: './company-trade-show-add-dialog.component.html'
})
export class CompanyTradeShowAddDialogComponent implements OnInit, OnDestroy {
    vendorTradeShow: VendorTradeShow;
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2040, 0, 1);
    subject: Subscription;

    constructor(
        public dialogRef: MatDialogRef<CompanyTradeShowAddDialogComponent>,
        private companyService: CompanyService,
        @Inject(MAT_DIALOG_DATA) public data: VendorTradeShow
    ) {
    }


    ngOnInit() {
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                this.vendorTradeShow.ImagePath = data.Path;
            }
        });
        this.vendorTradeShow = new VendorTradeShow(null, null, null, null, null, null, null, null, null);
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
            return;
        }
        this.dialogRef.close(this.vendorTradeShow);
    }
}
