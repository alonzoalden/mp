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
import { ItemList, Item, ItemCrossSellInsert, ItemUpSell, ItemUpSellInsert, ItemRelatedProduct, ItemRelatedProductInsert } from 'app/shared/class/item';
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
    @Effect()
    loadAllItemList$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadAllItemList),
        mergeMap(() =>
            this.itemService.getAllItemList().pipe(
                map((itemlist: ItemList[]) => (new itemActions.LoadAllItemListSuccess(itemlist))),
                catchError(err => {
                    of(new itemActions.LoadAllItemListFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadAllItemCrossSell$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadAllItemCrossSell),
        map((action: itemActions.LoadAllItemCrossSell) => action.payload),
        mergeMap((itemcrosssell: ItemCrossSellInsert) =>
            this.itemService.getAllItem(itemcrosssell.CrossSellItemID).pipe(
                map((item: Item) => {
                    itemcrosssell.PrevCrossSellItemID = item.ItemID;
                    itemcrosssell.CrossSellItemName = item.Name;
                    itemcrosssell.CrossSellItemVendorSKU = item.VendorSKU;
                    itemcrosssell.CrossSellTPIN = item.TPIN;
                    itemcrosssell.ImagePath = item.ImagePath;
                    return (new itemActions.LoadAllItemCrossSellSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadAllItemCrossSellFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadAllItemUpSell$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadAllItemUpSell),
        map((action: itemActions.LoadAllItemUpSell) => action.payload),
        mergeMap((itemupsell: ItemUpSellInsert) =>
            this.itemService.getAllItem(itemupsell.UpSellItemID).pipe(
                map((item: Item) => {
                    itemupsell.PrevUpSellItemID = item.ItemID;
                    itemupsell.UpSellItemName = item.Name;
                    itemupsell.UpSellItemVendorSKU = item.VendorSKU;
                    itemupsell.UpSellTPIN = item.TPIN;
                    itemupsell.ImagePath = item.ImagePath;
                    return (new itemActions.LoadAllItemUpSellSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadAllItemUpSellFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemRelatedProduct$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemRelatedProduct),
        map((action: itemActions.LoadItemRelatedProduct) => action.payload),
        mergeMap((itemrelatedproduct: ItemRelatedProductInsert) =>
            this.itemService.getAllItem(itemrelatedproduct.RelatedProductItemID).pipe(
                map((item: Item) => {
                    itemrelatedproduct.PrevRelatedProductItemID = item.ItemID;
                    itemrelatedproduct.RelatedItemName = item.Name;
                    itemrelatedproduct.RelatedItemVendorSKU = item.VendorSKU;
                    itemrelatedproduct.RelatedTPIN = item.TPIN;
                    itemrelatedproduct.ImagePath = item.ImagePath;
                    
                    return (new itemActions.LoadItemRelatedProductSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadItemRelatedProductFail(err))
                    return EMPTY;
                })
            )
        )
    );
    
}
