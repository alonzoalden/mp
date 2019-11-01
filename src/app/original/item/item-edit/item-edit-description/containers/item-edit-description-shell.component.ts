import { Component, OnInit } from '@angular/core';
import { Item, ItemInsert } from '../../../../../shared/class/item';
import { VendorBrand } from '../../../../../shared/class/vendor-brand';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import { Member } from '../../../../../shared/class/member';

@Component({
  templateUrl: './item-edit-description-shell.component.html'
})

export class ItemEditDescriptionShellComponent implements OnInit {
    vendorBrandList$: Observable<VendorBrand[]>;
    item$: Observable<Item | ItemInsert>;
    pendingAdd$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.vendorBrandList$ = this.store.pipe(select(fromItem.getVendorBrandList));
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.pendingAdd$ = this.store.pipe(select(fromItem.getPendingAdd));
        this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
    }
    getItem(id: number) {
        this.store.dispatch(new itemActions.LoadItem(id));
    }
    getVendorBrands() {
        this.store.dispatch(new itemActions.LoadVendorBrands());
    }
}
