import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item, ItemSelection, ItemInsert } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import { Member } from 'app/shared/class/member';

@Component({
  templateUrl: './item-edit-shell.component.html',
})

export class ItemEditShellComponent implements OnInit {
    
    vendorBrandList$: Observable<VendorBrand[]>;
    item$: Observable<Item | ItemInsert>;
    pendingAdd$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>
    
    constructor(private store: Store<fromItem.State>) { }

    ngOnInit() {
        this.store.dispatch(new itemActions.LoadVendorBrands());
        this.vendorBrandList$ = this.store.pipe(select(fromItem.getVendorBrandList));
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.pendingAdd$ = this.store.pipe(select(fromItem.getPendingAdd));
        this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));

        
    }
    getVendorBrands() {
        this.store.dispatch(new itemActions.LoadVendorBrands());
    }
    getItem(id: number) {
        this.store.dispatch(new itemActions.LoadItem(id));
    }
    editItem(payload: {item: Item, displayPreview: boolean, printLabel: boolean}): void {
        this.store.dispatch(new itemActions.EditItem(payload));
    }
    downloadItemLabel(item: Item) {
        this.store.dispatch(new itemActions.DownloadItemLabel(item));
    }
}
