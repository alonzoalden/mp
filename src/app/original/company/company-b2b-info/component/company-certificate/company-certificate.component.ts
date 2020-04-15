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
import {VendorCertificate, VendorImage} from '../../../../../shared/class/vendor-b2b';
import {CompanyService} from '../../../company.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-company-b2b-info-certificate',
    templateUrl: './company-certificate.component.html'
})
export class CompanyCertificateComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    subject: Subscription;
    @Output() updateImage = new EventEmitter<VendorImage>();
    @Input() certificateImageList: MatTableDataSource<VendorImage>;
    @Output() getVendorCertificate = new EventEmitter();
    @Input() isCertificateLoading: boolean = true;
    @Output() deleteImage = new EventEmitter<string>();
    @Output() updateVendorCertificate = new EventEmitter<VendorCertificate>();
    displayedColumns = ['Menu', 'ID', 'View', 'Title'];

    constructor(
        private companyService: CompanyService
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.certificateImageList && changes.certificateImageList.currentValue && changes.certificateImageList.currentValue.data) {
            this.certificateImageList.paginator = this.paginator;
        }
    }

    ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

    ngOnInit() {
        this.getVendorCertificate.emit();
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                this.updateImage.emit(data);
            }
        });
    }

    onDelete(vendorImage: VendorImage) {
        const _confirmation = confirm(`Remove ${vendorImage.Title}?`);
        if (_confirmation) {
            this.deleteImage.emit(vendorImage.Path);
        }
    }

    update() {
        this.updateVendorCertificate.emit(new VendorCertificate(this.certificateImageList.data));
    }
}
