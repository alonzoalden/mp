import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { ItemInsert, ItemTierPriceInsert } from '../../../../shared/class/item';

import { ItemService } from '../../../item.service';
import { AppService } from '../../../../app.service';
import { Member } from 'app/shared/class/member';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
@Component({
    templateUrl: './item-add-price-shell.component.html'
})

export class ItemAddPriceShellComponent implements OnInit {
    
    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;
    itemTierPricesMatTable$: Observable<MatTableDataSource<ItemTierPriceInsert>>;
    

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    PendingAdd: boolean;   
    currentItemTierPriceIndex: number;

    displayedColumns = ['Add', 'Quantity', 'Price',  'Remove'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;    
    constructor(private store: Store<fromItem.State>) { }

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.itemTierPricesMatTable$ = this.store.pipe(select(fromItem.getItemTierPricesMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
    }
}
