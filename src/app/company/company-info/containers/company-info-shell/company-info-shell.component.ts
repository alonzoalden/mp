import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CompanyInfo } from 'app/shared/class/company-info';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../../state';
// import * as companyActions from '../../../state/company.actions';
import { Observable } from 'rxjs';
import { AddressState, AddressCountry } from 'app/shared/class/address';

@Component({
    selector: 'o-company-info',
    templateUrl: './company-info-shell.component.html',
})

export class CompanyInfoShellComponent implements OnInit {
    companyInfo$: Observable<CompanyInfo>;
    vendorBrands$: Observable<VendorBrand[]>;
    addressCountries$: Observable<AddressCountry[]>;
    billingAddressStates$: Observable<AddressState[]>;
    shippingAddressStates$: Observable<AddressState[]>;
    isVendorBrandLoading$: Observable<boolean>;
    isInfoDescriptionLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    route: string;

    //vendorBrands$: Observable<MatTableDataSource<VendorBrand>>;
    constructor(
        private router: Router,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        this.companyInfo$ = this.store.pipe(select(fromCompany.getCompanyInfo));
        this.vendorBrands$ = this.store.pipe(select(fromCompany.getVendorBrands));
        this.shippingAddressStates$ = this.store.pipe(select(fromCompany.getShippingAddressStates));
        this.addressCountries$ = this.store.pipe(select(fromCompany.getAddressCountries));
        this.billingAddressStates$ = this.store.pipe(select(fromCompany.getBillingAddressStates));
        this.isVendorBrandLoading$ = this.store.pipe(select(fromCompany.isVendorBrandLoading));
        this.isInfoDescriptionLoading$ = this.store.pipe(select(fromCompany.isInfoDescriptionLoading));

        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
        this.router.events.subscribe((event: NavigationEnd): void => {
            if (event instanceof NavigationEnd) {
                this.route = event.url;
            }
        });
        if (!this.route) this.route = this.router.url;
    }
}