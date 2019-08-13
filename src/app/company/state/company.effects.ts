import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../company.service';
import * as fromCompany from './index';
import * as companyActions from './company.actions';

@Injectable()
export class ItemVariationEffects {

    constructor(private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) { }

    @Effect()
    loadVendorBrands$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionTypes.LoadVendorBrands),
        mergeMap(() =>
            this.companyService.getVendorBrands().pipe(
                map(vendorbrands => (new companyActions.LoadVendorBrandsSuccess(vendorbrands))),
                catchError(err => {
                    of(new companyActions.LoadVendorBrandsFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadCompanyInfo$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionTypes.LoadCompanyInfo),
        mergeMap(() =>
            this.companyService.getCompanyInfo().pipe(
                map(companyinfo => {
                    if (companyinfo.ShippingCountryID === 'US' || companyinfo.ShippingCountryID === 'CA') {
                        this.store.dispatch(new companyActions.LoadShippingAddressState(companyinfo.ShippingCountryID));
                    }
                    if (companyinfo.BillingCountryID === 'US' || companyinfo.BillingCountryID === 'CA') {
                        this.store.dispatch(new companyActions.LoadBillingAddressState(companyinfo.ShippingCountryID));
                    }
                    return (new companyActions.LoadCompanyInfoSuccess(companyinfo));
                }),
                catchError(err => {
                    of(new companyActions.LoadCompanyInfoFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadAddressCountry$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionTypes.LoadAddressCountry),
        mergeMap(() =>
            this.companyService.getAddressCountry().pipe(
                map(addresscountry => (new companyActions.LoadAddressCountrySuccess(addresscountry))),
                catchError(err => {
                    of(new companyActions.LoadAddressCountryFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadShippingAddressState$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionTypes.LoadShippingAddressState),
        map((action: companyActions.LoadShippingAddressState) => action.payload),
        mergeMap((id) =>
            this.companyService.getAddressState(id).pipe(
                map(addresscountry => (new companyActions.LoadShippingAddressStateSuccess(addresscountry))),
                catchError(err => {
                    of(new companyActions.LoadShippingAddressStateFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    loadBillingAddressState$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionTypes.LoadBillingAddressState),
        map((action: companyActions.LoadBillingAddressState) => action.payload),
        mergeMap((id) =>
            this.companyService.getAddressState(id).pipe(
                map(addresscountry => (new companyActions.LoadBillingAddressStateSuccess(addresscountry))),
                catchError(err => {
                    of(new companyActions.LoadBillingAddressStateFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
}
