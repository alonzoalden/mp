import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company.service';
import * as fromCompany from './index';
import * as companyInfoActions from './company-info.actions';

@Injectable()
export class CompanyInfoEffects {

    constructor(private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) { }

    @Effect()
    loadVendorBrands$: Observable<Action> = this.actions$.pipe(
        ofType(companyInfoActions.CompanyInfoActionTypes.LoadVendorBrands),
        mergeMap(() =>
            this.companyService.getVendorBrands().pipe(
                map(vendorbrands => (new companyInfoActions.LoadVendorBrandsSuccess(vendorbrands))),
                catchError(err => {
                    of(new companyInfoActions.LoadVendorBrandsFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadCompanyInfo$: Observable<Action> = this.actions$.pipe(
        ofType(companyInfoActions.CompanyInfoActionTypes.LoadCompanyInfo),
        mergeMap(() =>
            this.companyService.getCompanyInfo().pipe(
                map(companyinfo => {
                    if (companyinfo.ShippingCountryID === 'US' || companyinfo.ShippingCountryID === 'CA') {
                        this.store.dispatch(new companyInfoActions.LoadShippingAddressState(companyinfo.ShippingCountryID));
                    }
                    if (companyinfo.BillingCountryID === 'US' || companyinfo.BillingCountryID === 'CA') {
                        this.store.dispatch(new companyInfoActions.LoadBillingAddressState(companyinfo.ShippingCountryID));
                    }
                    return (new companyInfoActions.LoadCompanyInfoSuccess(companyinfo));
                }),
                catchError(err => {
                    of(new companyInfoActions.LoadCompanyInfoFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadAddressCountry$: Observable<Action> = this.actions$.pipe(
        ofType(companyInfoActions.CompanyInfoActionTypes.LoadAddressCountry),
        mergeMap(() =>
            this.companyService.getAddressCountry().pipe(
                map(addresscountry => (new companyInfoActions.LoadAddressCountrySuccess(addresscountry))),
                catchError(err => {
                    of(new companyInfoActions.LoadAddressCountryFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadShippingAddressState$: Observable<Action> = this.actions$.pipe(
        ofType(companyInfoActions.CompanyInfoActionTypes.LoadShippingAddressState),
        map((action: companyInfoActions.LoadShippingAddressState) => action.payload),
        mergeMap((id) =>
            this.companyService.getAddressState(id).pipe(
                map(addresscountry => (new companyInfoActions.LoadShippingAddressStateSuccess(addresscountry))),
                catchError(err => {
                    of(new companyInfoActions.LoadShippingAddressStateFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadBillingAddressState$: Observable<Action> = this.actions$.pipe(
        ofType(companyInfoActions.CompanyInfoActionTypes.LoadBillingAddressState),
        map((action: companyInfoActions.LoadBillingAddressState) => action.payload),
        mergeMap((id) =>
            this.companyService.getAddressState(id).pipe(
                map(addresscountry => (new companyInfoActions.LoadBillingAddressStateSuccess(addresscountry))),
                catchError(err => {
                    of(new companyInfoActions.LoadBillingAddressStateFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
}
