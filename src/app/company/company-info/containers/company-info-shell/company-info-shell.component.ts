import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CompanyInfo } from 'app/shared/class/company-info';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../state';
import { Observable } from 'rxjs';
import { AddressState, AddressCountry } from 'app/shared/class/address';
import * as companyActions from '../../state/company-info.actions';
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

    constructor(
        private router: Router,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        this.companyInfo$ = this.store.pipe(select(fromCompany.getCompanyInfo));
        this.vendorBrands$ = this.store.pipe(select(fromCompany.getVendorBrands));
        this.addressCountries$ = this.store.pipe(select(fromCompany.getAddressCountries));
        this.billingAddressStates$ = this.store.pipe(select(fromCompany.getBillingAddressStates));
        this.shippingAddressStates$ = this.store.pipe(select(fromCompany.getShippingAddressStates));
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

    loadCompanyInfoDescription() {
        this.store.dispatch(new companyActions.LoadCompanyInfo());
        this.store.dispatch(new companyActions.LoadAddressCountry());
    }
    loadCompanyInfoVendorBrands() {
        this.store.dispatch(new companyActions.LoadVendorBrands());
    }
    loadShippingAddressState(shippingcouyntryid: string) {
        this.store.dispatch(new companyActions.LoadShippingAddressState(shippingcouyntryid));
    }
    loadBillingAddressState(billingcouyntryid: string) {
        this.store.dispatch(new companyActions.LoadShippingAddressState(billingcouyntryid));
    }
    updateCompanyInfoShippingAddress(companyinfo: CompanyInfo) {
        this.store.dispatch(new companyActions.UpdateCompanyInfoShippingAddress(companyinfo));
    }
    updateCompanyInfoBillingAddress(companyinfo: CompanyInfo) {
        this.store.dispatch(new companyActions.UpdateCompanyInfoBillingAddress(companyinfo));
    }
}