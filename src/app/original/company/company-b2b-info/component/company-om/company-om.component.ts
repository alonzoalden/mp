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
import {CompanyService} from '../../../company.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {VendorImage, VendorOM} from '../../../../../shared/class/vendor-b2b';

@Component({
    selector: 'app-company-b2b-info-om',
    templateUrl: './company-om.component.html',
})
export class CompanyOMComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isOMLoading: boolean;
    @Input() vendorOM: VendorOM;
    @Input() OMImageList: MatTableDataSource<VendorImage>;
    @Output() deleteImage = new EventEmitter<string>();
    @Output() updateVendorOM = new EventEmitter<VendorOM>();
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
        if (changes.OMImageList && changes.OMImageList.currentValue && changes.OMImageList.currentValue.data) {
            this.OMImageList.paginator = this.paginator;
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
        this.vendorOM = new VendorOM(null, null, null, null, null, null, null,
            null, null, null, null, null, null,
            null, null, null, null, null,
            []);
        this.loadVendorInfo.emit();
        this.subject = this.companyService.getUploadMessage().subscribe(data => {
            if (data) {
                if (this.OMImageList.data.length > 2) {
                    this.companyService.sendNotification({type: 'error', title: 'Maximum of 3 images', content: ''});
                    return;
                }
                this.updateImage.emit(data);
            }
        });
    }

    update(vendorOMForm: NgForm) {
        vendorOMForm.form.markAllAsTouched();
        vendorOMForm.form.markAsDirty();
        if (vendorOMForm.form.invalid) {
            return;
        }
        this.vendorOM.VendorImages = this.OMImageList.data;
        this.updateVendorOM.emit(this.vendorOM);
    }
}
