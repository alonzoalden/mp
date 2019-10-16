import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../state/item.actions';
import * as fromItem from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import { ItemPrintLabel, ItemList } from 'app/shared/class/item';
import { Member } from 'app/shared/class/member';


@Component({
    templateUrl: './item-print-label-shell.component.html'
})

export class ItemPrintLabelShellComponent implements OnInit  {
    itemPrintLabelsMatTable$: Observable<MatTableDataSource<ItemPrintLabel>>;
    itemList$: Observable<ItemList[]>;
    userInfo$: Observable<Member>;
    pendingAdd$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit(): void {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.itemList$ = this.store.pipe(select(fromItem.getItemList));
        this.itemPrintLabelsMatTable$ = this.store.pipe(select(fromItem.getItemPrintLabelsMatTable));
        this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
    getItemList(): void {
        this.store.dispatch(new itemActions.LoadItemList());
    }
    downloadPrintItemLabels(payload): void {
        this.store.dispatch(new itemActions.DownloadItemPrintLabel(payload));
    }
    downloadPrintItemLargeLabels(payload): void {
        this.store.dispatch(new itemActions.DownloadPrintItemLargeLabels(payload));
    }
}
