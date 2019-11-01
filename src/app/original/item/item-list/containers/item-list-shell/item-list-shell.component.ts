import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item } from '../../../../../shared/class/item';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Member } from '../../../../../shared/class/member';

@Component({
    templateUrl: './item-list-shell.component.html'
})

export class ItemListShellComponent implements OnInit {
    itemsMatTable$: Observable<MatTableDataSource<Item>>;
    userInfo$: Observable<Member>;
    isMainItemsListLoading$: Observable<Boolean>;
    pendingDelete$: Observable<Boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.itemsMatTable$ = this.store.pipe(select(fromItem.getItemsMatTable));
        this.pendingDelete$ = this.store.pipe(select(fromItem.getPendingDelete));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        setTimeout(() => {
            this.isMainItemsListLoading$ = this.store.pipe(select(fromItem.getIsMainItemsListLoading));
        });
    }
    getItems(): void {
        this.store.dispatch(new itemActions.LoadMainItems());
    }
    downloadItemLabelCount(payload: {item: Item, count: number, border: string}): void {
        this.store.dispatch(new itemActions.DownloadItemLabelCount(payload));
    }
    downloadItemLargeLabelCount(payload: {item: Item, count: number, border: string}): void {
        this.store.dispatch(new itemActions.DownloadItemLargeLabelCount(payload));
    }
    downloadItemTemplate() {
        this.store.dispatch(new itemActions.DownloadItemTemplate());
    }
    deleteItem(item: Item): void {
        this.store.dispatch(new itemActions.DeleteItem(item));
    }
}
