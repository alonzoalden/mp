import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemInsert, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';

import { ItemService } from '../../../item.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import { getVendorBrands } from '../../../../company/company-info/state';

@Component({
  templateUrl: './item-add-shell.component.html',
})

export class ItemAddShellComponent implements OnInit {
    vendorBrandList$: Observable<VendorBrand[]>;
    item$: Observable<ItemInsert>;
    pendingAdd$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.vendorBrandList$ = this.store.pipe(select(fromItem.getVendorBrandList));
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.pendingAdd$ = this.store.pipe(select(fromItem.getPendingAdd));
        this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
    
    getVendorBrands() {
        this.store.dispatch(new itemActions.LoadVendorBrands());
    }
    setItem(payload: ItemInsert) {
        this.store.dispatch(new itemActions.SetItem(payload));
    }
}
