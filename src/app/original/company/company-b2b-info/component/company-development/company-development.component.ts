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

@Component({
    selector: 'app-company-b2b-info-development',
    templateUrl: './company-development.component.html',
})
export class CompanyDevelopmentComponent implements OnInit, OnDestroy, OnChanges {
    @Input() developmentLoading: boolean = true;
    @Input() vendorDevelopment: VendorDevelopment;
    @Output() getVendorDevelopment = new EventEmitter();
    @Output() updateVendorDevelopment = new EventEmitter<VendorDevelopment>();
    subject: Subscription;
    @Output() updateImage = new EventEmitter<VendorImage>();
    @Input() developmentImageList: MatTableDataSource<VendorImage>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Output() deleteImage = new EventEmitter<string>();
    displayedColumns = ['Menu', 'ID', 'View', 'Title'];

    constructor(
        private companyService: CompanyService
    ) {
    }

    ngOnInit() {
        this.vendorDevelopment = new VendorDevelopment(null, null, null, null, null,
            null, null, null, null, []);
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

    update(vendorDevelopmentForm: NgForm) {
        vendorDevelopmentForm.form.markAllAsTouched();
        vendorDevelopmentForm.form.markAsDirty();
        if (vendorDevelopmentForm.form.invalid) {
            return;
        }
        this.vendorDevelopment.VendorImages = this.developmentImageList.data;
        this.updateVendorDevelopment.emit(this.vendorDevelopment);
    }
}
