import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'app/shared/class/company-info';
import { Observable } from 'rxjs';
import { AddressState, AddressCountry } from 'app/shared/class/address';
import { Store, select } from '@ngrx/store';
import * as companyActions from '../../state/company-info.actions';
import * as fromCompany from '../../state';
@Component({
    selector: 'o-company-info-description-shell',
    templateUrl: './company-info-description-shell.component.html',
})

export class CompanyInfoDescriptionShellComponent implements OnInit {
    companyInfo$: Observable<CompanyInfo>;
    addressCountries$: Observable<AddressCountry[]>;
    billingAddressStates$: Observable<AddressState[]>;
    shippingAddressStates$: Observable<AddressState[]>;
    isInfoDescriptionLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        this.companyInfo$ = this.store.pipe(select(fromCompany.getCompanyInfo));
        this.addressCountries$ = this.store.pipe(select(fromCompany.getAddressCountries));
        this.billingAddressStates$ = this.store.pipe(select(fromCompany.getBillingAddressStates));
        this.shippingAddressStates$ = this.store.pipe(select(fromCompany.getShippingAddressStates));
        this.isInfoDescriptionLoading$ = this.store.pipe(select(fromCompany.isInfoDescriptionLoading));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));

    }

    loadCompanyInfoDescription() {
        this.store.dispatch(new companyActions.LoadCompanyInfo());
        this.store.dispatch(new companyActions.LoadAddressCountry());
    }
    updateCompanyInfoShippingAddress(companyinfo: CompanyInfo) {
        this.store.dispatch(new companyActions.UpdateCompanyInfoShippingAddress(companyinfo));
    }
    updateCompanyInfoBillingAddress(companyinfo: CompanyInfo) {
        this.store.dispatch(new companyActions.UpdateCompanyInfoBillingAddress(companyinfo));
    }
}