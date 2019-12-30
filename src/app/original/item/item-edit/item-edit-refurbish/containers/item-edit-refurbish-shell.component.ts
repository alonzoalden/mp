import { InventoryDetailSerialized } from '../../../../../shared/class/item';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert } from '../../../../../shared/class/item';
import { Member } from 'app/shared/class/member';
import {  Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';

@Component({
    templateUrl: './item-edit-refurbish-shell.component.html'
})

export class ItemEditRefurbishShellComponent implements OnInit {

    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;
    itemRefurbishesMatTable$: Observable<MatTableDataSource<InventoryDetailSerialized>>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.itemRefurbishesMatTable$ = this.store.pipe(select(fromItem.getItemRefurbishesMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
    }
}
