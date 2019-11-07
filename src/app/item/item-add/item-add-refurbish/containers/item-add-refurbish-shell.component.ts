import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemRefurbishInsert, ItemRefurbish, ItemInsert } from '../../../../shared/class/item';
import { Member } from '../../../../shared/class/member';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';

@Component({
    templateUrl: './item-add-refurbish-shell.component.html'
})

export class ItemAddRefurbishShellComponent implements OnInit {
    item$: Observable<Item | ItemInsert>;
    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;
    itemRefurbishesMatTable$: Observable<MatTableDataSource<ItemRefurbishInsert | ItemRefurbish>>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.itemRefurbishesMatTable$ = this.store.pipe(select(fromItem.getItemRefurbishesMatTable));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}
