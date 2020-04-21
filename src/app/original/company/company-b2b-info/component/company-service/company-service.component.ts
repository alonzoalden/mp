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
import {VendorImage, VendorService} from '../../../../../shared/class/vendor-b2b';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../../company.service';
import {NgForm} from '@angular/forms';
import {AppService} from '../../../../../app.service';

@Component({
    selector: 'app-company-b2b-info-service',
    templateUrl: './company-service.component.html',
})
export class CompanyServiceComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isServiceLoading: boolean;
    @Input() vendorService: VendorService;
    @Input() serviceImageList: MatTableDataSource<VendorImage>;
    @Output() deleteImage = new EventEmitter<string>();
    @Output() updateVendorService = new EventEmitter<VendorService>();
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
        if (changes.ServiceImageList && changes.ServiceImageList.currentValue && changes.ServiceImageList.currentValue.data) {
            this.serviceImageList.paginator = this.paginator;
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
        this.vendorService = new VendorService(null, null, null, null, null, null, null,
            [], 'NotSubmitted');
        this.loadVendorInfo.emit();
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                if (this.serviceImageList.data.length > 2) {
                    this.companyService.sendNotification({type: 'error', title: 'Maximum of 3 images', content: ''});
                    return;
                }
                this.updateImage.emit(data);
            }
        });
    }

    update(vendorServiceForm: NgForm) {
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
        this.vendorService.VendorImages = this.serviceImageList.data;
        this.updateVendorService.emit(this.vendorService);
    }

    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
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
        this.vendorService.VendorImages = this.serviceImageList.data;
        this.vendorService.Approval = 'Pending';
        this.updateVendorService.emit(this.vendorService);
    }

    approve() {
        this.vendorService.VendorImages = this.serviceImageList.data;
        this.vendorService.Approval = 'Approved';
        this.updateVendorService.emit(this.vendorService);
    }

    notApprove() {
        this.vendorService.VendorImages = this.serviceImageList.data;
        this.vendorService.Approval = 'NotApproved';
        this.updateVendorService.emit(this.vendorService);
    }
}
