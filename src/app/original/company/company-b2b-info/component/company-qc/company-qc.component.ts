import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {VendorImage, VendorQC} from '../../../../../shared/class/vendor-b2b';
import {NgForm} from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../../company.service';
import {AppService} from '../../../../../app.service';

@Component({
    selector: 'app-company-b2b-info-qc',
    templateUrl: './company-qc.component.html',
})
export class CompanyQCComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isQCLoading: boolean;
    @Input() vendorQC: VendorQC;
    @Input() QCImageList: MatTableDataSource<VendorImage>;
    @Output() deleteImage = new EventEmitter<string>();
    @Output() updateVendorQC = new EventEmitter<VendorQC>();
    @Output() loadVendorInfo = new EventEmitter();
    @Output() updateImage = new EventEmitter<VendorImage>();

    displayedColumns = ['Menu', 'View', 'ID', 'Title'];
    subject: Subscription;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
        private companyService: CompanyService,
        private appService: AppService
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.QCImageList && changes.QCImageList.currentValue && changes.QCImageList.currentValue.data) {
            this.QCImageList.paginator = this.paginator;
        }
    }

    onDelete(vendorImage: VendorImage) {
        const _confirmation = confirm(`Remove ${vendorImage.Title}?`);
        if (_confirmation) {
            this.deleteImage.emit(vendorImage.Path);
        }
    }

    ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

    ngOnInit() {
        this.vendorQC = new VendorQC(null, null, null, null, null, null, null,
            null, null, [], 'NotSubmitted');
        this.loadVendorInfo.emit();
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                if (this.QCImageList.data.length > 2) {
                    this.companyService.sendNotification({type: 'error', title: 'Maximum of 3 images', content: ''});
                    return;
                }
                this.updateImage.emit(data);
            }
        });
    }

    update() {
        this.vendorQC.VendorImages = this.QCImageList.data;
        this.updateVendorQC.emit(this.vendorQC);
    }

    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
    }

    submitApproval(vendorOMForm: NgForm) {
        vendorOMForm.form.markAllAsTouched();
        vendorOMForm.form.markAsDirty();
        if (vendorOMForm.form.invalid) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        this.vendorQC.VendorImages = this.QCImageList.data;
        this.vendorQC.Approval = 'Pending';
        this.updateVendorQC.emit(this.vendorQC);
    }

    approve() {
        if (!this.vendorQC.VendorQCID) {
            return;
        }
        this.vendorQC.VendorImages = this.QCImageList.data;
        this.vendorQC.Approval = 'Approved';
        this.updateVendorQC.emit(this.vendorQC);
    }

    notApprove() {
        if (!this.vendorQC.VendorQCID) {
            return;
        }
        this.vendorQC.VendorImages = this.QCImageList.data;
        this.vendorQC.Approval = 'NotApproved';
        this.updateVendorQC.emit(this.vendorQC);
    }
}
