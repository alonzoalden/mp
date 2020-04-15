import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {VendorImage, VendorQC, VendorService} from '../../../../../shared/class/vendor-b2b';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-b2b.actions';

@Component({
    selector: 'app-company-b2b-info-service-shell',
    templateUrl: './company-service-shell.component.html',
})
export class CompanyServiceShellComponent implements OnInit {
    isServiceLoading$: Observable<boolean>;
    ServiceImageList$: Observable<MatTableDataSource<VendorImage>>;
    vendorService$: Observable<VendorService>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.ServiceImageList$ = this.store.pipe(select(fromCompany.getServiceImageList));
        this.vendorService$ = this.store.pipe(select(fromCompany.getVendorService));
        setTimeout(() => {
            this.isServiceLoading$ = this.store.pipe(select(fromCompany.getServiceLoading));
        });
    }

    deleteImage(path: string) {
        this.store.dispatch(new companyActions.DeleteServiceImage(path));
    }

    updateVendorService(vendorService: VendorService) {
        this.store.dispatch(new companyActions.UpdateVendorService(vendorService));
    }

    loadVendorInfo() {
        this.store.dispatch(new companyActions.LoadVendorService());
    }

    updateImage(vendorImage: VendorImage) {
        this.store.dispatch(new companyActions.UpdateVendorServiceImageList(vendorImage));
    }
}
