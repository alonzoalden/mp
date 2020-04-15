import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-b2b.actions';
import {VendorDevelopment, VendorImage} from '../../../../../shared/class/vendor-b2b';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-company-b2b-info-development-container',
    templateUrl: './company-development-shell.component.html',
})
export class CompanyDevelopmentShellComponent implements OnInit {
    developmentLoading$: Observable<boolean>;
    vendorDevelopment$: Observable<VendorDevelopment>;
    developmentImageList$: Observable<MatTableDataSource<VendorImage>>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.vendorDevelopment$ = this.store.pipe(select(fromCompany.getVendorDevelopment));
        this.developmentImageList$ = this.store.pipe(select(fromCompany.getDevelopmentImageList));
        setTimeout(() => {
            this.developmentLoading$ = this.store.pipe(select(fromCompany.getDevelopmentLoading));
        });
    }

    getVendorDevelopment() {
        this.store.dispatch(new companyActions.LoadVendorDevelopment());
    }

    updateVendorDevelopment(vendorDevelopment: VendorDevelopment) {
        this.store.dispatch(new companyActions.UpdateVendorDevelopment(vendorDevelopment));
    }

    updateImage(vendorImage: VendorImage) {
        this.store.dispatch(new companyActions.UpdateVendorDevelopmentImageList(vendorImage));
    }

    deleteImage(path: string) {
        this.store.dispatch(new companyActions.DeleteDevelopmentImage(path));
    }
}

