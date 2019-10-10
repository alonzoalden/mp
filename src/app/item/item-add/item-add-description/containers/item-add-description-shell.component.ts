import { Component, OnInit } from '@angular/core';
import { ItemInsert } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';
import { Member } from 'app/shared/class/member';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';

@Component({
  templateUrl: './item-add-description-shell.component.html'
})

export class ItemAddDescriptionShellComponent implements OnInit {
    userInfo$: Observable<Member>;
    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;
    vendorBrandList$: Observable<VendorBrand[]>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.vendorBrandList$ = this.store.pipe(select(fromItem.getVendorBrandList));
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}
