import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Item, ItemTierPrice, ItemTierPriceInsert, ItemInsert } from '../../../../shared/class/item';
import {  Observable } from 'rxjs';
import { ItemService } from '../../../item.service';
import { AppService } from '../../../../app.service';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import { Member } from 'app/shared/class/member';

@Component({
    templateUrl: './item-edit-price-shell.component.html'
})

export class ItemEditPriceShellComponent implements OnInit {
    item$: Observable<Item | ItemInsert>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;
    itemTierPricesMatTable$: Observable<MatTableDataSource<ItemTierPrice | ItemTierPriceInsert>>;

    constructor(private store: Store<fromItem.State>) { }
    
    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.itemTierPricesMatTable$ = this.store.pipe(select(fromItem.getItemTierPricesMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
   }
   getItemTierPrices(id: number): void {
    this.store.dispatch(new itemActions.LoadItemTierPrices(id));
   }

}
