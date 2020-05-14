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
import {VendorDevelopment, VendorImage} from '../../../../../shared/class/vendor-b2b';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../../company.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AppService} from '../../../../../app.service';

@Component({
    selector: 'app-company-b2b-info-development',
    templateUrl: './company-development.component.html',
})
export class CompanyDevelopmentComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    @Input() developmentLoading: boolean = true;
    @Input() vendorDevelopment: VendorDevelopment;
    @Input() developmentImageList: MatTableDataSource<VendorImage>;
    @Output() getVendorDevelopment = new EventEmitter();
    @Output() updateVendorDevelopment = new EventEmitter<VendorDevelopment>();
    @Output() updateImage = new EventEmitter<VendorImage>();
    @Output() deleteImage = new EventEmitter<string>();

    displayedColumns = ['Menu', 'ID', 'View', 'Title'];
    subject: Subscription;

    constructor(
        private companyService: CompanyService,
        private appService: AppService
    ) {
    }

    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
    }

    ngOnInit() {
        this.vendorDevelopment = new VendorDevelopment(null, null, null, null, null,
            null, null, null, null, [], 'NotSubmitted');
        this.getVendorDevelopment.emit();
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                if (this.developmentImageList.data.length > 2) {
                    this.companyService.sendNotification({type: 'error', title: 'Maximum of 3 images', content: ''});
                    return;
                }
                this.updateImage.emit(data);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.developmentImageList && changes.developmentImageList.currentValue && changes.developmentImageList.currentValue.data) {
            this.developmentImageList.paginator = this.paginator;
        }
    }

    ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

    onDelete(vendorImage: VendorImage) {
        const _confirmation = confirm(`Remove ${vendorImage.Title}?`);
        if (_confirmation) {
            this.deleteImage.emit(vendorImage.Path);
        }
    }

    update() {
        this.vendorDevelopment.VendorImages = this.developmentImageList.data;
        this.updateVendorDevelopment.emit(this.vendorDevelopment);
    }

    submitApproval(vendorDevelopmentForm: NgForm) {
        vendorDevelopmentForm.form.markAllAsTouched();
        vendorDevelopmentForm.form.markAsDirty();
        if (vendorDevelopmentForm.form.invalid) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        this.vendorDevelopment.VendorImages = this.developmentImageList.data;
        this.vendorDevelopment.Approval = 'Pending';
        this.updateVendorDevelopment.emit(this.vendorDevelopment);
    }

    approve() {
        if (!this.vendorDevelopment.VendorDevelopmentID) {
            return;
        }
        this.vendorDevelopment.VendorImages = this.developmentImageList.data;
        this.vendorDevelopment.Approval = 'Approved';
        this.updateVendorDevelopment.emit(this.vendorDevelopment);
    }

    notApprove() {
        if (!this.vendorDevelopment.VendorDevelopmentID) {
            return;
        }
        this.vendorDevelopment.VendorImages = this.developmentImageList.data;
        this.vendorDevelopment.Approval = 'NotApproved';
        this.updateVendorDevelopment.emit(this.vendorDevelopment);
    }
}
