import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, NavigationEnd } from '@angular/router';
import { CompanyService } from '../../../company.service';
import { TranslateService } from '@ngx-translate/core';
import { CompanyInfo } from 'app/shared/class/company-info';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../../state';
import * as companyActions from '../../../state/company.actions';
import { Observable } from 'rxjs';
import { AddressState, AddressCountry } from 'app/shared/class/address';

@Component({
    selector: 'o-company-info',
    templateUrl: './company-info-shell.component.html',
})

export class CompanyInfoShellComponent implements OnInit {
    companyInfo$: Observable<CompanyInfo>;
    vendorBrands$: Observable<VendorBrand[]>;
    //vendorBrands$: Observable<MatTableDataSource<VendorBrand>>;
    shippingAddressStates$: Observable<AddressState[]>;
    addressCountries$: Observable<AddressCountry[]>;
    billingAddressStates$: Observable<AddressState[]>;
    errorMessage$: Observable<string>;
    isLoading$: Observable<boolean>;
    route: string;

    constructor(
        private router: Router,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {

        // this.store.dispatch(new companyActions.LoadCompanyInfo());
        // this.store.dispatch(new companyActions.LoadAddressCountry());
        
        this.companyInfo$ = this.store.pipe(select(fromCompany.getCompanyInfo));
        this.vendorBrands$ = this.store.pipe(select(fromCompany.getVendorBrands));

        this.shippingAddressStates$ = this.store.pipe(select(fromCompany.getShippingAddressStates));
        this.addressCountries$ = this.store.pipe(select(fromCompany.getAddressCountries));
        this.billingAddressStates$ = this.store.pipe(select(fromCompany.getBillingAddressStates));

        this.isLoading$ = this.store.pipe(select(fromCompany.isLoading));

        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
        this.router.events.subscribe((event: NavigationEnd): void => {
            if (event instanceof NavigationEnd) {
                this.route = event.url
            }
        });
        if (!this.route) this.route = this.router.url;
    }
    componentAdded(e) {
        console.log(e)
    }
}