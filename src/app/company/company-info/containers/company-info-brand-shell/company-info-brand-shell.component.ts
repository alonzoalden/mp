import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import * as companyActions from '../../state/company-info.actions';
import * as fromCompany from '../../state';

@Component({
    templateUrl: './company-info-brand-shell.component.html',
})

export class CompanyInfoBrandShellComponent implements OnInit {
    vendorBrands$: Observable<VendorBrand[]>;
    isVendorBrandLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromCompany.State>) {}

    ngOnInit() {
        this.vendorBrands$ = this.store.pipe(select(fromCompany.getVendorBrands));
        this.isVendorBrandLoading$ = this.store.pipe(select(fromCompany.isVendorBrandLoading));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
    }

    loadCompanyInfoVendorBrands() {
        this.store.dispatch(new companyActions.LoadVendorBrands());
    }
}
