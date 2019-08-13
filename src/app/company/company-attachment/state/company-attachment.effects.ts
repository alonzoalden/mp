import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company.service';
import * as fromCompany from './index';
import * as companyActions from './company-attachment.actions';

@Injectable()
export class CompanyAttachmentEffects {
    constructor(private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) { }

    @Effect()
    loadVendorBrands$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.LoadVendorBrands),
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

}
