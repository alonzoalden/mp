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
        private companyService: CompanyService
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
            []);
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
            return;
        }
        this.vendorService.VendorImages = this.serviceImageList.data;
        this.updateVendorService.emit(this.vendorService);
    }

}
