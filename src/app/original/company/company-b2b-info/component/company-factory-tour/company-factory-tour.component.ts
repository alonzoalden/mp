import {
    Component, ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {VendorFactoryTour, VendorImage} from '../../../../../shared/class/vendor-b2b';
import {NgForm} from '@angular/forms';
import {CompanyService} from '../../../company.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Subject, Subscription} from 'rxjs';
import {AppService} from '../../../../../app.service';

@Component({
    selector: 'app-company-b2b-info-factory-tour',
    templateUrl: './company-factory-tour.component.html',
})
export class CompanyFactoryTourComponent implements OnInit, OnChanges, OnDestroy {
    @Input() vendorFactoryTour: VendorFactoryTour;
    @Input() isFactoryTourLoading: boolean;
    @Input() factoryTourImageList: MatTableDataSource<VendorImage>;
    @Output() loadVendorInfo = new EventEmitter();
    @Output() updateVendorFactoryTour = new EventEmitter<VendorFactoryTour>();
    @Output() updateImage = new EventEmitter<VendorImage>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Output() deleteImage = new EventEmitter<string>();
    subject: Subscription;
    displayedColumns = ['Menu', 'ID', 'View', 'Title'];

    minDate = new Date(1950, 0, 1);
    maxDate = new Date(2040, 0, 1);
    @ViewChild('fileUpload', {static: true}) fileUpload: ElementRef;
    pendingUpload = false;

    constructor(
        private companyService: CompanyService,
        private appService: AppService
    ) {

    }

    onDelete(vendorImage: VendorImage) {
        const _confirmation = confirm(`Remove ${vendorImage.Title}?`);
        if (_confirmation) {
            this.deleteImage.emit(vendorImage.Path);
        }
    }

    fileChangeEvent(event) {
        this.pendingUpload = true;
        const form = new FormData();
        form.append('upload', event.target.files[0], event.target.files[0].name);
        this.companyService.uploadVendorImage(form).subscribe(data => {
            this.pendingUpload = false;
            this.vendorFactoryTour.Banner = data;
            const upload: any = document.getElementById('UploadFileId');
            upload.value = '';
        }, error => {
            this.pendingUpload = false;
        });
    }

    deleteBanner() {
        this.vendorFactoryTour.Banner = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.factoryTourImageList && changes.factoryTourImageList.currentValue && changes.factoryTourImageList.currentValue.data) {
            this.factoryTourImageList.paginator = this.paginator;
        }
    }

    ngOnInit() {
        this.vendorFactoryTour = new VendorFactoryTour(null, null, null, null, null, null, null,
            null, null, null, null, null, null,
            null, null, null, null, null,
            null, null, null, [], null, 'NotSubmitted');
        this.loadVendorInfo.emit();
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                if (this.factoryTourImageList.data.length > 2) {
                    this.companyService.sendNotification({type: 'error', title: 'Maximum of 3 images', content: ''});
                    return;
                }
                this.updateImage.emit(data);
            }
        });
    }

    ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
    }

    update(vendorFactoryTourForm: NgForm) {
        vendorFactoryTourForm.form.markAllAsTouched();
        vendorFactoryTourForm.form.markAsDirty();
        if (vendorFactoryTourForm.form.invalid) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        this.vendorFactoryTour.VendorImages = this.factoryTourImageList.data;
        this.updateVendorFactoryTour.emit(this.vendorFactoryTour);
    }

    submitApproval(vendorFactoryTourForm: NgForm) {
        vendorFactoryTourForm.form.markAllAsTouched();
        vendorFactoryTourForm.form.markAsDirty();
        if (vendorFactoryTourForm.form.invalid) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        this.vendorFactoryTour.VendorImages = this.factoryTourImageList.data;
        this.vendorFactoryTour.Approval = 'Pending';
        this.updateVendorFactoryTour.emit(this.vendorFactoryTour);
    }

    approve() {
        this.vendorFactoryTour.VendorImages = this.factoryTourImageList.data;
        this.vendorFactoryTour.Approval = 'Approved';
        this.updateVendorFactoryTour.emit(this.vendorFactoryTour);
    }

    notApprove() {
        this.vendorFactoryTour.VendorImages = this.factoryTourImageList.data;
        this.vendorFactoryTour.Approval = 'NotApproved';
        this.updateVendorFactoryTour.emit(this.vendorFactoryTour);
    }
}
