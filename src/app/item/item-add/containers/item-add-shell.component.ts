import { Component, OnInit } from '@angular/core';
import { ItemInsert } from '../../../shared/class/item';
import { VendorBrand } from '../../../shared/class/vendor-brand';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../state/item.actions';
import * as fromItem from '../../state';

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
        this.store.dispatch(new itemActions.LoadItemList());
        this.store.dispatch(new itemActions.LoadAllItemList());
        this.store.dispatch(new itemActions.LoadVendorBrands());

        this.vendorBrandList$ = this.store.pipe(select(fromItem.getVendorBrandList));
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.pendingAdd$ = this.store.pipe(select(fromItem.getPendingAdd));
        this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));        
    }
  
    setItem(payload: ItemInsert) {
        this.store.dispatch(new itemActions.SetItem(payload));
    }
    addItem(payload: ItemInsert) {
        this.store.dispatch(new itemActions.AddItem(payload));
    }

}
