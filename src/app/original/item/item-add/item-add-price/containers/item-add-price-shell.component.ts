import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemTierPriceInsert } from '../../../../../shared/class/item';
import { Member } from '../../../../../shared/class/member';
import {  Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';

@Component({
    templateUrl: './item-add-price-shell.component.html'
})

export class ItemAddPriceShellComponent implements OnInit {

    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;
    itemTierPricesMatTable$: Observable<MatTableDataSource<ItemTierPriceInsert>>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.itemTierPricesMatTable$ = this.store.pipe(select(fromItem.getItemTierPricesMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
    }
}
