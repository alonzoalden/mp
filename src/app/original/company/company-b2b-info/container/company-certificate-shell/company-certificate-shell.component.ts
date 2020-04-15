import {Component, OnInit} from '@angular/core';
import * as companyActions from '../../state/company-b2b.actions';
import {VendorCertificate, VendorImage} from '../../../../../shared/class/vendor-b2b';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-company-b2b-info-certificate-container',
    templateUrl: './company-certificate-shell.component.html'
})
export class CompanyCertificateShellComponent implements OnInit {
    isCertificateLoading$: Observable<boolean>;
    vendorCertificateImageList$: Observable<MatTableDataSource<VendorImage>>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.vendorCertificateImageList$ = this.store.pipe(select(fromCompany.getCertificateImageList));
        setTimeout(() => {
            this.isCertificateLoading$ = this.store.pipe(select(fromCompany.getCertificateLoading));
        });
    }

    getVendorCertificate() {
        this.store.dispatch(new companyActions.LoadVendorCertificate());
    }

    updateVendorCertificate(vendorCertificate: VendorCertificate) {
        this.store.dispatch(new companyActions.UpdateVendorCertificate(vendorCertificate));
    }

    updateImage(vendorImage: VendorImage) {
        this.store.dispatch(new companyActions.UpdateVendorCertificateImageList(vendorImage));
    }

    deleteImage(path: string) {
        this.store.dispatch(new companyActions.DeleteCertificateImage(path));
    }
}
