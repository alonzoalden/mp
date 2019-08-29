import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ItemService } from '../item.service';
import * as itemActions from './item.actions';
import { Router } from '@angular/router';
import { Member, MemberVendor } from 'app/shared/class/member';
import { VendorBrand } from 'app/shared/class/vendor-brand';

@Injectable()
export class ItemEffects {
    constructor(
        private router: Router,
        private itemService: ItemService,
        private actions$: Actions) { }

    @Effect()
    loadVendorBrands$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadVendorBrands),
        mergeMap(() =>
            this.itemService.getVendorBrands().pipe(
                map((vendorbrands: VendorBrand[]) => (new itemActions.LoadVendorBrandsSuccess(vendorbrands))),
                catchError(err => {
                    of(new itemActions.LoadVendorBrandsFail(err))
                    return EMPTY;
                })
            )
        )
    );
}
