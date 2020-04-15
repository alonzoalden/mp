import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {VendorImage, VendorOM} from '../../../../../shared/class/vendor-b2b';
import * as companyActions from '../../state/company-b2b.actions';

@Component({
    selector: 'app-company-b2b-info-om-shell',
    templateUrl: './company-om-shell.component.html',
})
export class CompanyOMShellComponent implements OnInit {
    isOMLoading$: Observable<boolean>;
    OMImageList$: Observable<MatTableDataSource<VendorImage>>;
    vendorOM$: Observable<VendorOM>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.OMImageList$ = this.store.pipe(select(fromCompany.getOMImageList));
        this.vendorOM$ = this.store.pipe(select(fromCompany.getVendorOM));
        setTimeout(() => {
            this.isOMLoading$ = this.store.pipe(select(fromCompany.getOMLoading));
        });
    }

    deleteImage(path: string) {
        this.store.dispatch(new companyActions.DeleteOMImage(path));
    }

    updateVendorOM(vendorOM: VendorOM) {
        this.store.dispatch(new companyActions.UpdateVendorOM(vendorOM));
    }

    loadVendorInfo() {
        this.store.dispatch(new companyActions.LoadVendorOM());
    }

    updateImage(vendorImage: VendorImage) {
        this.store.dispatch(new companyActions.UpdateVendorOMImageList(vendorImage));
    }

}
