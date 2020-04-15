import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-b2b.actions';
import {VendorImage, VendorOM, VendorQC} from '../../../../../shared/class/vendor-b2b';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-company-b2b-info-qc-shell',
    templateUrl: './company-qc-shell.component.html',
})
export class CompanyQCShellComponent implements OnInit {
    isQCLoading$: Observable<boolean>;
    QCImageList$: Observable<MatTableDataSource<VendorImage>>;
    vendorQC$: Observable<VendorQC>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.QCImageList$ = this.store.pipe(select(fromCompany.getQCImageList));
        this.vendorQC$ = this.store.pipe(select(fromCompany.getVendorQC));
        setTimeout(() => {
            this.isQCLoading$ = this.store.pipe(select(fromCompany.getQCLoading));
        });
    }

    deleteImage(path: string) {
        this.store.dispatch(new companyActions.DeleteQCImage(path));
    }

    updateVendorQC(vendorQC: VendorQC) {
        this.store.dispatch(new companyActions.UpdateVendorQC(vendorQC));
    }

    loadVendorInfo() {
        this.store.dispatch(new companyActions.LoadVendorQC());
    }

    updateImage(vendorImage: VendorImage) {
        this.store.dispatch(new companyActions.UpdateVendorQCImageList(vendorImage));
    }
}
