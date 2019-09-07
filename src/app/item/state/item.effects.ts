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
import { ItemList } from 'app/shared/class/item';
import { Category } from 'app/shared/class/category';

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
    @Effect()
    loadSimpleItemList$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadSimpleItemList),
        mergeMap(() =>
            this.itemService.getSimpleItemList().pipe(
                map((itemlists: ItemList[]) => (new itemActions.LoadSimpleItemListSuccess(itemlists))),
                catchError(err => {
                    of(new itemActions.LoadSimpleItemListFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemCategories$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemCategories),
        map((action: itemActions.LoadItemCategories) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getCategories(id).pipe(
                map((categories: Category[]) => (new itemActions.LoadItemCategoriesSuccess(categories))),
                catchError(err => {
                    of(new itemActions.LoadItemCategoriesFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadCategoryBreadCrumbs$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadCategoryBreadCrumbs),
        map((action: itemActions.LoadCategoryBreadCrumbs) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getCategoryBreadCrumbs(id).pipe(
                map((categories: Category[]) => (new itemActions.LoadCategoryBreadCrumbsSuccess(categories))),
                catchError(err => {
                    of(new itemActions.LoadCategoryBreadCrumbsFail(err))
                    return EMPTY;
                })
            )
        )
    );
}
