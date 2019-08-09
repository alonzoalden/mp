import { Injectable } from '@angular/core';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';

//import { ProductService } from '../product.service';
//import { Product } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as companyActions from './company.actions';
import { CompanyService } from '../company.service';
import { CompanyInfo } from 'app/shared/class/company-info';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { Router } from '@angular/router';

@Injectable()
export class ItemVariationEffects {

  constructor(private router: Router,
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
        map(companyinfo => (new companyActions.LoadCompanyInfoSuccess(companyinfo))),
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
  // @Effect()
  // loadItemLists$: Observable<Action> = this.actions$.pipe(
  //   ofType(itemVariationActions.ItemVariationActionTypes.GetItemList),
  //   mergeMap(() =>
  //     this.itemService.getItemList().pipe(
  //       map(itemlists => (new itemVariationActions.GetItemListSuccess(itemlists))),
  //       catchError(err => {
  //         of(new itemVariationActions.GetItemListFail(err))
  //         return EMPTY;
  //       })
  //     )
  //   ),
  //   take(1)
  // );

  // @Effect()
  // getCurrentItemVariationListing$: Observable<Action> = this.actions$.pipe(
  //   ofType(itemVariationActions.ItemVariationActionTypes.GetCurrentItemVariationListing),
  //   map((action: itemVariationActions.GetCurrentItemVariationListing) => action.payload),
  //   mergeMap((itemvariationid) =>
  //     this.itemService.getItemVariationListing(itemvariationid).pipe(
  //       map(variationlisting => (new itemVariationActions.GetCurrentItemVariationListingSuccess(variationlisting))),
  //       catchError(err => of(new itemVariationActions.GetCurrentItemVariationListingFail(err)))
  //     )
  //   )
  // );

  

  // @Effect()
  // refreshItemVariationListings$: Observable<Action> = this.actions$.pipe(
  //   ofType(itemVariationActions.ItemVariationActionTypes.Refresh),
  //   mergeMap(() =>
  //     this.itemService.getItemVariationListings().pipe(
  //       map(variationlistings => (new itemVariationActions.LoadSuccess(variationlistings))),
  //       catchError(err => of(new itemVariationActions.LoadFail(err)))
  //     )
  //   )
  // );

  //   this.subscription = this.itemService.getItemVariationListings().subscribe(
  //     (variationListings: ItemVariationListing[]) => {
  //         this.variationListings = variationListings;
  //         this.refreshDataSource(this.variationListings);
  //     },
  //     (error: any) => this.errorMessage = <any>error
  // );



  // @Effect()
  // updateProduct$: Observable<Action> = this.actions$.pipe(
  //   ofType(itemVariationActions.ItemVariationActionTypes.UpdateItemVariationListing),
  //   map((action: itemVariationActions.UpdateItemVariationListing) => action.payload),
  //   mergeMap((itemvariationlisting: ItemVariationListing) =>
  //     this.itemService.editItemVariationListing(itemvariationlisting).pipe(
  //       map(updatedProduct => {
  //         const message = `${updatedProduct.Name} was saved`;
  //         this.itemService.sendNotification({ type: 'success', title: 'Successfully Saved', content: message });
  //         this.router.navigate(['item', 'variation-listing']);
  //         return (new itemVariationActions.UpdateItemVariationListingSuccess(updatedProduct))
  //       }),
  //       catchError(err => of(new itemVariationActions.UpdateItemVariationListingFail(err)))
  //     )
  //   )
  // );

  // @Effect()
  // createProduct$: Observable<Action> = this.actions$.pipe(
  //   ofType(itemVariationActions.ItemVariationActionTypes.CreateItemVariationListing),
  //   map((action: itemVariationActions.CreateItemVariationListing) => action.payload),
  //   mergeMap((product: ItemVariationListing) =>
  //     this.itemService.addItemVariationListing(product).pipe(
  //       map(newProduct => {
  //         const message = `${newProduct.Name} was saved`;
  //         this.itemService.sendNotification({ type: 'success', title: 'Successfully Saved', content: message });
  //         this.router.navigate(['item', 'variation-listing']);
  //         return (new itemVariationActions.CreateItemVariationListingSuccess(newProduct));
  //       }),
  //       catchError(err => of(new itemVariationActions.CreateItemVariationListingFail(err)))
  //     )
  //   )
  // );

  // @Effect()
  // deleteProduct$: Observable<Action> = this.actions$.pipe(
  //   ofType(itemVariationActions.ItemVariationActionTypes.DeleteItemVariationListing),
  //   map((action: itemVariationActions.DeleteItemVariationListing) => action.payload),
  //   mergeMap((itemvariationid: number) =>
  //     this.itemService.deleteItemVariationListing(itemvariationid).pipe(
  //       map(() => {
  //         const message = `${itemvariationid} was deleted`
  //         this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
  //         return (new itemVariationActions.DeleteItemVariationListingSuccess(itemvariationid))
  //       }),
  //       catchError(err => of(new itemVariationActions.DeleteItemVariationListingFail(err)))
  //     )
  //   )
  // );
}
